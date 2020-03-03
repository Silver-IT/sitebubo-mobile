import { Injectable } from '@angular/core';
// modules
import { Router } from '@angular/router';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Storage } from '@ionic/storage';
import { ModalController, PopoverController, Events, ActionSheetController } from '@ionic/angular';
// apis
import { AuthApiService } from './../../apis/auth/auth-api.service';
import { NotificationApiService } from './../../apis/notification/notification-api.service';
import { MonitorApiService } from './../../apis/monitor/monitor-api.service';
import { SubscriptionApiService } from './../../apis/subscription/subscription-api.service';
import { ReportApiService } from './../../apis/report/report-api.service';
// services
import { IongadgetService } from '../ionGadgets/iongadget.service';
import { TempService } from './../temp/temp.service';
// modals
import { MonitorIssuesPage } from './../../pages/modals/monitor-issues/monitor-issues.page';
import { NotificationListPage } from './../../pages/modals/notification-list/notification-list.page';
import { MyprofilePage } from 'src/app/pages/modals/myprofile/myprofile.page';
import { FeedbackPage } from 'src/app/pages/modals/feedback/feedback.page';
import { ForgotpasswordPage } from './../../pages/modals/forgotpassword/forgotpassword.page';
import { PrivacyPage } from 'src/app/pages/modals/privacy/privacy.page';
import { AddDomainPage } from 'src/app/pages/modals/add-domain/add-domain.page';
import { InviteUserPage } from './../../pages/modals/invite-user/invite-user.page';
import { TermsPage } from 'src/app/pages/modals/terms/terms.page';
import { GoogleAnalyticsPage } from './../../pages/modals/google-analytics/google-analytics.page';
import { AllDonePage } from 'src/app/pages/modals/all-done/all-done.page';
import { ServerMonitorPage } from 'src/app/pages/modals/server-monitor/server-monitor.page';
// popover
import { PallDoneComponent } from './../../components/popover/pall-done/pall-done.component';
// plugins
import { Facebook } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private router: Router,
    private appRate: AppRate,
    private storage: Storage,
    private events: Events,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private actionCtrl: ActionSheetController,
    private subscriptionAPI: SubscriptionApiService,
    private authAPI: AuthApiService,
    private notificationAPI: NotificationApiService,
    private monitorAPI: MonitorApiService,
    private reportAPI: ReportApiService,
    private tempService: TempService,
    private fb: Facebook,
    private ionService: IongadgetService
  ) { }

  async openMyProfile() {
    const myProfile = await this.modalCtrl.create({
      component: MyprofilePage
    });
    return await myProfile.present();
  }

  async openFeedback() {
    const feedback = await this.modalCtrl.create({
        component: FeedbackPage
    });
    return await feedback.present();
  }

  async openForgotPassword() {
    const forgot = await this.modalCtrl.create({
      component: ForgotpasswordPage
    });
    return await forgot.present();
  }

  async openRating() {
    this.appRate.preferences.storeAppURL = {
      ios: '1493706411',
      android: 'market://details?id=com.sitebubo.app',
    };
    this.appRate.promptForRating(true);
  }

  defineInitialRoutering() {
    this.storage.get('userInfo').then(user => {
      if (user) {
        this.storage.get('planInfo').then(info => {
          console.log(info);
          if (user.new_user && info.id === 0) {
            this.router.navigate(['plans'], { replaceUrl: true });
          } else if (user.new_user) {
            this.router.navigate(['add-site'], { replaceUrl: true });
          } else {
            this.router.navigate(['domain-list'], { replaceUrl: true });
          }
        });
      } else {
        this.router.navigate(['welcome']);
      }
    });
  }

  restDomainInfo(result) {
    const domain = {
      current_domains: result.domains,
      my_domains: result.my_domains,
      invited_domains: result.invited_domains
    };

    this.storage.set('domainInfo', domain).then(() => {
      this.events.publish('domainInfo_set', domain);
    });
  }

  logOut() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.authAPI.logOut(user.id, this.tempService.deviceID, user.token).subscribe((res) => {
          console.log(res);
          if (res.RESPONSECODE === 1) {
            console.log('You are logged out.');
          }
        });
        this.fb.getLoginStatus().then((result) => {
          this.fb.logout();
        });
        this.storage.clear();
        this.router.navigate(['welcome'], { replaceUrl: true });
      }
    });
  }

  async openTermsAndConditions(params) {
    let temp: boolean;
    temp = !params;
    console.log(temp);
    const terms = await this.modalCtrl.create({
      component: TermsPage,
      componentProps : {
        newTerm: params
      },
      backdropDismiss: temp
    });
    return await terms.present();
  }

  async openPrivacyPolicy() {
    const privacy = await this.modalCtrl.create({
      component: PrivacyPage
    });
    return await privacy.present();
  }

  async openPopOver(location, pdtitle, description) {
    const popover = await this.popoverCtrl.create({
      component: PallDoneComponent,
      componentProps: {
        title: pdtitle,
        content: description
      },
      event: location,
      mode: 'ios'
    });
    await popover.present();
  }

  async showDomainModal(myDomCnt, totalDomCnt) {
    this.storage.get('userInfo').then(async user => {
      if (myDomCnt < totalDomCnt) {
        const modal = await this.modalCtrl.create({
          component: AddDomainPage
        });
        return await modal.present();
      } else {
        const action = await this.actionCtrl.create({
          header: 'You need to upgrade the current plan in order to add more domains',
          buttons: [
            {
              text: 'Upgrade',
              icon: 'happy',
              handler: () => {
                this.router.navigate(['plans']);
              }
            },
            {
              text: 'Cancel',
              icon: 'hand',
              role: 'cancel'
            }
          ],
          // cssClass: 'upgradeAlert'
        });
        await action.present();
      }
    });
  }

  async showInviteUserModal(domUserID, domName): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtrl.create({
        component: InviteUserPage,
        componentProps: {
          domainUserID: domUserID,
          domainName: domName
        },
        cssClass: 'inviteModal'
      });
      modal.onDidDismiss().then((result) => {
        console.log(result.data);
        if (result.data) {
          resolve(true);
        } else {
          reject(false);
        }
      });
      await modal.present();
    });
  }

  async openAllDone() {
    const allDone = await this.modalCtrl.create({
      component: AllDonePage
    });
    allDone.onDidDismiss().then(() => {
      // this.logOut();
      console.log('asdfasdfasdfasdf');
    });
    return await allDone.present();
  }

  updatePlanInfo(userID, token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.currentSubscription(userID, token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          this.events.publish('planInfo_set', result.data);
          resolve(true);
        } else  {
          reject(false);
        }
      }, err => {

      });
    });
  }

  async openNotifications(notificationData, type): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let cssStyle: string;
      if (type) {
        cssStyle = 'tab-notificationList';
      } else {
        cssStyle = 'dashboard-notificationList';
      }
      const modal = await this.modalCtrl.create({
        component: NotificationListPage,
        componentProps: {
          notifications: notificationData
        },
        cssClass: cssStyle
      });
      modal.onDidDismiss().then(() => {
        resolve(true);
      });
      await modal.present();
    });
  }

  getNotifications(domainName, domainUserID, userID, token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationAPI.getNotifications(domainName, domainUserID, userID, token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          this.tempService.saveNotifications(result.data).then((res) => {
            resolve(result.data);
          });
        } else {
          resolve(null);
        }
      }, err => {
        reject('error');
      });
    });
  }

  updateNotifications(domainName, userID, token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationAPI.readNotifications(domainName, userID, token).subscribe((result) => {
        console.log(result);
        if (result.RESPONSECODE === 1) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  connectGoogleAnalytics(monitorData, domainIDData, domainUserIDData, userIDData, tokenData): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtrl.create({
        component: GoogleAnalyticsPage,
        componentProps: {
          monitor: monitorData,
          domainID: domainIDData,
          domainUserID: domainUserIDData,
          userID: userIDData,
          token: tokenData
        },
        cssClass: 'googleAnalyticsModal'
      });
      modal.onDidDismiss().then((result) => {
        console.log(result.data);
        if (result.data) {
          resolve(true);
        } else {
          reject(false);
        }
      });
      await modal.present();
    });
  }

  connectServerMonitor(userID, token, key): any {
    return new Promise((resolve) => {
      this.ionService.showSpecificLoading('Please wait until it is being carried out');
      const params = this.tempService.dashboardParams;
      const keys = [
        {
          name: 'platform',
          value: key
        }
      ];
      this.monitorAPI.connectServerMonitor(userID, params.domainID, params.domainUserID, token, JSON.stringify(keys))
      .subscribe((res) => {
        this.ionService.closeLoading();
        console.log(res);
        if (res.RESPONSECODE === 1) {
          this.showSeverMonitorConnectionModal().then((result) => {
            console.log(result);
            resolve(result);
          });
        } else  {
          this.ionService.presentToast(res.RESPONSE);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Error while connecting server monitor');
      });
    });
  }

  showSeverMonitorConnectionModal(): any {
    return new Promise(async (resolve) => {
      const page = await this.modalCtrl.create({
        component: ServerMonitorPage,
        cssClass: 'googleAnalyticsModal'
      });
      page.onDidDismiss().then((res) => {
        console.log(res.data);
        resolve(res.data);
      });
      await page.present();
    });
  }

  async openMonitorIssues(reportNameData, factorNum): Promise<any> {
    return new Promise(async (resolve) => {
      let css: string;
      if (reportNameData === 'seo') {
        css = 'seo-Issues';
      } else {
        css = 'device-Issues';
      }
      const modal = await this.modalCtrl.create({
        component:  MonitorIssuesPage,
        componentProps: {
          reportName: reportNameData,
          factor: factorNum
        },
        cssClass: 'monitor-issues'
      });
      if (reportNameData === 'seo') {
        modal.onDidDismiss().then(() => {
          resolve(true);
        });
      }
      await modal.present();
    });
  }

  // getReportDetails(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.storage.get('userInfo').then((user) => {
  //       this.monitorAPI
  //       .getSeoReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, user.id, user.token)
  //       .subscribe((result) => {
  //         if (result.RESPONSECODE === 1) {
  //           resolve(result.data.report[0]);
  //         } else {
  //           reject(false);
  //         }
  //       }, err => {
  //         reject(false);
  //       });
  //     });
  //   });
  // }

  confirmDisconnect(name): Promise<boolean> {
    return new Promise(async (resolve) => {
      let result: boolean;
      const act = await this.actionCtrl.create({
        header: 'Are you sure you would like to disconnect the ' + name + ' monitor?',
        buttons: [
          {
            text: 'Yes',
            icon: 'checkmark',
            handler: () => {
              result = true;
            }
          },
          {
            text: 'No',
            icon: 'close',
            handler: () => {
              result = false;
            }
          }
        ]
      });
      act.onDidDismiss().then(() => {
        resolve(result);
      });
      await act.present();
    });
  }

  async confirmManualScanCount(key, userID, token) {
    return new Promise((resolve) => {
      const params = this.tempService.dashboardParams;
      this.ionService.showLoading();
      this.reportAPI.updateManualScanCount(params.domainID, params.domainUserID,  userID, token)
      .subscribe((result) => {
        this.ionService.closeLoading();
        console.log(result);
        if (result.RESPONSECODE === 1) {
          this.askContinueScanning(key, result.data).then((res) => {
            resolve(res);
          });
        } else {

        }
      });
    });
  }

  async askContinueScanning(key, data) {
    return new Promise(async (resolve) => {
      let header: string;
      if (key === 'speed') {
        // tslint:disable-next-line: max-line-length
        header = 'You have ' + (data.speedtotalscan) + '/' +  (data.speedtotalscan + data.speedscanfinished) + ' scans remaining this month. Would you like to scan this site?';
      } else if (key === 'seo') {
        // tslint:disable-next-line: max-line-length
        header = 'You have ' + (data.seototalscan) + '/' +  (data.seototalscan + data.seoscanfinished) + ' scans remaining this month. Would you like to scan this site?';
      } else if (key === 'security') {
        // tslint:disable-next-line: max-line-length
        header = 'You have ' + (data.securitytotalscan) + '/' +  (data.securitytotalscan + data.securityscanfinished) + ' scans remaining this month. Would you like to scan this site?';
      }
      const action = await this.actionCtrl.create({
        // tslint:disable-next-line: object-literal-shorthand
        header: header,
        buttons: [
          {
            text: 'Yes',
            icon: 'checkmark',
            handler: () => {
              resolve(true);
            }
          },
          {
            text: 'No',
            icon: 'close',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      await action.present();
    });
  }
}
