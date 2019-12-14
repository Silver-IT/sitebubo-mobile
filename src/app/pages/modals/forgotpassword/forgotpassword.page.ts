import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { AuthService } from './../../../serverAPI/auth/auth.service';
import { CheckEmailPage } from '../check-email/check-email.page';
// import { GeneralService } from './../../../services/generalComponents/general.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  @ViewChild('emailInput', { static: false }) emailInput: IonInput;
  loading: any;
  resetform: FormGroup;
  email = '';
  readyToSubmit = false;
  resetmessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ]
  };
  emailValidation = false;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private storage: Storage,
    private ionService: IongagetService,
    private authService: AuthService,
    // private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ionViewDidEnter() {
    this.emailInput.setFocus();
  }

  initForm() {
    this.resetform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  setEmailValidation(result) {
    this.emailValidation = result;
  }

  checkValidation() {
    if (this.resetform.valid) {
      this.readyToSubmit = true;
    } else if (this.resetform.invalid) {
      this.readyToSubmit = false;
    }
  }

  ForgetPwd() {
    this.emailValidation = true;
    // tslint:disable-next-line: no-unused-expression
    this.resetform.get('email').touched;
    if (this.resetform.valid) {
      this.sendRequestEmail();
    }
  }

  sendRequestEmail() {
    this.ionService.showLoading();
    this.authService.forgotPassword(this.email).subscribe((result) => {
      this.ionService.closeLoading();
      if (result['RESPONSECODE'] ===  1) {
        this.modalCtrl.dismiss().then(() => {
          this.openCheckEmail();
        });
      } else {
        this.ionService.showAlert('Failed Sending ResetPassword Email', result['RESPONSE']);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.showAlert('Failed Sending ResetPassword Email', 'Server API Problem');
    });
  }

  async openCheckEmail() {
    const check = await this.modalCtrl.create({
      component: CheckEmailPage
    });
    return await check.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
