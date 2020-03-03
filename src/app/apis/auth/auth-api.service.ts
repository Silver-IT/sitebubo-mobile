import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './../base/base-api.service';
import { Facebook } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  login(email, password, deviceID, deviceName): any {
    let url = this.auth_url + 'login?';
    url += 'email=' + email + '&password=' + password;
    url += '&device_id=' + deviceID + '&device_name=' + deviceName;
    return this.sendGetRequest(url);
  }

  logOut(userID, deviceID, token) {
    let url = this.auth_url + 'logout?';
    url += 'user_id=' + userID + '&device_id=' + deviceID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  facebookLogIn(email, deviceID): any {
    let url = this.auth_url + 'login?';
    url += 'email=' + email + '&openid=facebook&device_id=' + deviceID;
    return this.sendGetRequest(url);
  }

  facebookSignUp(email, name, deviceID): any {
    let url = this.auth_url + 'register?';
    url += 'email=' + email + '&name=' + name + '&mobile=000&address=&user_type=Member&status=1&openid=facebook&device_id=' + deviceID;
    // alert('fb sign up' + url);
    return this.sendGetRequest(url);
  }

  resendEmail(userID): any {
    let url = this.auth_url + 'resendverification?';
    url += 'user_id=' + userID;
    return this.sendGetRequest(url);
  }


  signup( email, password, fullname, deviceID ): any {
    let url = this.auth_url + 'register?';
    url += 'email=' + email;
    url += '&password=' + password;
    url += '&name=' + fullname;
    url += '&mobile=000&address=&user_type=Member&status=1';
    url += '&device_id=' + deviceID;
    return this.sendGetRequest(url);
  }

  validateEmail(userID, code): any {
    let url = this.auth_url + 'validateemail?';
    url += 'code=' + code + '&user_id=' + userID;
    return this.sendGetRequest(url);
  }

  forgotPassword(email) {
    let url = this.auth_url + 'forgotPassword?';
    url += 'email=' + email;
    return this.sendGetRequest(url);
  }

  resetPassword(email, password, code): any {
    let url = this.auth_url + 'resetpassword?';
    url += 'email=' + email + '&password=' + password + '&code=' + code;
    return this.sendGetRequest(url);
  }

  verifyToken(token): any {
    let url = this.auth_url + 'verifytoken?';
    url += 'token=' + token;
    return this.sendGetRequest(url);
  }
}
