import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonMenu, MenuController, NavController, ActionSheetController } from '@ionic/angular';
import { IongagetService } from './../../services/ionGadgets/iongaget.service';
import { GeneralService } from './../../services/generalComponents/general.service';
import { UserService } from './../../serverAPI/user/user.service';
import { DomainService } from './../../serverAPI/domain/domain.service';
import { TempService } from './../../services/temp/temp.service';
import { MonitorService } from './../../serverAPI/monitor/monitor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('userSetting', { static: false }) userMenu: IonMenu;
  @ViewChild('monitorSetting', { static: false }) monitorMenu: IonMenu;
  @ViewChildren('group') group: HTMLElement;
  orders = [];
  loading: any;
  userID: any;
  token: any;
  domainData: any;
  domainName: any;
  domainUserID: number;
  domainID: number;
  invitedUserList = [];
  invitedErroMessage: string;
  notifications = [];
  pluginsStatus = {
    googleAnalytics: false,
    emailChecker: true,
    rankChecker: false,
    dnsChecker: false
  }
  fullReport: string;
  unreadCount: number;
  constructor(
    private storage: Storage,
    private router: Router,
    private domainAPI: DomainService,
    private ionService: IongagetService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private userAPI: UserService,
    private generalService: GeneralService,
    private actionCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef,
    private tempService: TempService,
    private monitorAPI: MonitorService
  ) { }

  ngOnInit() {
    this.initData();
  }

  ngAfterViewInit() {
    this.userMenu.ionWillOpen.subscribe(() => {
      this.getInvitedUserList();
    });
  }

  initData() {
      const params = this.tempService.dashboardParams;
      console.log(params);
      if (params) {
        this.domainName = params.domainName;
        this.domainUserID = params.domainUserID;
        this.domainID = params.domainID;
        this.storage.get('userInfo').then((user) => {
          if (user) {
            this.userID = user.id;
            this.token = user.token;
            this.getDomainDetails(this.domainName, this.domainUserID);
            this.getNotifications(this.domainName, this.domainUserID);
          } else {
            this.router.navigate(['welcome'], { replaceUrl: true });
          }
        });
      } else {
        this.router.navigate(['domain-list'], { replaceUrl: true });
      }
  }

  getDomainDetails(domainName, domainUserID) {
    // this.ionService.showLoading();
    this.domainAPI.detailedDomain(domainName, domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      // this.ionService.closeLoading();
      if(result['RESPONSECODE'] === 1) {
        result.data['seo-score']['seoscore'] = parseInt(result.data['seo-score']['seoscore']);
        this.domainData = result.data;
        this.orders = result.data['monitor-orders'];
        this.cdr.detectChanges();
        console.log(this.orders);
        // this.orderCards(result.data['monitor-orders']);
        this.fullReport = result.data['full-report']['fullreport'];
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      // this.ionService.closeLoading();
      this.ionService.presentToast('Fetching Domain Data Failed');
    });
  }

  getNotifications(domainName, domainUserID) {
    this.generalService.getNotifications(domainName, domainUserID, this.userID, this.token).then((result) => {
      console.log(result);
      if (result) {
        this.notifications = result.notifications;
        this.countUnreadCounts().then(async (count) => {
          await this.tempService.saveUnreadCount(count).then((res) => {
            this.unreadCount = count;
          })
        });
        this.cdr.detectChanges();
      } else {
        this.notifications = [];
        this.unreadCount = 0;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  countUnreadCounts(): Promise<number> {
    return new Promise((resolve, reject) => {
      let count = 0;
      this.notifications.forEach((element) => {
        if (element.view) {
          count ++;
        }
      });
      resolve(count);
    });
  }

  openNotificationModal() {
      this.generalService.openNotifications(this.notifications, 0).then((result) => {
        if (result) {
          this.generalService.updateNotifications(this.domainName, this.userID, this.token).then((result) => {
            if (result) {
              this.unreadCount = 0;
              this.cdr.detectChanges();
            }
          });
        }
      }).catch(err => {
        console.log(err);
    });
  }

  getInvitedUserList() {
    this.userAPI.listeInvitedUser(this.domainName, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.invitedUserList = result.data;
      } else {
        if (result['RESPONSE'] === 'There is no user added') {
          this.invitedUserList = [];
          this.invitedErroMessage = 'There are no users added';
        } else {
          this.ionService.presentToast(result['RESPONSE']);
        }
      }
    });
  }

  inviteUser() {
    if (this.invitedUserList.length === 5) {
      this.ionService.presentToast('Sorry. You are allowed to add only 5 members.');
      return;
    }
    this.generalService.showInviteUserModal(this.domainUserID, this.domainName).then((result) => {
      if (result) {
        this.getInvitedUserList();
        this.ionService.presentToast('Member has been invited');
      }
    });
  }

  async deleteUser(inviteID, inviteName ) {
    const action = await this.actionCtrl.create({
      header: 'Are you sure to disallow ' + inviteName + ' to view '  + this.domainName,
      buttons: [
        {
          text: 'Yes',
          icon: 'checkmark',
          handler: () => {
            this.ionService.showLoading();
            this.userAPI.deleteInviteUser(inviteID, this.userID, this.token).subscribe((result) => {
              // console.log(result);
              this.ionService.closeLoading();
              if (result['RESPONSECODE'] === 1) {
                this.getInvitedUserList();
                this.ionService.presentToast('Member successfully removed');
                this.cdr.detectChanges();                                
              } else {
                this.ionService.presentToast(result['REPONSE']);
              }
            }, err => {
              this.ionService.closeLoading();
              this.ionService.presentToast('Error occured while deleting the invited user');
            });
          }
        }, 
        {
          text: 'No',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await action.present();
  }

  resendInvitation(email) {
    this.userAPI.resendInvitationEmail(email, this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.ionService.presentToast('Resent invitation email successfully');
      } else {
        this.ionService.presentToast(result['RESPONSE'])
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  toogleUserMenu() {
    this.userMenu.toggle();
    this.closeAllMenu();
  }

  toggleMainMenu() {
    this.monitorMenu.disabled = true;
    this.menuCtrl.enable(true, 'totalMenu');
    this.ionService.toggleMenu();
  }

  toogleMonitorMenu() {
    this.monitorMenu.disabled = false;
    this.monitorMenu.toggle();
    this.menuCtrl.enable(false, 'totalMenu');
    this.closeAllMenu();
  }

  ionViewWillLeave(){
    this.monitorMenu.disabled = true;
    this.menuCtrl.enable(true, 'totalMenu');
  }

  closeAllMenu(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.monitorMenu.close();
      this.userMenu.close();
      this.menuCtrl.close('totalMenu');
      resolve(true);
    });
  }

  openFullReport() {
    console.log(this.fullReport);
    window.open(this.fullReport, '_blank');
  }

  dismissUserSetting() {
   this.userMenu.close();
  }

  dismissMonitorSetting() {
    this.monitorMenu.close();
  }

  goback() {
    this.navCtrl.back();
  }

  changeStyle(plugIn) {
    this.pluginsStatus[plugIn] = !this.pluginsStatus[plugIn];
  }

  jumpToTabs(page) {
    if (page === 'expire' || page === 'link') {
      this.router.navigate(['tabs/more'], { queryParams: {
        pageName: page
      } });
    } else {
      this.router.navigate(['tabs/' + page]);
    }
  }

  onRenderItems(event) {
    console.log(event.detail.from, event.detail.to);
    let temp1 = this.orders[event.detail.from];
    let temp2 = this.orders[event.detail.to];
    this.orders[event.detail.to] = temp1;
    this.orders[event.detail.from] = temp2;
    console.log(this.orders);
    // let draggedItem = this.orders.splice(event.detail.from,1)[0];
    // console.log(draggedItem);
    // this.orders.splice(event.detail.to,0,draggedItem);
    // this.orderCards(this.orders);
    event.detail.complete();
    this.updateCardOrders().then((result) => {
      if (result) {
        // console.log(result);
      }
    }).catch(err => {
    })
  }

  updateCardOrders() {
    return new Promise((resolve, reject) => {
      this.monitorAPI.updateMonitorOrders(JSON.stringify(this.orders), this.domainID, this.userID, this.token).subscribe((result) => {
        console.log(result);
        if (result['RESPONSECODE'] === 1) {
          resolve(true);
        } else {  
          this.ionService.presentToast(result['RESPONSE']);
          reject(false);
        }
      }, err => {
        this.ionService.presentToast('Updating Error from the server');
        reject(false);
      });
    });
  }

 updateReportInfo(event, id, username) {
    console.log(event.detail.checked);
    let email_report: number;
    if (event.detail.checked) {
      email_report = 1;
    } else {
      email_report = 0;
    }
    this.userAPI.updateInvitedUser(email_report, id, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        if (email_report) {
          this.ionService.presentToast("You have activated " + username + "'s report");
        } else {
          this.ionService.presentToast("You have deactivated " + username + "'s report");
        }
      } else {
        this.ionService.presentToast("Error occured while changing " + username + "'s report");
      }
    });
 }

 connectGoogleAnalytics() {
   if (this.pluginsStatus.googleAnalytics) {
    this.pluginsStatus.googleAnalytics = false;
    return;
   }
   this.generalService.connectGoogleAnalytics().then((result) => {
     if (result) {
       this.pluginsStatus.googleAnalytics = true;
     } 
   });
 }
}