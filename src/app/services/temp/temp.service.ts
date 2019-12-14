import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  public dashboardParams: any;
  public notifications: any;
  public filterType = 0;
  public unreadCount: any;
  constructor() {
  }

  saveDashboradParams(params, filterType): Promise<any> {
    return new Promise((resolve) => {
      this.dashboardParams = params; 
      this.filterType = filterType;
      resolve(true);
    });
  }
  
  saveNotifications(notifications): Promise<any> {
    return new Promise((resolve) => {
      this.notifications = notifications;
      resolve(true);
    });
  }

  saveUnreadCount(count): Promise<any> {
    return new Promise((resolve, reject) => {
      this.unreadCount = count;
      resolve(true);
    });
  }
}
