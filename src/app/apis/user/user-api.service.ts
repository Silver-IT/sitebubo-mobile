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
export class UserApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  getMyProfile(userID, token): any {
    let url = this.auth_url + 'myprofile?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateMyProfile(name, userID, token): any {
    let url = this.auth_url + 'updateprofile?';
    url += '&name=' + name + '&mobile=8122403630&address=london&status=1';
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  deleteAccount(userID, token): any  {
    let url = this.auth_url + 'deleteaccount?';
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  listeInvitedUser(domainName, userID, token): any  {
    let url = this.auth_url + 'listinviteuser?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  addInvitedUser(domainName, email, emailReport, userID, domainUserID, token ): any  {
    let url = this.auth_url + 'addinviteuser?';
    url += 'domain_name=' + domainName + '&email=' + email + '&email_report=' + emailReport;
    url += '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  deleteInviteUser(inviteID, userID, token): any  {
    let url = this.auth_url + 'deleteinviteuser?';
    url += 'id=' + inviteID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateInvitedUser(emailReport, id, userID, token): any  {
    let url = this.auth_url + 'updateinviteuser?';
    url += 'email_report=' + emailReport + '&id=' + id + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  resendInvitationEmail(email, domainName, domainUserID, userID, token): any  {
    let url = this.auth_url + 'resendinvitation?';
    url += 'email=' + email + '&domain_name=' + domainName + '&user_id=' + userID + '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
