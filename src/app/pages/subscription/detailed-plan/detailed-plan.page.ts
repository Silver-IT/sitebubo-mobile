import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IongadgetService } from './../../../services/ionGadgets/iongadget.service';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { ExDomainsPage } from './../../modals/ex-domains/ex-domains.page';
import { PaypalService } from './../../../services/paypal/paypal.service';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  productId: string;
  oldPlan: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private ionService: IongadgetService,
    private generalSerivce: GeneralService,
    private subscriptionAPI: SubscriptionApiService,
    private navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private paypal: PaypalService,
    private iap: InAppPurchase
  ) {
  }

  ngOnInit() {
    this.storage.get('planInfo').then((info) => {
      this.oldPlan = info.name + 'Plan';
    });
    this.definePlatform().then((res) => {
      if (res) {
        this.getPlanID();
      }
    });
  }

  definePlatform(): Promise<boolean> {
    return new Promise((resolve) => {
      this.platform.ready().then(() => {
        const plat = this.platform.platforms();
        this.plat = plat[1];
        resolve(true);
      });
    });
  }

  getPlanID() {
    this.activatedRoute.queryParams.subscribe((result) => {
      if (result) {
        this.planID = result.planID;
        this.planName = result.planName;
        this.planPrice = result.planPrice;
        if (this.plat === 'ios') {
          this.defineIosProduct();
        }
        this.initData();
      }
    }, err => {
      this.ionService.showAlert('Error Loading Page', 'No Plan is selected');
    });
  }

  defineIosProduct() {
    const planID = parseInt(this.planID, 10);
    if (planID === 1) {

    } else if (planID === 2) {
      this.productId = 'P2';
    } else if (planID === 3) {
      this.productId = 'P3';
    } else if (planID === 4) {
      this.productId = 'P4';
    }
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
        if (parseInt(this.planID, 10) !== info.id) {
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
          this.details = result.data.details;
          this.firstPay = result.data.need_to_pay;
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
    console.log(this.currentPlanID);
    if (this.isNewUser && parseInt(this.planID, 10) === 1) {
      this.gotoFreePlan().then((res) => {
        if (res) {
          this.router.navigate(['subscription-welcome'],  { queryParams: {
            isNewUser: this.isNewUser,
            planID: 1
          }});
        }
      });
    } else if (parseInt(this.planID, 10) < this.currentPlanID) {
      this.checkExDomainList();
    } else {
      if (this.plat === 'ios') {
        this.gotoInappPurchase();
      } else {
        this.gotoPaypal();
      }
    }
  }

  gotoFreePlan() {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.activatefreesubscription( this.planID, this.userID, this.token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(result.RESPONSE);
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
    });
    exDomain.onDidDismiss().then((result) => {
      if (result.role === 'success') {
        if (this.plat === 'ios') {
          this.gotoInappPurchase(result.data);
        } else {
          this.gotoPaypal(result.data);
        }
      }
    });
    return await exDomain.present();
  }

  async gotoInappPurchase(downgradeData = null) {
    if (parseInt(this.planID, 10) === 1) {
      this.ionService.showLoading();
      this.gotoFreePlan().then((result) => {
        this.ionService.closeLoading();
        if (result) {
          this.downgradeDomains(downgradeData).then(res => {
            this.router.navigate(['subscription-welcome'],  { queryParams: {
              isNewUser: this.isNewUser,
              platform: 'ios',
              status: 'downgrade',
              oldPlan: this.oldPlan
            }});
          });
        }
       }).catch((err) => {
         this.ionService.closeLoading();
       });
    } else {
      await this.iap.getProducts(['P2', 'P3', 'P4']);
      this.iap.subscribe(this.productId).then(data => {
       if (data) {
         this.ionService.showLoading();
         this.subscriptionAPI.activateSubscriptionIos
         (parseInt(this.planID, 10), data.transactionId, data.productType, this.userID, this.token)
         .subscribe((result) => {
            this.ionService.closeLoading();
            if (result.RESPONSECODE === 1) {
              if (downgradeData !== null) {
                this.downgradeDomains(downgradeData).then(res => {
                  if (res) {
                    const params: NavigationExtras = {
                      queryParams: {
                        isNewUser: this.isNewUser,
                        platform: 'ios',
                        status: 'downgrade',
                        oldPlan: this.oldPlan
                      }
                    };
                    this.router.navigate(['subscription-welcome'], params);
                  } else {
                    this.ionService.presentToast('Downgrading plan failed. Please try again later.');
                  }
                }, err => {
                  this.ionService.closeLoading();
                  this.ionService.presentToast('Downgrading plan failed due to server.');
                });
              } else {
                const params: NavigationExtras = {
                  queryParams: {
                    isNewUser: this.isNewUser,
                    platform: 'ios',
                    status: 'upgrade',
                    oldPlan: this.oldPlan
                  }
                };
                this.router.navigate(['subscription-welcome'], params);
              }
            } else {
              this.ionService.closeLoading();
              this.ionService.presentToast('Plan activation failed. Please try again later');
            }
         }, err => {
           this.ionService.closeLoading();
           this.ionService.presentToast('Plan activation failed due to server.');
         });
       }
      }).catch(err => {
        this.ionService.presentToast('Payment via In app purchase failed. Try again later.');
      });
    }
  }

  gotoPaypal(downgradeData = null) {
    if (parseInt(this.planID, 10) === 1) {
      this.ionService.showLoading();
      this.gotoFreePlan().then((result) => {
        this.ionService.closeLoading();
        if (result) {
          this.downgradeDomains(downgradeData).then(res => {
            this.router.navigate(['subscription-welcome'],  { queryParams: {
              isNewUser: this.isNewUser,
              oldPlan: this.oldPlan,
              platform: 'android',
              status: 'downgrade'
            }});
          });
        }
       }).catch((err) => {
         this.ionService.closeLoading();
       });
    } else {
      this.paypal.payNow(this.userID, parseInt(this.planID, 10), this.token, this.freeTrial).then((result) => {
        this.ionService.closeLoading();
        if (result === 'success') {
          if (downgradeData !== null) {
            this.downgradeDomains(downgradeData).then(res => {
              if (res) {
                const params: NavigationExtras = {
                  queryParams: {
                    isNewUser: this.isNewUser,
                    platform: 'android',
                    status: 'downgrade',
                    oldPlan: this.oldPlan
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
                platform: 'android',
                status: 'upgrade',
                oldPlan: this.oldPlan
              }
            };
            this.router.navigate(['subscription-welcome'], params);
          }
        } else if (result === 'pending') {
          let message = 'Already you have one subscriptions is pending.';
          message += 'So please wait untill status need to update. Then we can change the subscription';
          this.ionService.presentToast(message);
        } else if (result === 'free-trial-failed') {
          const message = 'You are not able to use free trial. There will be something wrong. Please contact support.';
          this.ionService.presentToast(message);
        } else if (result === 'cancelled') {
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
        if (result.RESPONSECODE === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(result.RESPONSE);
          reject(false);
        }
      }, err => {
          this.ionService.closeLoading();
          this.ionService.presentToast('Somthing might be wrong');
          reject(false);
        });
    });
  }

  goback() {
    this.navCtrl.back();
  }
}
