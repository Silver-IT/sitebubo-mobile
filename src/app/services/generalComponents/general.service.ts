import { SubscriptionsService } from './../../serverAPI/subscriptions/subscriptions.service';
import { ModalController, PopoverController, AlertController, Events, ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { FeedbackPage } from './../../pages/modals/feedback/feedback.page';
import { PrivacyPage } from 'src/app/pages/modals/privacy/privacy.page';
import { AddDomainPage } from 'src/app/pages/modals/add-domain/add-domain.page';
import { ForgotpasswordPage } from 'src/app/pages/modals/forgotpassword/forgotpassword.page';
import { MyprofilePage } from 'src/app/pages/modals/userManagement/myprofile/myprofile.page';
import { InviteUserPage } from './../../pages/modals/invite-user/invite-user.page';
import { TermsPage } from './../../pages/modals/terms/terms.page';
import { GoogleAnalyticsPage } from 'src/app/pages/modals/plugins/google-analytics/google-analytics.page';

import { AllDoneComponent } from './../../components/popover/all-done/all-done.component';

import { Facebook } from '@ionic-native/facebook/ngx';
import { AllDonePage } from './../../pages/modals/all-done/all-done.page';
import { NotificationListPage } from './../../pages/modals/notification-list/notification-list.page';
import { MonitorService } from './../../serverAPI/monitor/monitor.service';
import { NotificationService } from './../../serverAPI/notification/notification.service';
import { TempService } from '../temp/temp.service';
import { MonitorIssuesPage } from './../../pages/modals/monitor-issues/monitor-issues.page';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private appRate: AppRate,
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private events: Events,
    private subscriptionAPI: SubscriptionsService,
    private actionCtrl: ActionSheetController,
    private notificationAPI: NotificationService,
    private tempService: TempService,
    private monitorAPI: MonitorService
  ) { }

  async openMyProfile() {
    const myProfile = await this.modalCtrl.create({
      component: MyprofilePage
    });
    return await myProfile.present();
  }

  defineInitialRoutering() {
    this.storage.get('userInfo').then(user => {
      if (user) {
        this.storage.get('planInfo').then(info => {
          console.log(user.new_user, info.id);
          if (user.new_user && info.id == 0) {
            this.router.navigate(['subscription'], { replaceUrl: true });
          } else if (user.new_user) {
            this.router.navigate(['add-site']);
          } else {
            this.router.navigate(['domain-list']);
            // this.router.navigate(['subscription-welcome']);
          }
        });
      } else {
        this.router.navigate(['welcome']);
      }
    });
  }

  restDomainInfo(result) {
    let domain = {
      current_domains: result.domains,
      my_domains: result.my_domains,
      invited_domains: result.invited_domains 
    }

    this.storage.set('domainInfo', domain).then(() => {
      this.events.publish('domainInfo_set', domain);
    })
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
      ios: '1436677538',
      android: 'market://details?id=com.nasir.healthApp',
    };
    this.appRate.promptForRating(true);
  }

  logOut() {
    this.tempService.filterType = 0;
    this.storage.clear();
    this.router.navigate(['welcome'], { replaceUrl: true });
    this.fb.logout().then( res => {
    }).catch(e => {
      console.log('Error logout from Facebook', e);
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
      component: AllDoneComponent,
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
                this.router.navigate(['subscription']);
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

  async showInviteUserModal(domainUserID, domainName): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtrl.create({
        component: InviteUserPage,
        componentProps: {
          domainUserID: domainUserID,
          domainName: domainName
        },
        cssClass: 'inviteModal'
      });
      modal.onDidDismiss().then((result) => {
        console.log(result.data);
        if (result.data) {
          resolve(true);
        } else {
          reject(false)
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
    })
    return await allDone.present();
  }

  updatePlanInfo(userID, token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.currentSubscription(userID, token).subscribe((result) => {
        if (result['RESPONSECODE'] === 1) {
          this.events.publish('planInfo_set', result.data);
          resolve(true);
        } else  {
          reject(false); 
        }
      }, err => {

      })
    });
  }

  async openNotifications(notifications, type): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let cssStyle: string;
      if (type) {
        cssStyle = 'tab-notificationList'
      } else {
        cssStyle = 'dashboard-notificationList'
      }
      const modal = await this.modalCtrl.create({
        component: NotificationListPage,
        componentProps: {
          notifications: notifications
        },
        cssClass: cssStyle
      });
      modal.onDidDismiss().then(() => {
        resolve(true);
      });
      await modal.present();
    })
  }
  
  getNotifications(domainName, domainUserID, userID, token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationAPI.getNotifications(domainName, domainUserID, userID, token).subscribe((result) => {
        if (result['RESPONSECODE'] === 1) {
          this.tempService.saveNotifications(result.data).then((res) => {
            resolve(result.data);
          })
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
        if (result['RESPONSECODE'] === 1) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  connectGoogleAnalytics(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtrl.create({
        component: GoogleAnalyticsPage,
        cssClass: 'googleAnalyticsModal'
      });
      modal.onDidDismiss().then((result) => {
        if (result.data) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      await modal.present();
    });
  }

  async openMonitorIssues(reportName, factorNum): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let css: string;
      if (reportName === 'seo') {
        css = 'seo-Issues'
      } else {
        css = 'device-Issues'
      }
      const modal = await this.modalCtrl.create({
        component:  MonitorIssuesPage,
        componentProps: {
          reportName: reportName,
          factor: factorNum
        },
        cssClass: 'monitor-issues'
      });
      if (reportName === 'seo') {
        modal.onDidDismiss().then(() => {
          resolve(true);
        })
      }
      await modal.present();
    });
  }

  getReportDetails(): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get('userInfo').then((user) => {
        this.monitorAPI.getSeoReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, user.id, user.token)
        .subscribe((result) => {
          if (result['RESPONSECODE'] === 1) {
            resolve(result.data.report[0]);
          } else {
            reject(false);
          }
        }, err => {
          reject(false);
        })
      });
    });
  }
}
