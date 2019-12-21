import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TempService } from '../temp/temp.service';
import { PopoverController } from '@ionic/angular';
import { NotificationPopComponent } from 'src/app/components/popover/notification-pop/notification-pop.component';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(
    private router: Router,
    private tempService: TempService,
    private popover: PopoverController,
    private fcm: FCM
  ) { }

  treatNotificationEvents(data) {
    const event = data.event;
    switch(event) {
      case "uptime": {
        this.router.navigate(['tabs/uptime']);
      }
      case "security": {
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

  async launchpopover(push) {
    const pop = await this.popover.create({
      component: NotificationPopComponent,
      componentProps: {
        pushData: JSON.stringify(push)
      },
      cssClass: 'pushPop',
      mode: 'ios'
    });
    await pop.present();
  }

  listenFCM() {
    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        // this.launchpopover(data);
      } else {
       this.launchpopover(data);
      }
    });
  }

  unlistenFCM() {
    this.fcm.unsubscribeFromTopic('all');
  }
}
