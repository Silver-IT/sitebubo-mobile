import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    super(https, router, storage, events)
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
    let url = `${this.auth_url}reportbug?`
    url += 'message=' + message + '&type=' + type + '&subject=' + subject;
    url += '&domain_name=' + domainName + '&user_id' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

}
