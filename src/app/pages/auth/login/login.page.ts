import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { FCM } from '@ionic-native/fcm/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { GeneralService } from '../../../services/generalComponents/general.service';
import { StorageService } from './../../../services/storage/storage.service';
import { AuthApiService } from 'src/app/apis/auth/auth-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  pwd = '';
  deviceID: string;
  deviceType: string;
  readyForSubmit = false;
  facebookReady = false;
  invalidEmail = false;
  invalidPassword = false;
  validateSigninform: FormGroup;
  extraError: string;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
  };
  validateEmail = false;
  validatePassword = false;
  constructor(
    private platform: Platform,
    private fb: Facebook,
    private fcm: FCM,
    private formBuilder: FormBuilder,
    private router: Router,
    private generalService: GeneralService,
    private ionService: IongadgetService,
    private storageService: StorageService,
    private authAPI: AuthApiService,
  ) { }

  ngOnInit() {
    this.setHeaderAnimation();
    this.initForm();
    this.getToken();
  }

  getToken() {
    this.platform.ready().then(() => {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        console.log('Token=====================  ', token);
        this.deviceID = token;
        if (token.split(':').length > 1) {
          this.deviceType = 'I';
        } else {
          this.deviceType = 'A';
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        this.deviceID = token;
        if (token.split(':').length > 1) {
          this.deviceType = 'I';
        } else {
          this.deviceType = 'A';
        }
      });
    });
  }

  setHeaderAnimation() {
    // this.keyboard.onKeyboardWillShow().subscribe(() => {
    //   document.getElementById('logo').style.display = 'none';
    //   document.getElementById('login').style.minHeight = '100vh';
    // });
    // this.keyboard.onKeyboardWillHide().subscribe(() => {
    //   document.getElementById('logo').style.display = 'flex';
    //   document.getElementById('login').style.minHeight = '66vh';
    // });
  }

  initForm() {
    this.validateSigninform = this.formBuilder.group({
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
    this.validateEmail = event;
    if (event === false) {
      this.invalidEmail = false;
    }
  }

  setPasswordValidation(event) {
    this.validatePassword = event;
    if (event === false) {
      this.invalidPassword = false;
    }
  }

  onSigninSubmit() {
    this.validateEmail = true;
    this.validatePassword = true;
    if (this.validateSigninform.valid) {
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
    this.authAPI.login(this.email, password , this.deviceID, this.deviceType)
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
          this.router.navigate(['verifyemail'], navprams);
        } else {
          this.storageService.setStorage(result).then((res) => {
            if (res) {
              this.generalService.defineInitialRoutering();
            }
          });
        }
      } else if (result.RESPONSE === 'Couldn\'t find your mail Account') {
        this.extraError = result.RESPONSE;
        this.readyForSubmit = false;
        this.invalidEmail = true;
      } else if (result.RESPONSE === 'Wrong password. Try again') {
        this.readyForSubmit = false;
        this.invalidPassword = true;
      } else  {
        this.extraError = result.RESPONSE;
        this.readyForSubmit = false;
        this.invalidEmail = true;
      }
    }
    , err => {
      this.readyForSubmit = false;
      this.ionService.presentToast('Log In Failed due to bad server');
      this.readyForSubmit = false;
      console.log(err);
    });
  }


  logInFB() {
    this.validateEmail = false;
    this.validatePassword = false;
    this.fb.getLoginStatus().then((res) => {
      if (res.status === 'connected') {
        this.fb.logout().then(() => {
          this.logInFBStep2();
        });
      } else {
        this.logInFBStep2();
      }
    });
  }

  logInFBStep2() {
    this.fb.login(['public_profile', 'email']).then((result) => {
      if (result.status === 'connected' ) {
        this.getUserDetail(result.authResponse.userID);
      } else {
        this.ionService.presentToast('Facebook Login Failed');
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
        this.ionService.presentToast('Your account might not be valid enough');
        this.facebookReady = false;
      }
    }).catch((err) => {
      this.ionService.presentToast(JSON.stringify(err));
      this.facebookReady = false;
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
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.facebookReady = false;
      this.ionService.presentToast('Server API Problem');
    });
  }

  facebookSignIn(email) {
    this.authAPI.facebookLogIn(email, this.deviceID).subscribe((result) => {
      console.log(result);
      this.facebookReady = false;
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
          this.storageService.setStorage(result).then((res) => {
            if (res) {
              this.generalService.defineInitialRoutering();
            }
          });
        }
      } else {
        this.ionService.presentToast('Sign In by Facebook Failed due to bad response');
      }
    }, err => {
      this.facebookReady = false;
      this.ionService.presentToast('Sign In by Facebook Failed due to bad server');
    });
  }
}
