import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
// plugins
import { Facebook } from '@ionic-native/facebook/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
// services
import { GeneralService } from './../../../services/generalComponents/general.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { AuthApiService } from 'src/app/apis/auth/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fname = '';
  email = '';
  pwd = '';
  deviceID: string;
  deviceType: string;
  ischeckedPol = false;
  ischeckedTerm = false;
  showPolError = false;
  showTermError = false;
  loading: any;
  readyForSubmit = false;
  facebookReady = false;
  duplicatedEmail = false;
  validateSignupform: FormGroup;
  errorMessage = '';
  validationMessages = {
    fullname: [
      { type: 'required', message: 'Full Name is required' },
      { type: 'minlength', message: 'Full Name must be at least 6 characters long.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
    ]
  };
  validateFullname = false;
  validateEmail = false;
  validatePassword = false;
  constructor(
    private fb: Facebook,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private router: Router,
    private fcm: FCM,
    private authAPI: AuthApiService,
    private ionService: IongadgetService,
    private generalService: GeneralService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setHeaderAnimation();
    this.getToken();
  }

  initForm() {
    this.validateSignupform = this.formBuilder.group({
      fullname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  setHeaderAnimation() {
    // this.keyboard.onKeyboardWillShow().subscribe(() => {
    //   document.getElementById('logo').style.display = 'none';
    //   document.getElementById('signup').style.minHeight = '100vh';
    // });
    // this.keyboard.onKeyboardWillHide().subscribe(() => {
    //   document.getElementById('logo').style.display = 'flex';
    //   document.getElementById('signup').style.minHeight = '82vh';
    // });
  }

  getToken() {
    this.platform.ready().then(() => {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        this.deviceID = token;
        if (token.split(':').length > 1) {
          this.deviceType = 'I';
        } else {
          this.deviceID = token.split(':')[0];
          this.deviceType = 'A';
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        this.deviceID = token;
        if (token.split(':').length > 1) {
          this.deviceID = token.split(':')[0];
          this.deviceType = 'I';
        } else {
          this.deviceID = token.split(':')[0];
          this.deviceType = 'A';
        }
      });
    });
  }

  validateForm() {
    this.validateFullname = true;
    this.validateEmail = true;
    this.validatePassword = true;
    this.checkTermsAndPolicy().then(result => {
      console.log(result);
      if (this.validateSignupform.invalid) {
        return;
      }
      if (result) {
        this.signUpWithEmail();
      }
    });
  }

  signUpWithEmail() {
    this.readyForSubmit = true;
    const password = Md5.hashStr(this.pwd);
    this.authAPI.signup(this.email, password, this.fname, this.deviceID ).subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.readyForSubmit = false;
        const navprams: NavigationExtras = {
          queryParams: {
            userID: result.id
          }
        };
        this.router.navigate(['verifyemail'], navprams);
      } else if (result.RESPONSE === 'Email Already Exists') {
        this.readyForSubmit = false;
        this.duplicatedEmail = true;
      } else {
        this.ionService.showAlert('Sign Up Failed', result.RESPONSE);
      }
    }, err => {
      console.log(err);
      this.readyForSubmit = false;
      this.ionService.showAlert('Error from Servier', 'Server API Problem');
    });
  }

  setEmailValidation(event) {
    this.validateEmail = event;
    if (event === false) {
      this.duplicatedEmail = false;
    }
  }

  setPasswordValidation(event) {
    this.validatePassword = event;
  }

  setFullnameValidation(event) {
    this.validateFullname = event;
  }

  btnchkPol() {
    // this.showPolError = false;
    this.ischeckedPol = !this.ischeckedPol;
    this.showPolError = false;
  }

  btnchkTerm() {
    this.ischeckedTerm = !this.ischeckedTerm;
    this.showTermError = false;
  }

  presentTerm() {
    this.generalService.openTermsAndConditions(false);
  }

  presentPrivacy() {
    this.generalService.openPrivacyPolicy();
  }

  gotoLogIn() {
    this.router.navigate(['login']);
  }

  checkTermsAndPolicy() {
    return new Promise((resolve, reject) => {
      let checked = true;
      if (this.ischeckedPol === false) {
        document.getElementById('privacy').classList.add('check-alert');
        checked = false;
      }
      if (this.ischeckedTerm === false) {
        document.getElementById('terms').classList.add('check-alert');
        checked = false;
      }

      const objTimeout = setTimeout(() => {
        document.getElementById('privacy').classList.remove('check-alert');
        document.getElementById('terms').classList.remove('check-alert');
        clearTimeout(objTimeout);
      }, 3000);
      resolve(checked);
    });
  }

  signUpwithFB() {
    this.validateFullname = false;
    this.validateEmail = false;
    this.validatePassword = false;
    this.checkTermsAndPolicy().then(result => {
      if (result) {
        this.facebookReady = true;
        this.fb.getLoginStatus().then((res) => {
          if (res.status === 'connected') {
            // this.getUserDetail(res.authResponse.userID);
            this.fb.logout().then(() => {
              this.signUpFBStep2();
            });
          } else {
            this.signUpFBStep2();
          }
        });
      }
    });
  }

  signUpFBStep2() {
    this.fb.login(['public_profile', 'email']).then((result) => {
      if (result.status === 'connected' ) {
        this.getUserDetail(result.authResponse.userID);
      } else {
        this.ionService.presentToast('Facebook Error');
        this.facebookReady = false;
      }
    }).catch(err => {
      this.facebookReady = false;
    });
  }

  getUserDetail(fbUserID) {
    this.fb.api('/' + fbUserID + '/?fields=id,email,name,picture,gender',  [ 'public_profile' ]).then(result => {
      if (result) {
        const email = result.email;
        const name = result.name;
        this.facebookSignUp(email, name);
      } else {
        this.ionService.presentToast('Error while Fetching Facebook Credentials');
        this.facebookReady = false;
      }
    }).catch((err) => {
      this.facebookReady = false;
      this.ionService.showAlert('Error while Fetching Facebook Credentials' , JSON.stringify(err));
    });
  }

  facebookSignUp(email, name) {
    this.authAPI.facebookSignUp(email, name, this.deviceID).subscribe(async (result) => {
      this.facebookReady = true;
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.facebookSignIn(email);
      } else if (result.RESPONSE === 'Email Already Exists') {
        this.facebookSignIn(email);
      } else {
        this.facebookReady = false;
        this.ionService.presentToast( result.RESPONSE);
      }
    }, err => {
      this.facebookReady = false;
      this.ionService.presentToast('Server API Problem');
    });
  }

  facebookSignIn(email) {
    this.authAPI.facebookLogIn(email, this.deviceID).subscribe((user) => {
      console.log(user);
      this.facebookReady = false;
      if (user.RESPONSECODE === 1) {
        if (user.isVerify === '0') {
          const navprams: NavigationExtras = {
            queryParams: {
              userID: user.id
            }
          };
          this.router.navigate(['verifyemail'], navprams);
        } else {
          this.storageService.setStorage(user).then((result) => {
            if (result) {
              this.generalService.defineInitialRoutering();
            }
          });
        }
      } else {
        this.ionService.showAlert('Sign In by Facebook Failed', user.RESPOSNE);
      }
    }, err => {
      this.facebookReady = false;
      this.ionService.showAlert('Sign In by Facebook Failed', 'Server API Problem');
    });
  }
}
