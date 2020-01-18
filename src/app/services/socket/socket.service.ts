import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  defineEventHandlers(eventName, fnHandler) {
    this.socket.on(eventName, (data) => {
      fnHandler(data);
    });
  }

  removeHandler(eventName) {
    this.socket.removeAllListeners(eventName);
  }

  websiteScan(params) {
    this.socket.emit('request-web-scanning', params);
  }

  defineDashboardEvents( domainUrl, domainData) {
    console.log(domainData);
    this.socket.on(`/domain/${domainUrl}/monitor/uptime`, (res) => {
      domainData.uptime.status = res.result;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/security`, (res) => {
      domainData.security.desc = res.result;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/pagespeed`, (res) => {
      domainData['site-speed'].speedindex = res.result;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/seomonitor`, (res) => {
      domainData['seo-score'].seoscore = res.result;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/brokenlink`, (res) => {
      domainData['broken-links'].count = res.result;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/googleanalytics`, (res) => {
      domainData.analytics.conversion = res.conversionrate;
      domainData.analytics.visitors = res.users;
    });
    this.socket.on(`/domain/${domainUrl}/monitor/domainexpire`, (res) => {
      domainData['domain-expiry'].expiry = res.result;
    });
  }

  removeAllDashboardHandlers(domainUrl) {
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/uptime`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/security`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/pagespeed`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/seomonitor`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/brokenlink`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/googleanalytics`);
    this.socket.removeAllListeners(`/domain/${domainUrl}/monitor/domainexpire`);
  }
}
