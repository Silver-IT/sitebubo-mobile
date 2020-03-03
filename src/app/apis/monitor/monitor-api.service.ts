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
export class MonitorApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
    ) {
    super(https, router, storage, events, facebook);
  }

  updateMonitorOrders(monitors, domainID, userID, token): any {
    let url = `${this.domain_url}updatemonitororders?`;
    url += 'monitors=' + monitors + '&domain_id=' + domainID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getUptimeStatus(filter, domainName, domainUserID , userID, token): any {
    let url = `${this.uptime_url}uptimestatus?`;
    url += 'filter=' + filter + '&domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  // getPageSpeed(domainName, domainUserID, userID, token): any {
  //   let url = `${this.report_url}getpagespeedgoogle?`;
  //   url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
  //   return this.sendGetRequest(url);
  // }

  getPageSpeed(filter, domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'getpagespeedgoogle_details?';
    url += 'filter=' + filter + '&domain_name=' + domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  // getSeoReport(domainName, domainUserID, userID, token): any {
  //   let url = `${this.report_url}reportdetails?`;
  //   url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
  //   return this.sendGetRequest(url);
  // }

  getDesktopReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}desktopreportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getMobileReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}mobilereportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getBrokenLinkReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}brokenlink?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getVirusReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}websitesecurity?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSecurityReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}security?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getBlackListReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}blacklist?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getDomainExpireReport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}expirereport?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getIssuesRport(domainName, domainUserID, userID, token): any {
    let url = `${this.report_url}manualreportdetails?`;
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getDeskopSpeed(filter, domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'getpagespeedgoogle_report?type=desktop';
    url += '&filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getMobileSpeed(filter, domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'getpagespeedgoogle_report?type=mobile';
    url += '&filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getGoogleAnalytics(filter, domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'getanalyticdetails_new?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSeoDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.report_url + 'seodetails?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getOverviewDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.server_url + 'overview?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getCpuDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.server_url + 'cpu?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getRamDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.server_url + 'ram?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getDiskDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.server_url + 'disks?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getNetworkDetails(filter, domainName, domainUserID, userID, token): any {
    let url = this.server_url + 'network?';
    url += 'filter=' + filter + '&domain_name=' +  domainName + '&domain_user_id=' + domainUserID;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  connectServerMonitor(userId, domainID, domainUserID, token, keys) {
    let url = this.domain_url + 'connectplugin?';
    url += 'monitor=server-monitor' + '&user_id=' + userId + '&domain_id=' + domainID;
    url += '&domain_user_id=' + domainUserID + '&token=' + token + '&keys=' + keys;
    return this.sendGetRequest(url);
  }

  verifyServerMonitor(userId, domainID, domainUserID, token) {
    let url = this.domain_url + 'verifyplugin?';
    url += 'monitor=server-monitor' + '&user_id=' + userId + '&domain_id=' + domainID;
    url += '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  updateVerifyPlugin(userId, domainID, domainUserID, token) {
    let url = this.domain_url + 'updateverifyplugin?';
    url += 'monitor=server-monitor' + '&user_id=' + userId + '&domain_id=' + domainID;
    url += '&domain_user_id=' + domainUserID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
