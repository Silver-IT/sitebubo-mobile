import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  public dashboardParams: any;
  public notifications: any;
  public filterType = 0;
  public unreadCount: any;
  public brokenLinksCount: number;
  constructor() {
  }

  saveDashboradParams(params, filterType): Promise<boolean> {
    return new Promise((resolve) => {
      this.dashboardParams = params; 
      this.filterType = filterType;
      resolve(true);
    });
  }

  saveBrokenLinksCount(count): Promise<boolean> {
    return new Promise((resolve) => {
      this.brokenLinksCount = count;
      resolve(true);
    });
  }
  
  saveNotifications(notifications): Promise<boolean> {
    return new Promise((resolve) => {
      this.notifications = notifications;
      resolve(true);
    });
  }

  saveUnreadCount(count): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.unreadCount = count;
      resolve(true);
    });
  }
}
