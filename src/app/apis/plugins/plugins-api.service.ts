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
export class PluginsApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  listplugins(userID, domainUserID, domainID, token): any {
    let url = this.domain_url + 'listplugins?';
    url += 'user_id=' + userID + '&domain_id=' + domainID +  '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  connectPlugin(monitor, userID, domainID, domainUserID, token, keys): any {
    let url = this.domain_url + 'connectplugin?';
    url += 'monitor=' + monitor +  '&user_id=' + userID + '&domain_id=' + domainID;
    url += '&domain_user_id=' + domainUserID + '&token=' + token + '&keys=' + keys;
    return this.sendGetRequest(url);
  }

  disconnectPlugin(monitor, userID, domainID, domainUserID, token): any {
   let url = this.domain_url + 'disconnectplugin?';
   url += 'monitor=' + monitor +  '&user_id=' + userID + '&domain_id=' + domainID +  '&domain_user_id=' + domainUserID + '&token=' + token;
   return this.sendGetRequest(url);
  }

  getAnalyticsDetails(domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'getanalyticdetails?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getGoogleConversion(domainName, domainUserID, userID, token) {
    let url = this.report_url + 'getanalyticdetailsconversion?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getGoogleVisitors(domainName, domainUserID, userID, token) {
    let url = this.report_url + 'getanalyticdetailsaudience?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
