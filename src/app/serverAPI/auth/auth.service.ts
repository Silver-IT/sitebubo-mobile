import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BaseService } from './../base/base.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  
  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
    ) {
    super(https, router, storage, events);
  }

  login(email, password, deviceID, deviceName): any {
    let url = this.auth_url + 'login?';
    url += 'email=' + email + '&password=' + password;
    url += '&device_id=' + deviceID + '&device_name=' + deviceName;
    console.log(url);
    return this.sendGetRequest(url);
  }

  facebookLogIn(email, deviceID): any {
    let url = this.auth_url + 'login?';
    url += 'email=' + email + '&openid=facebook&device_id=' + deviceID;
    console.log(url);
    return this.sendGetRequest(url);
  }

  facebookSignUp(email, name, deviceID): any {
    let url = this.auth_url + 'register?';
    url += 'email=' + email + '&name=' + name + '&mobile=000&address=&user_type=Member&status=1&openid=facebook&device_id=' + deviceID; 
    // alert('fb sign up' + url);
    console.log(url);
    return this.sendGetRequest(url);
  }

  resendEmail(userID): any {
    let url = this.auth_url + 'resendverification?';
    url += 'user_id=' + userID;
    console.log(url);
    return this.sendGetRequest(url);
  }


  signup( email, password, fullname, deviceID ): any {
    let url = this.auth_url + 'register?';
    url += 'email=' + email;
    url += '&password=' + password;
    url += '&name=' + fullname;
    url += '&mobile=000&address=&user_type=Member&status=1';
    url += '&device_id=' + deviceID;
    console.log(url);
    return this.sendGetRequest(url);
  }

  validateEmail(userID, code): any {
    let url = this.auth_url + 'validateemail?';
    url += 'code=' + code + '&user_id=' + userID;
    console.log(url);
    return this.sendGetRequest(url);
  }

  forgotPassword(email) {
    let url = this.auth_url + 'forgotPassword?';
    url += 'email=' + email;
    console.log(url);
    return this.sendGetRequest(url);
  }

  resetPassword(email, password, code): any {
    let url = this.auth_url + 'resetpassword?';
    url += 'email=' + email + '&password=' + password + '&code=' + code;
    console.log(url);
    return this.sendGetRequest(url);
  }

  verifyToken(token): any {
    let url = this.auth_url + 'verifytoken?';
    url += 'token=' + token;
    console.log(url);
    return this.sendGetRequest(url);
  }
}
