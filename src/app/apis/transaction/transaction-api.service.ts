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
export class TransactionApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  getTransactionHistory(userID, token): any {
    let url = this.subscription_url + 'transactionhistroy?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getLastPaymentHistory(userID, token): any {
    let url = this.subscription_url + 'getlastpayment?';
    url +=  'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
