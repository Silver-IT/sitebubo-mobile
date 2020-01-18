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
export class OtherApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  getFeedbackQuestions(userID, token): any {
    let url = this.auth_url + 'listquestion?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  addFeedback(data, userID, token): any {
    let url = this.auth_url + 'addfeedback?';
    url += 'data=' + data + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  agreeOnTerms(userID, token): any {
    let url = this.auth_url + 'acceptlatestterms?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getPrivacyPolicy(): any {
    const url = this.other_url + 'viewpage?page_id=2';
    return this.sendGetRequest(url);
  }

  getTermsConditions(): any {
    const url = this.other_url + 'viewpage?page_id=1';
    return this.sendGetRequest(url);
  }
}
