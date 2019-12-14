import { Component, OnInit } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';
// plugins
import { Facebook } from '@ionic-native/facebook/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// services
import { AuthService } from './../../../serverAPI/auth/auth.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { GeneralService } from './../../../services/generalComponents/general.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fname = '';
  email = '';
  pwd = '';
  deviceID = 'ezjsu38';
  ischeckedPol = false;
  ischeckedTerm = false;
  showPolError = false;
  showTermError = false;
  loading: any;
  readyForSubmit = false;
  facebookReady = false;
  duplicatedEmail = false;
  // tslint:disable-next-line: variable-name
  validate_signupform: FormGroup;
  errorMessage = '';
  // tslint:disable-next-line: variable-name
  validation_messages = {
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
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ]
  };
  // tslint:disable-next-line: variable-name
  validate_fullname = false;
   // tslint:disable-next-line: variable-name
  validate_email = false;
  // tslint:disable-next-line: variable-name
  validate_password = false;
  constructor(
    private keyboard: Keyboard,
    private platform: Platform,
    private fb: Facebook,
    private ga: GoogleAnalytics,
    private fcm: FCM,
    private storage: Storage,
    private router: Router,
    private events: Events,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private ionService: IongagetService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setHeaderAnimation();
    this.googleStart();
    this.getToken();
  }

  initForm() {
    this.validate_signupform = this.formBuilder.group({
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
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('signup').style.minHeight = '100vh';
    });
    this.keyboard.onKeyboardWillHide().subscribe(() => {
      document.getElementById('logo').style.display = 'flex';
      document.getElementById('signup').style.minHeight = '82vh';
    });
  }

  googleStart() {
    this.ga.startTrackerWithId('UA-131219006-1').then(() => {
      this.ga.trackView('Menu');
    }).catch(e => {
      console.log('Error starting GoogleAnalytics', e);
    });
  }

  getToken() {
    this.platform.ready().then(() => {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        if (token.split(':').length > 1) {
          this.deviceID = token.split(':')[0];
        } else {
          this.deviceID = token.split(':')[0];
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {

        if (token.split(':').length > 1) {
          this.deviceID = token.split(':')[0];
          console.log(token);
        } else {
          this.deviceID = token.split(':')[0];
        }
      });
    });
  }

  validateForm() {
    this.validate_fullname = true;
    this.validate_email = true;
    this.validate_password = true;
    this.checkTermsAndPolicy().then(result => {
      console.log(result);
      if (this.validate_signupform.invalid) {
        return;
      }
      if(result) { 
        this.signUpWithEmail();
      }
    })
  }

  signUpWithEmail() {
    this.readyForSubmit = true;
    this.ga.trackEvent('Signup', 'Signup User', this.fname + this.email, 0).then(() => { });
    const password = Md5.hashStr(this.pwd);
    this.authService.signup(this.email, password, this.fname, this.deviceID ).subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.readyForSubmit = false;
        const navprams: NavigationExtras = {
          queryParams: {
            userID: result.id
          }
        };
        this.router.navigate(['verifymail'], navprams);
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
    this.validate_email = event;
    if(event === false) {
      this.duplicatedEmail = false;
    }
  }

  setPasswordValidation(event) {
    this.validate_password = event;
  }

  setFullnameValidation(event) {
    this.validate_fullname = event;
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
    })
  }

  signUpwithFB() {
    this.validate_fullname = false;
    this.validate_email = false;
    this.validate_password = false;
    this.checkTermsAndPolicy().then(result => {
      if (result) {
        this.facebookReady = true;
        this.fb.logout().then((res) => {
          this.fb.login(['public_profile', 'user_friends', 'email']).then((res) => {
            if (res.status === 'connected') {
              this.getUserDetail(res.authResponse.userID);
            } else {
              this.ionService.showAlert('Facebook Error', 'Not Connected');
              this.facebookReady = false;
            }
          })
          .catch(e => {
            this.facebookReady = false;
            this.ionService.presentToast(JSON.stringify(e));
          });
        }).catch(err => {
          this.ionService.presentToast(JSON.stringify(err));
        });
      }
    })
  }

  getUserDetail(fbUserID) {
    this.fb.api('/' + fbUserID + '/?fields=id,email,name,picture,gender',  [ 'public_profile' ]).then(result => {
      if (result) {
        const email = result.email;
        const name = result.name;
        this.facebookSignUp(email, name);
      } else {
        this.ionService.showAlert('Error while Fetching Facebook Credentials', 'Your account might not be valid enough');
        this.facebookReady = false;
      }
    }).catch((err) => {
      this.facebookReady = false;
      this.ionService.showAlert('Error while Fetching Facebook Credentials' , JSON.stringify(err));
    });
  }

  facebookSignUp(email, name) {
    this.ga.trackEvent('Signup', 'Signup User', name + email, 0).then(() => {
    }).catch(err => {
      this.ionService.presentToast(JSON.stringify(err));
      this.facebookReady = false;
    });
    this.authService.facebookSignUp(email, name, this.deviceID).subscribe(async (result) => {
      this.facebookReady = true;
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.facebookSignIn(email);
      } else if (result['RESPONSE'] === 'Email Already Exists') {
        this.facebookSignIn(email);
      } else {
        this.facebookReady = false;
        this.ionService.presentToast( result['RESPONSE']);
      }
    }, err => {
      this.facebookReady = false;
      this.ionService.presentToast('Server API Problem');
    });
  }

  facebookSignIn(email) {
    this.authService.facebookLogIn(email, this.deviceID).subscribe((user)=> {
      console.log(user);
      this.facebookReady = false;
      if (user['RESPONSECODE'] === 1) {
        if (user.isVerify === '0') {  
          const navprams: NavigationExtras = {
            queryParams: {
              userID: user.id
            }
          };
          this.router.navigate(['verifymail'], navprams);
        } else {
          user.email = email;
          this.storage.set('userInfo', user).then(() => {
            this.events.publish('userInfo_set', user);
          });
          if (user.isNewUser === true) {
            this.router.navigate(['subscription'], { replaceUrl: true });
          } else {
            this.router.navigate(['domain-list'], { replaceUrl: true });
          }
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
