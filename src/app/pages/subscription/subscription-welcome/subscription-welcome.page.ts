import { Events, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { SubscriptionsService } from './../../../serverAPI/subscriptions/subscriptions.service';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TransactionService } from './../../../serverAPI/transaction/transaction.service';


@Component({
  selector: 'app-subscription-welcome',
  templateUrl: './subscription-welcome.page.html',
  styleUrls: ['./subscription-welcome.page.scss'],
})
export class SubscriptionWelcomePage implements OnInit {
  newUser = false;
  subscriptionID: number;
  isFreeTrial: boolean;
  firstPay: boolean;
  displayValue: number;
  details: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private ionService: IongagetService,
    private subscriptionAPI: SubscriptionsService,
    private events: Events,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private generalService: GeneralService,
    private transactionAPI: TransactionService
  ) { }

  ngOnInit() {
   
  }

  ionViewWillEnter() {
   this.initialize();
   this.getPlanInfo();
  }

  initialize() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params) {
        if (params.isNewUser !== undefined) {
          this.newUser = JSON.parse(params.isNewUser);
        }
        this.subscriptionID = parseInt(params.planID);
        if (params.isFreeTrial !== undefined) {
          this.isFreeTrial = JSON.parse(params.isFreeTrial);
        }
      }
    });
  }

  getTransactionHistory(userID, token) {
    let temp = []; let count = 0;
    this.ionService.showLoading();
    return new Promise((resolve, reject) => {
      this.transactionAPI.getTransactionHistory(userID, token).subscribe(result => {
        this.ionService.closeLoading();
        console.log(result);
        if (result['RESPONSECODE'] === 1) {
          if (result.data && result.data.length > 0) {
            this.details['invoice_pdf'] = result.data[0].invoice_pdf;
            this.details['lastpaymentAmount'] = result.data[0].amount;
            temp = result.data;
            temp.forEach((history) => {
               if (history['free_trial_transaction']) {
                 count ++;
               }   
            });
          } 
          resolve(count);
        } else {
          reject(null);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Error happened from server');
      })
    });

  }

  defineDisplay(): any {
    return new Promise((resolve, reject) => {
      let temp: number;
      if (this.newUser && this.subscriptionID === 1) {
        temp = 1; // new free
        console.log('free');
      } else if  (!this.newUser && this.subscriptionID === 1) {
        temp = 2; // old free
        console.log('old');
      } else if (this.subscriptionID > 1 && this.isFreeTrial) {
        temp = 4; // free trial
        console.log('trial');
      } else if ( this.firstPay && this.subscriptionID > 1)  {
        temp =  3; // first pay
        console.log('pay');
      } else {
        temp = 5; // no trial
        console.log('no');
      }
      resolve(temp);
    });
  }

  async getPlanInfo() {
    this.storage.get('userInfo').then((user) => {
      this.subscriptionAPI.currentSubscription(user.id, user.token).subscribe((result) => {
        console.log(result.data);
        if (result['RESPONSECODE'] === 1) {
          this.storage.set('planInfo', result.data).then(() => {
            this.events.publish('planInfo_set', result.data);
            let temp = result.data;
            const arr = temp.price.toString().split('.');
            temp.bigprc = arr[0];
            temp.smallprc = arr[1];
            this.details = temp;
            this.getTransactionHistory(user.id, user.token).then((result) => {
              if (result === 1) {
                this.firstPay = true;
              } else {
                this.firstPay = false;
              }
              this.defineDisplay().then((result) => {
                this.displayValue = result;
                this.cdr.detectChanges();
              });
            });
          });     
        } else {
          this.ionService.showAlert('Error from Server', result['RESPONSE']);
        }
      }, err => {
        this.ionService.showAlert('Error from Server', 'Unable to call Server API');
      });
    });
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openFeedback() {
    this.generalService.openFeedback();
  }

}
