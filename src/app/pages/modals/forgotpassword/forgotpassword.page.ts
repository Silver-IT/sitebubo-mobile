import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { AuthApiService } from 'src/app/apis/auth/auth-api.service';
// import { CheckEmailPage } from '../check-email/check-email.page';

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
    private ionService: IongadgetService,
    private authService: AuthApiService,
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
      if (result.RESPONSECODE ===  1) {

        this.modalCtrl.dismiss().then(() => {
          // this.openCheckEmail();
          this.ionService.presentToast('Password reset email sent successfully. Check your email to reset your password.');
        });
      } else {
        this.ionService.presentToast('Failed sending reset password email');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }

  // async openCheckEmail() {
  //   const check = await this.modalCtrl.create({
  //     component: CheckEmailPage
  //   });
  //   return await check.present();
  // }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
