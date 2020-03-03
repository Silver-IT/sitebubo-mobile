import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { Storage } from '@ionic/storage';
import { TempService } from 'src/app/services/temp/temp.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-server-monitor',
  templateUrl: './server-monitor.page.html',
  styleUrls: ['./server-monitor.page.scss'],
})
export class ServerMonitorPage implements OnInit {
  serverData: any;
  userID: number;
  token: string;
  constructor(
    private modalCtrl: ModalController,
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    public tempService: TempService,
    private social: SocialSharing,
    private iab: InAppBrowser,
    private ionService: IongadgetService,
    ) {
    }

    ngOnInit() {
      this.storage.get('userInfo').then((user) => {
        this.userID = user.id;
        this.token = user.token;
        this.initData();
      });
    }

    initData() {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.monitorAPI.verifyServerMonitor(this.userID, params.domainID, params.domainUserID, this.token)
    .subscribe((res) => {
      console.log(res);
      this.ionService.closeLoading();
      if (res.RESPONSECODE === 1) {
        this.serverData = res.data;
      } else {
        this.ionService.presentToast(res.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  gotoLink(url) {
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

  verifyServerMonitor() {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.monitorAPI.updateVerifyPlugin(this.userID, params.domainID, params.domainUserID, this.token)
    .subscribe((res) => {
      console.log(res);
      this.ionService.closeLoading();
      if (res.RESPONSECODE === 1) {
        this.ionService.presentToast('Successfully connected server monitor.');
        this.modalCtrl.dismiss(true);
      } else {
        if (res.RESPONSE === 'Step 1 not verified') {
          this.ionService.presentToast('Step 1 -nMon is not installed');
        } else {
          this.ionService.presentToast(res.RESPONSE);
        }
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }

  shareWithSocial(param) {
    if (this.serverData) {
      if (param === 'code') {
        this.social.share(this.serverData.command, 'Run this command')
        .then((res) => {
        });
      } else {
        // tslint:disable-next-line: max-line-length
        this.social.share('Download this html file', 'Upload it to your server', this.serverData.verification_file , this.serverData.verification_file);
      }
    }
  }
}
