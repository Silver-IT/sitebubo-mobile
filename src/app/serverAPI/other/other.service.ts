import { BaseService } from './../base/base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OtherService extends BaseService{

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) { 
    super(https, router, storage, events)
  }

  getFeedbackQuestions(userID, token): any {
    let url = this.auth_url + 'listquestion?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  addFeedback(data, userID, token) {
    let url = this.auth_url + 'addfeedback?';
    url += 'data=' + data + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
  
  agreeOnTerms(userID, token) {
    let url = this.auth_url + 'acceptlatestterms?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getPrivacyPolicy() {
    const url = this.other_url + 'viewpage?page_id=2';
    return this.sendGetRequest(url);
  }

  getTermsConditions() {
    const url = this.other_url + 'viewpage?page_id=1';
    return this.sendGetRequest(url);
  }


}
