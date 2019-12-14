import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService{

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    super(https, router, storage, events)
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
