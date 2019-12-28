import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { AuthService } from './../../../serverAPI/auth/auth.service';
import { GeneralService } from '../../../services/generalComponents/general.service';
import { StorageService } from './../../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  email = '';
  pwd = '';
  // deviceID: string;
  deviceID = 'fDqyHoxmcp0:APA91bGoSvzXrsGraeN1OshrlgF7ZUuX62vCFvgneX2znZFvYLK21Km9sM0sWd8VaOKgIFCXA8Y2XbkmAnBf--OoJ9oIFL7wMw46g1dffvab6eT0PLiM0v8JbuQH4-vAFM3D9jlZFGcz';
  APNStoken = '';
  DeviceType: string;
  readyForSubmit = false;
  facebookReady = false;
  invalidEmail = false;
  invalidPassword = false;
  validate_signinform: FormGroup;
  extraError: string;
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
  };
  validate_email: boolean = false;
  validate_password: boolean = false;
  constructor(
      private platform: Platform,
      private keyboard: Keyboard,
      private fb: Facebook,
      private ga: GoogleAnalytics,
      private fcm: FCM,
      private router: Router,
      public formBuilder: FormBuilder,
      private ionGagets: IongagetService,
      private authService: AuthService,
      private generalService: GeneralService,
      private storageService: StorageService
    ) {
    }
    ngOnInit() {
    this.googleStart();
    this.setHeaderAnimation();
    this.initForm();
    this.getToken();
  }

  googleStart() {
    // this.ga.startTrackerWithId('UA-131219006-1').then(() => {
    //   this.ga.trackView('Login');
    // }).catch((e) => {
    //   console.log('Error starting GoogleAnalytics', e);
    // });
  }
  getToken() {
    this.platform.ready().then(() => {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        this.deviceID = token;
        if (token.split(':').length > 1) {
          // this.deviceID = token.split(':')[0];
          this.DeviceType = 'I';
        } else {
          // this.deviceID = token.split(':')[0];
          this.DeviceType = 'A';
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        this.deviceID = token;
        if (token.split(':').length > 1) {
          // this.deviceID = token.split(':')[0];
          this.DeviceType = 'I';
        } else {
          // this.deviceID = token.split(':')[0];
          this.DeviceType = 'A';
        }
      });
    });
  }

  setHeaderAnimation() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('login').style.minHeight = '100vh';
    });
    this.keyboard.onKeyboardWillHide().subscribe(() => {
      document.getElementById('logo').style.display = 'flex';
      document.getElementById('login').style.minHeight = '66vh';
    });
  }

  initForm() {
    this.validate_signinform = this.formBuilder.group({
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

  setEmailValidation(event) {
    this.validate_email = event;
    if (event === false) {
      this.invalidEmail = false;
    }
  }

  setPasswordValidation(event) {
    this.validate_password = event;
    if (event === false) {
      this.invalidPassword = false;
    }
  }

  onSigninSubmit() {
    this.validate_email = true;
    this.validate_password = true;
    if (this.validate_signinform.valid) {
      this.DoSignIn();
    }
  }

  openSignup() {
    this.router.navigate(['signup']);
  }

  openForgot() {
    this.generalService.openForgotPassword();
  }

  DoSignIn() {
    this.readyForSubmit = true;
    const password = Md5.hashStr(this.pwd);
    console.log(this.deviceID);
    this.authService.login(this.email, password , this.deviceID, this.DeviceType)
    .subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        result = result.data;
        if (result.user.verified === 0) {
          this.readyForSubmit = false;
          const navprams: NavigationExtras = {
            queryParams: {
              userID: result.user.id
            }
          };
          this.router.navigate(['verifymail'], navprams);
        } else {
          this.storageService.setStorage(result).then((result) => {
            if (result) {
              this.generalService.defineInitialRoutering();
            }
          });
        }
      } else if (result.RESPONSE === "Couldn't find your mail Account") {
        this.extraError = result['RESPONSE'];
        this.readyForSubmit = false;
        this.invalidEmail = true;
      } else if (result.RESPONSE === "Wrong password. Try again") {
        this.readyForSubmit = false;
        this.invalidPassword = true;
      } else  {
        this.extraError = result['RESPONSE'];
        this.readyForSubmit = false;
        this.invalidEmail = true;
      }
    }
    , err => {
      this.readyForSubmit = false;
      this.ionGagets.presentToast('Log In Failed due to bad server');
      this.readyForSubmit = false;
      console.log(err);
    });
  }

  logInFB() {
    this.validate_email = false;
    this.validate_password = false;
    this.fb.getLoginStatus().then((res) => {
      if (res.status === 'connected') {
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.fb.login(['public_profile', 'email']).then((result) => {
          if (result.status === 'connected' ) {
            this.getUserDetail(result.authResponse.userID);
          } else {
            this.ionGagets.showAlert('Facebook Error', 'Not Connected');
            this.facebookReady = false;
          }
        }).catch(err => {
          this.facebookReady = false;
        });
      }
    });
  }

  getUserDetail(fbUserID) {
    this.fb.api('/' + fbUserID + '/?fields=id,email,name,picture,gender',  [ 'public_profile' ]).then(result => {
      if (result) {
        const email = result.email;
        const name = result.name;
        this.facebookSignUp(email, name);
      } else {
        this.ionGagets.presentToast('Your account might not be valid enough');
        this.facebookReady = false;
      }
    }).catch((err) => {
      this.ionGagets.presentToast(JSON.stringify(err));
      this.facebookReady = false;
    });
  }

  facebookSignUp(email, name) {
    // alert(email + name);
    this.ga.trackEvent('Signup', 'Signup User', name + email, 0).then(() => {
    }).catch(err => {
      this.ionGagets.presentToast(JSON.stringify(err));
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
        this.ionGagets.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.facebookReady = false;
      this.ionGagets.presentToast('Server API Problem');
    });
  }

  facebookSignIn(email) {
    this.authService.facebookLogIn(email, this.deviceID).subscribe((result)=> {
      console.log(result);
      this.facebookReady = false;
      if (result['RESPONSECODE'] === 1) {
        result = result.data;
        if (result.user.verified === 0) {
          this.readyForSubmit = false;
          const navprams: NavigationExtras = {
            queryParams: {
              userID: result.user.id
            }
          };
          this.router.navigate(['verifymail'], navprams);
        } else {
          this.storageService.setStorage(result).then((result) => {
            if (result) {
              this.generalService.defineInitialRoutering();
            }
          });
        }
      } else {
        this.ionGagets.presentToast('Sign In by Facebook Failed due to bad response');
      }
    }, err => {
      this.facebookReady = false;
      this.ionGagets.presentToast('Sign In by Facebook Failed due to bad server');
    });
  }
}
