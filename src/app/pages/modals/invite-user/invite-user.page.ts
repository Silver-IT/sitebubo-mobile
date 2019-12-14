import { IonInput, ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserService } from './../../../serverAPI/user/user.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.page.html',
  styleUrls: ['./invite-user.page.scss'],
})
export class InviteUserPage implements OnInit {
  @ViewChild('emailInput', { static: false }) emailInput: IonInput;
  email = '';
  addInvitedUserForm: FormGroup;
  validation_messages = {
    email : [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  }
  validate_email: boolean = false;
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
    private ionService: IongagetService,
    private userAPI: UserService,
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
      this.validate_email = true;
    });
    this.emailInput.ionFocus.subscribe(() => {
      this.invalidEmail = false;
      this.extraError = '';
      this.validate_email = false;
    });
    this.emailInput.ionChange.subscribe(() => {
      this.watchChange();
    });

    setTimeout(() => {
      this.emailInput.setFocus();
    }, 200)
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
      let email_report: number;
      if (this.reportChecked) {
        email_report = 1;
      } else {
        email_report = 0;
      }
      this.userAPI.addInvitedUser(this.domainName, this.email, email_report, user.id, this.domainUserID, user.token).subscribe((result) => {
        console.log(result);
        this.ionService.closeLoading();
        if (result['RESPONSECODE'] === 1) {
          this.modalCtrl.dismiss(true);
        } else  {
          this.invalidEmail = true;
          this.extraError = result['RESPONSE'];
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
