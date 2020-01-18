import { IonInput, ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserApiService } from 'src/app/apis/user/user-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.page.html',
  styleUrls: ['./invite-user.page.scss'],
})
export class InviteUserPage implements OnInit, AfterViewInit {
  @ViewChild('emailInput', { static: false }) emailInput: IonInput;
  email = '';
  addInvitedUserForm: FormGroup;
  validationMessages = {
    email : [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };
  validateEmail = false;
  readyToSubmit = false;
  invalidEmail = false;
  extraError = '';
  duringSubmit = false;
  reportChecked = true;
  domainUserID: number;
  domainName: string;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private ionService: IongadgetService,
    private userAPI: UserApiService,
    private storage: Storage,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.domainUserID = this.navParams.get('domainUserID');
    this.domainName = this.navParams.get('domainName');
    this.initForm();
  }

  ngAfterViewInit() {
    this.emailInput.ionBlur.subscribe(() => {
      this.validateEmail = true;
    });
    this.emailInput.ionFocus.subscribe(() => {
      this.invalidEmail = false;
      this.extraError = '';
      this.validateEmail = false;
    });
    this.emailInput.ionChange.subscribe(() => {
      this.watchChange();
    });

    setTimeout(() => {
      this.emailInput.setFocus();
    }, 200);
  }


  watchChange() {
    if (this.addInvitedUserForm.valid) {
      this.readyToSubmit = true;
    } else {
      this.readyToSubmit = false;
    }
  }

  initForm() {
    this.addInvitedUserForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  addInvitedUser() {
    this.storage.get('userInfo').then((user) => {
      this.ionService.showLoading();
      let emailReport: number;
      if (this.reportChecked) {
        emailReport = 1;
      } else {
        emailReport = 0;
      }
      this.userAPI.addInvitedUser(this.domainName, this.email, emailReport, user.id, this.domainUserID, user.token).subscribe((result) => {
        console.log(result);
        this.ionService.closeLoading();
        if (result.RESPONSECODE === 1) {
          this.modalCtrl.dismiss(true);
        } else  {
          this.invalidEmail = true;
          this.extraError = result.RESPONSE;
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Error occured while adding new user');
      });
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }
}
