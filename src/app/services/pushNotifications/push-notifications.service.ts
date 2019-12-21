import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TempService } from '../temp/temp.service';
import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(
    private router: Router,
    private tempService: TempService,
    private popover: PopoverController
  ) { }

  treatNotificationEvents(data) {
    const event = data.event;
    switch(event) {
      case "uptime": {
        this.router.navigate(['tabs/uptime']);
      }
      case "security": {
        alert('security');
        data.pageType = 1;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then((result) => {
          if (result) {
            this.router.navigate(['tabs/security'], { queryParams: { notification: true } });
          }
        });
      }
      case "malware": {
        data.pageType = 2;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/security']);
        });
      }
      case 'blacklist' : {
        data.pageType =3;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/security']);
        });
      }
      case 'googleSpeed': {
        data.pageType = 1;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/speed']);
        });
      }
      case 'desktop': {
        data.pageType = 2;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/speed']);
        });
      }
      case 'mobile': {
        data.pageType = 3;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/speed']);
        });
      }
      case 'seo': {
        data.pageType = 1;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/seo']);
        });
      }
      case 'expiry': {
        data.pageType = 1;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/more']);
        });
      }
      case 'brokenlinks': {
        data.pageType = 2;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/more']);
        });
      }
      case 'coversionRate': {
        data.pageType = 3;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/more']);
        });
      }
      case 'visitors': {
        data.pageType = 4;
        this.tempService.saveDashboradParams(data, this.tempService.filterType).then(() => {
          this.router.navigate(['tabs/more']);
        });
      }
    }
  }

  launchNotification() {
    
  }
}
