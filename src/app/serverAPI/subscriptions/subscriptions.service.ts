import { BaseService } from './../base/base.service';
import { Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService extends BaseService{
  
  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) { 
    super(https, router, storage, events)
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

  currentSubscription(userID, token): any {
    let url = this.subscription_url + 'currentsubscription?';
    url += 'user_id=' + userID + '&token=' + token; 
    return this.sendGetRequest(url);
  }

  downgradePlan(domains, userID, token, feedback): any {
    let postData = {
      'user_id': userID,
      'token': token,
      'reason': feedback,
      'domains_to_remove': domains
    }
    console.log(postData);
    let url = this.subscription_url + 'downgradeplan';
    return this.sendPostRequest(url, postData);
  }

  

  
}
