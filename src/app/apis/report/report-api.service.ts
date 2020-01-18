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
export class ReportApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  generateReport(domainName, userID, token): any {
    let url = this.report_url + 'generatereport?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  manualScan(domainName, domainUserID, userID, token ): any {
    let url = this.report_url + 'manualscan?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  reportBug(message, type, subject, domainName, userID, token): any {
    let url = `${this.auth_url}reportbug?`;
    url += 'message=' + message + '&type=' + type + '&subject=' + subject;
    url += '&domain_name=' + domainName + '&user_id' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateManualScanCount(domainID, userID, token): any {
    let url = this.report_url + 'manualscancount?';
    url += 'domain_id=' + domainID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
