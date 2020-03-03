import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, IonInput, Events } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { UserApiService } from 'src/app/apis/user/user-api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit, AfterViewInit {
  loading: any;
  userID: any;
  token: any;
  profileForm: FormGroup;
  fullname: string;
  email: string;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    fullname: [
      { type: 'required', message: 'Full Name is required.' },
      { type: 'minlength', message: 'Full Name must be at least 6 characters long.' }
    ],
  };
  fullnameValidation = false;
  emailValidation = false;
  readyToSubmit = false;
  startwatching = false;
  @ViewChild('fullnameInput', { static: false }) fullnameInput: IonInput;
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private userAPI: UserApiService,
    private ionService: IongadgetService,
    private router: Router,
    private events: Events
  ) { }

  ngOnInit() {
    this.initData();
    this.initForm();
  }

  ionViewDidEnter() {
    const setFocus = setTimeout(() => {
      this.fullnameInput.setFocus();
      this.readyToSubmit = false;
      clearTimeout(setFocus);
    }, 200);
  }

  ngAfterViewInit() {
    console.log('asdfasdfasdfasdf');
    this.fullnameInput.ionBlur.subscribe(() => {
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
  }

  initData() {
    this.ionService.showLoading();
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.email = user.email;
        this.userAPI.getMyProfile(this.userID, this.token).subscribe((userInfo) => {
          this.ionService.closeLoading();
          console.log(userInfo);
          if (userInfo.RESPONSECODE === 1) {
            this.fullname = userInfo.RESPONSE.name;
          } else {
            this.ionService.showAlert('Fetching Data Failed', userInfo.RESPONSE);
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
    this.profileForm = this.formBuilder.group({
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
    if (this.profileForm.valid) {
      this.readyToSubmit = true;
    } else {
      this.readyToSubmit = false;
    }
  }

  onSumit() {
    if (this.profileForm.valid) {
      this.updateProfile();
    }
  }

  updateProfile() {
    this.ionService.showLoading();
    this.userAPI.updateMyProfile(this.fullname, this.userID, this.token).subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.storage.get('userInfo').then(user => {
          user.name = this.fullname;
          this.storage.set('userInfo', user).then(() => {
            this.events.publish('userInfo_set', user);
          });
        });
        this.ionService.presentToast('Your profile got updated successfully').then(() => {
          this.dismiss();
        });
      } else {
        this.ionService.showAlert('Updating Profile Failed', result.RESPONSE);
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
