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
export class SubscriptionApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  getSubscriptionPlan(userID, token): any {
    let url = this.subscription_url + 'getsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSubscriptionPlanDetails(subscriptionID, userID, token): any {
    let url = this.subscription_url + 'subscriptiondetails?';
    url  += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activatefreesubscription(subscriptionID, userID, token): any {
    let url = this.subscription_url + 'activatefreesubscription?';
    url += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activateSubscriptionIos(subscriptionID, transactionID, productType, userID, token): any {
    let url = this.subscription_url + 'activatesubscriptionios?';
    url += 'subscription_id=' + subscriptionID + '&transaction_id=' + transactionID;
    url += '&producttype=' +  productType;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  currentSubscription(userID, token): any {
    let url = this.subscription_url + 'currentsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  downgradePlan(domains, userID, tokenValue, feedback): any {
    const postData = {
      user_id: userID,
      token: tokenValue,
      reason: feedback,
      domains_to_remove: JSON.stringify(domains)
    };
    console.log(postData);
    const url = this.subscription_url + 'downgradeplan';
    return this.sendPostRequest(url, postData);
  }
}
