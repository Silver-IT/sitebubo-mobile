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
export class NotificationApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  getNotifications(domainName, domainUserID, userID, token): any {
    let url = this.auth_url + 'notification?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  readNotifications(domainName, userID, token): any {
    let url = this.auth_url + 'notificationupdate?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getNotificationSetting(userID, token): any {
    let url = this.auth_url + 'pushconfigurations?';
    url += 'user_id=' + userID + '&token=' +  token;
    return this.sendGetRequest(url);
  }

  saveGeneralPermission(userID, token, monitors): any {
    let url = this.auth_url + 'pushgeneralpermission?';
    url += 'user_id=' + userID + '&token=' + token + '&monitors=' + monitors;
    return this.sendGetRequest(url);
  }

  saveDomainPushPermission(userID, token, domainID, monitors): any {
    let url = this.auth_url + 'pushdomainpermission?';
    url += 'user_id=' + userID + '&token=' + token + '&monitors=' + monitors + '&domain_id=' + domainID;
    return this.sendGetRequest(url);
  }
}
