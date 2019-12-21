import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    super(https, router, storage, events)
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

  addInvitedUser(domainName, email, email_report, userID, domainUserID, token ): any  {
    let url = this.auth_url + 'addinviteuser?';
    url += 'domain_name=' + domainName + '&email=' + email + '&email_report=' + email_report;
    url += '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  deleteInviteUser(inviteID, userID, token): any  {
    let url = this.auth_url + 'deleteinviteuser?';
    url += 'id=' + inviteID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateInvitedUser(email_report, id, userID, token): any  {
    let url = this.auth_url + 'updateinviteuser?';
    url += 'email_report=' + email_report + '&id=' + id + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  resendInvitationEmail(email, domainName, domainUserID, userID, token): any  {
    let url = this.auth_url + 'resendinvitation?';
    url += 'email=' + email + '&domain_name=' + domainName + '&user_id=' + userID + '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
