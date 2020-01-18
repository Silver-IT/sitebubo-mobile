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
export class DomainApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  domainCount(userID, token): any {
    let url = this.domain_url + 'domaincount?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getDomainList(userID, token): any {
    let url = this.domain_url + 'listdomain?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  addDomain(comanyName, domainName, userID, token): any {
    let url = this.domain_url + 'adddomain?';
    url += 'company_name=' + comanyName + '&domain_name=' + domainName + '&user_id=' + userID;
    url += '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateDomain(id, companyName, domainName, userID, token): any {
    let url = this.domain_url + 'updatedomain?';
    url += 'id=' + id + '&company_name=' + companyName + '&domain_name=' + domainName + '&user_id=' + userID;
    url += '&token=' + token;
    return this.sendGetRequest(url);
  }

  deleteDomain(domainName, userID, token): any {
    let url = this.domain_url + 'deletedomain?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  validateDomain(domainName, userID, token): any {
    let url = this.domain_url + 'domainvalidate?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  checkDomainCount(subscriptionID, userID, token): any {
    let url = this.domain_url + 'checkdomainlist?';
    url += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  detailedDomain(domainName, domainUserID, userID, token): any {
    let url = this.auth_url + 'dashboard?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  reorderDomains(domainIDs, userID, token): any {
    let url = this.domain_url + 'updatedomainorders?';
    url += 'domains=' + domainIDs + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateMonitorOrders(data): any {
    const url = this.auth_url + 'updatemonitororders';
    return this.sendPostRequest(url, data);
  }
}
