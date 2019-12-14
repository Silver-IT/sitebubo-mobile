import { Events } from '@ionic/angular';
import { BaseService } from './../base/base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorService extends BaseService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) { 
    super(https, router, storage, events)
  }

  updateMonitorOrders(monitors, domain_id, userID, token): any {
    let url = `${this.domain_url}updatemonitororders?`;
    url += 'monitors=' + monitors + '&domain_id=' + domain_id + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getUptimeStatus(domainName, domainUserID , userID, token): any {
    let url = `${this.uptime_url}uptimestatus?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getPageSpeed (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}getpagespeedgoogle?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSeoReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}reportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getDesktopReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}desktopreportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getMobileReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}mobilereportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getBrokenLinkReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}brokenlink?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getVirusReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}websitesecurity?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSecurityReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}security?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getBlackListReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}blacklist?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  } 

  getDomainExpireReport (domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}expirereport?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getIssuesRport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}manualreportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
