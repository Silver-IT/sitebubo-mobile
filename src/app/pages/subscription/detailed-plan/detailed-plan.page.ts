import { Component, OnInit } from '@angular/core';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController, NavController, Events, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { SubscriptionsService } from './../../../serverAPI/subscriptions/subscriptions.service';
import { ExDomainsPage } from './../../modals/ex-domains/ex-domains.page';
import { PaypalService } from './../../../services/paypal/paypal.service';
import { TransactionService } from './../../../serverAPI/transaction/transaction.service';

@Component({
  selector: 'app-detailed-plan',
  templateUrl: './detailed-plan.page.html',
  styleUrls: ['./detailed-plan.page.scss'],
})
export class DetailedPlanPage implements OnInit {
  loading: any;
  details: any;
  planID: any;
  planName: any;
  planPrice: any;
  userID: any;
  token: string;
  isNewUser: boolean;
  freeTrial: boolean;
  daysLeft: number;
  plat: string;
  currentPlanName: string;
  currentPlanID: any;
  showbtn = false;
  firstPay: boolean;
  constructor(
    private iap: InAppPurchase,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private ionService: IongagetService,
    private generalSerivce: GeneralService,
    private subscriptionAPI: SubscriptionsService,
    private navCtrl: NavController,
    private events: Events,
    private platform: Platform,
    private modalCtrl: ModalController,
    private paypal: PaypalService,
    private transactionAPI: TransactionService
  ) {
  }

  ngOnInit() {
    this.getPlanID();
    this.definePlatform();
  }

  definePlatform() {
    this.platform.ready().then(() => {
      const plat = this.platform.platforms();
      this.plat = plat[2];
    });
  }

  getPlanID() { 
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log(result);
      if (result) {
        this.planID = result.planID;
        this.planName = result.planName;
        this.planPrice = result.planPrice;
        this.initData();
      }
    }, err => {
      this.ionService.showAlert('Error Loading Page', 'No Plan is selected');
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getDetailedPlanInfo(this.planID, this.userID, this.token);
      } else {
        this.router.navigate(['welcome']);
      }
    });
  }

  getCurrentSubscription() {
    this.storage.get('userInfo').then((user) => {
      this.isNewUser = user.new_user;
      this.storage.get('planInfo').then((info) => {
        if (!this.firstPay) {
          if (info.free_trial) {
            this.freeTrial = false;
          } else {
            this.freeTrial = true;
          }
        } else {
          this.freeTrial = false;
        }
        this.daysLeft = info.daysleft;
        this.currentPlanName = info.name;
        this.currentPlanID = info.id;
        if (parseInt(this.planID) !== info.id) {
          this.showbtn = true;
        }
      });
    });
  }

  getDetailedPlanInfo(subscriptionID, userID, token) {
      this.ionService.showLoading();
      this.subscriptionAPI.getSubscriptionPlanDetails(subscriptionID, userID, token).subscribe((result) => {
        console.log(result);
        if (result.RESPONSECODE === 1) {
          this.ionService.closeLoading();
          this.details = result.data['details'];
          this.firstPay = result.data['need_to_pay'];
          this.getCurrentSubscription();
          console.log(result.data);
        } else {
          console.log(result.RESPONSE);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.showAlert('Connection Error with Server', 'Perhaps the it has lost connection with the server');
      });
  }

  async showPopup(event, spTitle, description) {
    await this.generalSerivce.openPopOver(event, spTitle, description);
  }

  continuePlan() {
    if (parseInt(this.planID) < this.currentPlanID) {
      this.checkExDomainList();
    } else {
      this.gotoPaypal();
    }
  }

  gotoFreePlan() {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.activatefreesubscription( this.planID, this.userID, this.token).subscribe((result) => {
        if (result['RESPONSECODE'] === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(result['RESPONSE']);
          reject(false);
        }
      }, err => {
        this.ionService.presentToast('Starter plan activation failed');
      });
    });
  }

  async checkExDomainList() {
    const exDomain = await this.modalCtrl.create({
      component: ExDomainsPage,
      componentProps: {
        selectedPlan: this.planName,
        currentPlan: this.currentPlanName,
        allowedCnt: this.details.noofdomain,
        reason: false
      },
      // backdropDismiss: false
    });
    exDomain.onDidDismiss().then((result) => {
      // console.log(result);
      // return;
      if (result.role === 'success') {
        this.gotoPaypal(result.data);
      }
    });
    return await exDomain.present();
  }


  gotoPaypal(downgradeData = null) {
    if(parseInt(this.planID) === 1) {
      this.ionService.showLoading();
      this.gotoFreePlan().then((result) => {
        this.ionService.closeLoading();
        if (result) {
          this.downgradeDomains(downgradeData).then(result => {
            this.router.navigate(['subscription-welcome'],  { queryParams: {
              isNewUser: this.isNewUser,
              planID: 1,
            }});
          });
        }
       }).catch((err) => {
         this.ionService.closeLoading();
       });
    } else {
      this.paypal.payNow(this.userID, parseInt(this.planID), this.token, this.freeTrial).then((result) => {
        if (result === 'success') {
          // alert(JSON.stringify(downgradeData));
          if(downgradeData !== null) {
            this.downgradeDomains(downgradeData).then(result => {
              this.ionService.closeLoading();
              if (result) {
                const params: NavigationExtras = {
                  queryParams: {
                    isNewUser: this.isNewUser,
                    planID: parseInt(this.planID),
                    isFreeTrial: this.freeTrial,
                    firstPay: this.firstPay
                  }
                };
                this.router.navigate(['subscription-welcome'], params);
              }
            }).catch((err) => {
              this.ionService.closeLoading();
              this.ionService.presentToast('Downgrading failed due to server api');
            });
          } else {
            const params: NavigationExtras = {
              queryParams: {
                isNewUser: this.isNewUser,
                planID: parseInt(this.planID),
                isFreeTrial: this.freeTrial,
                firstPay: this.firstPay
              }
            };
            this.router.navigate(['subscription-welcome'], params);
          }
          
        } else if (result === 'pending') {
          const message = 'Already you have one subscriptions is pending. So please wait untill status need to update. Then we can change the subscription';
          this.ionService.presentToast(message);
        } else if (result === 'free-trial-failed') {
          const message = 'You are not able to use free trial. There will be something wrong. Please contact support.';
          this.ionService.presentToast(message);
        }
         else if (result === 'cancelled') {
          this.ionService.presentToast('Subscription Activation Failed. Please try again');
        } else {
          const message = 'Payment Connection Failed. Please try again';
          this.ionService.presentToast(message);
        }
      }).catch((err) => {
        this.ionService.presentToast('Subscription Activation Failed. Please try again');
      });
    }
  }


  downgradeDomains(downgradeData) {
    this.ionService.showLoading();
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.downgradePlan(downgradeData.domains, this.userID, this.token, downgradeData.feedback).subscribe((result) => {
        this.ionService.closeLoading();  
        console.log(result);
          if (result['RESPONSECODE'] === 1) {
            resolve(true);
          } else {
            this.ionService.presentToast(result['RESPONSE']);  
            reject(false);
          }
        }, err => {
          this.ionService.closeLoading();  
          this.ionService.presentToast('Somthing might be wrong');
          reject(false);
        });
    });
  }
  // payment on iphones
  gotoInAppPurchase() {

  }

  goback() {
    this.navCtrl.back();
  }
}
