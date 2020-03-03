import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { NotificationApiService } from 'src/app/apis/notification/notification-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.page.html',
  styleUrls: ['./notification-setting.page.scss'],
})
export class NotificationSettingPage implements OnInit, OnChanges {
  userID: number;
  token: string;
  filterType = 1;
  bydomainSetting: Array<any> = [];
  generalSetting: any;
  constructor(
    private notifcationAPI: NotificationApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
    this.initData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ionViewWillEnter() {
  }

  initData() {
    this.storage.get('userInfo').then(user => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getNotificationSettings(user.id, user.token);
      }
    });
  }

  getNotificationSettings(userID, token) {
    this.notifcationAPI.getNotificationSetting(userID, token).subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.bydomainSetting = result.data.domains;
        this.generalSetting = result.data.general;
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    });
  }

  changeObjectToArray(generalSetting): any {
    return new Promise((resolve) => {
      const temp = [];
      Object.keys(generalSetting).map((personNamedIndex) => {
        const person = generalSetting[personNamedIndex];
        const onevalue = {};
        onevalue[personNamedIndex] = person;
        temp.push(onevalue);
      });
      resolve(temp);
    });
  }

  listenGeneralSettings(key, $event) {
    const value = $event.detail.checked;
    this.generalSetting[key] = value;
    console.log(this.generalSetting);
    this.changeObjectToArray(this.generalSetting).then((res) => {
      this.notifcationAPI.saveGeneralPermission(this.userID, this.token, JSON.stringify(res)).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          console.log(result);
        } else {
          this.ionService.presentToast(result.RESPONSE);
        }
      }, err => {
        this.ionService.presentToast('Server API Problem');
      });
    });
  }

  listenDomainMonitors(item, key, $event) {
    const value = $event.detail.checked;
    item.notification[key] = value;
    console.log(item);
    this.changeObjectToArray(item.notification).then(res => {
      this.notifcationAPI.saveDomainPushPermission(this.userID, this.token, item.id, JSON.stringify(res)).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
        } else {
          this.ionService.presentToast(result.RESPONSE);
        }
      }, err => {
        this.ionService.presentToast('Server API Problem');
      });
    });
  }

  switchpage(event) {
    this.filterType = parseInt(event.target.value, 10);
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  back() {
    this.navCtrl.back();
  }
}
