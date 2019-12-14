import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ModalController, LoadingController, IonInput, Events } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../serverAPI/user/user.service';
import { IongagetService } from './../../../../services/ionGadgets/iongaget.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  loading: any;
  userID: any;
  token: any;
  profile_form: FormGroup;
  fullname: string;
  email: string;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'fullname': [
      { type: 'required', message: 'Full Name is required.' },
      { type: 'minlength', message: 'Full Name must be at least 6 characters long.' }
    ],
  };
  fullnameValidation = false;
  emailValidation = false;
  readyToSubmit = false;
  startwatching = false;
  @ViewChild('fullnameInput', { static: false }) fullnameInput: IonInput;
  // @ViewChild('emailInput', { static: false }) emailInput: IonInput;
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private ga: GoogleAnalytics,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private userAPI: UserService,
    private ionService: IongagetService,
    private router: Router,
    private events: Events
  ) { }

  ngOnInit() {
    this.initData();
    this.initForm();
    this.startGoogle();
  }

  ionViewDidEnter() {
    const setFocus = setTimeout(() => {
      this.fullnameInput.setFocus();
      this.readyToSubmit = false;
      clearTimeout(setFocus);
    }, 200);
  }

  startGoogle() {
    this.ga.startTrackerWithId('UA-131219006-1').then(() => {
        this.ga.trackView('Profile');
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  ngAfterViewInit() {
    console.log('asdfasdfasdfasdf');
    this.fullnameInput.ionBlur.subscribe(() =>{     
      this.fullnameValidation = true;
    });
    this.fullnameInput.ionFocus.subscribe(() => {
      this.fullnameValidation = false;
      this.startwatching = true;
    });

    this.fullnameInput.ionChange.subscribe(() => {
      if (this.startwatching === true) {
        this.watchChanges();
      }
    });

    // this.emailInput.ionBlur.subscribe(() =>{
    //   this.emailValidation = true;
    // });

    // this.emailInput.ionFocus.subscribe(() => {
    //   this.emailValidation = false;
    //   this.startwatching = true;
    // });

    // this.emailInput.ionChange.subscribe(() => {
    //   if (this.startwatching === true) {
    //     this.watchChanges();
    //   }
    // });
  }

  initData() {
    this.ionService.showLoading();
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.email = user.email;
        this.userAPI.getMyProfile(this.userID, this.token).subscribe((user) => {
          this.ionService.closeLoading();
          console.log(user);
          if (user['RESPONSECODE'] === 1) {
            this.fullname = user['RESPONSE'].name;
            // this.fullnameInput.setFocus();
            // this.email = user['RESPONSE'].email;
          } else {
            this.ionService.showAlert('Fetching Data Failed', user['RESPONSE']);
          }
        }, err => {
          this.ionService.closeLoading();
          this.ionService.showAlert('Fetching Data Failed', 'Server API Problem');
        });
      } else {
        this.router.navigate(['welcome'], { replaceUrl: true });
      }
    });
  }

  initForm() {
    this.profile_form = this.formBuilder.group({
      // email: new FormControl('', 
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      //   ])),
        fullname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ]))
    });
        

    

  }

  setEmailValidation(event) {
    this.emailValidation = event;
  }

  watchChanges() {
    if (this.profile_form.valid) {
      this.readyToSubmit = true;
    } else {
      this.readyToSubmit = false;
    }
  }

  onSumit() {
    if (this.profile_form.valid) {
      this.updateProfile();
    }
  }

  updateProfile() {
    // this.fba.logEvent('EditProfile_Click', { page: 'Profile' }).then(() => { });
    this.ionService.showLoading();
    this.userAPI.updateMyProfile(this.fullname, this.userID, this.token).subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      if (result['RESPONSECODE'] === 1) {
        this.storage.get('userInfo').then(user => {
          // user.email = this.email;
          user.name = this.fullname;
          this.storage.set('userInfo', user).then(() => {
            this.events.publish('userInfo_set', user);
          });
        });
        this.ionService.presentToast('Your profile got updated successfully').then(() => {
          this.dismiss();
        });
      } else {
        this.ionService.showAlert('Updating Profile Failed', result['RESPONSE']);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.showAlert('Updating Profile Failed', 'Server API Problem');
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
