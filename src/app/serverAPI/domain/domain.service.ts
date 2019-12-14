import { Events } from '@ionic/angular';
import { BaseService } from './../base/base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomainService extends BaseService{
  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    super(https, router, storage, events)
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

  addDomain(comanyName, domainName, userID, token) {
    let url = this.domain_url + 'adddomain?';
    url += 'company_name=' + comanyName + '&domain_name=' + domainName + '&user_id=' + userID;
    url += '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateDomain(id, companyName, domainName, userID, token) {
    let url = this.domain_url + 'updatedomain?';
    url += 'id=' + id + '&company_name=' + companyName + '&domain_name=' + domainName + '&user_id=' + userID;
    url += '&token=' + token;
    return this.sendGetRequest(url);
  }

  deleteDomain(domainName, userID, token) {
    let url = this.domain_url + 'deletedomain?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  validateDomain(domainName, userID, token) {
    let url = this.domain_url + 'domainvalidate?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  checkDomainCount(subscriptionID, userID, token) {
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

  reorderDomains(domainIDs, userID, token) {
    let url = this.domain_url + 'updatedomainorders?';
    url += 'domains=' + domainIDs + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateMonitorOrders(data) {
    let url = this.auth_url + 'updatemonitororders'
    return this.sendPostRequest(url, data);
  }
}
