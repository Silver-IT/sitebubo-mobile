import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { BaseService } from './../base/base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PluginsService extends BaseService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    super(https, router, storage, events)
   }

   listplugins(userID, domainUserID, domainID, token): any {
     let url = this.domain_url + 'listplugins?';
     url += 'user_id=' + userID + '&domain_id=' + domainID +  '&domain_user_id=' + domainUserID + '&token=' + token;
     return this.sendGetRequest(url);  
   }

   connectPlugin(monitor, userID, domainID, domainUserID, token, keys): any {
    let url = this.domain_url + 'connectplugin?';
     url += 'monitor=' + monitor +  '&user_id=' + userID + '&domain_id=' + domainID +  '&domain_user_id=' + domainUserID + '&token=' + token + '&keys=' + keys;
     return this.sendGetRequest(url);  
   }

   disconnectPlugin(monitor, userID, domainID, domainUserID, token): any {
    let url = this.domain_url + 'disconnectplugin?';
    url += 'monitor=' + monitor +  '&user_id=' + userID + '&domain_id=' + domainID +  '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);  
   }
  //  getGoogleAnalyticsInfo(domainName, domainUserID, userID, token): any {
  //    let url = this.report_url + 'getanalyticdetails?';
  //    url += 'domain_name=' +  domainName + '&domain_user_id=' +  domainUserID;
  //    url += '&user_id=' + userID + '&token=' + token;
  //    return this.sendGetRequest(url);
  //  }

  //  connectGoogleAnalytics(viewID, domainName, userID, token): any {
  //   let url = this.report_url + 'updateanalyticid?';
  //   url += 'id=' + viewID + '&domain_name=' + domainName;
  //   url += '&user_id=' + userID + '&token=' + token;
  //   return this.sendGetRequest(url);
  // }

  // disconnectGoogleAnalytics(domainName, domainID, userID, token): any {
  //   let url = this.report_url + 'removeanalyticid?';
  //   url += 'domain_name=' + domainName + '&domain_id=' + domainID;
  //   url += '&user_id=' + userID + '&token' + token;
  //   return this.sendGetRequest(url);
  // }


}
