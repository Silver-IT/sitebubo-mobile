import { NavController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { TransactionApiService } from 'src/app/apis/transaction/transaction-api.service';
import { GeneralService } from 'src/app/services/generalComponents/general.service';

@Component({
  selector: 'app-view-membership',
  templateUrl: './view-membership.page.html',
  styleUrls: ['./view-membership.page.scss'],
})
export class ViewMembershipPage implements OnInit {
  subscriptionID: any;
  planInfo: any;
  userID: string;
  token: string;
  freeTrial: boolean;
  transactions = [];
  displayValue = 0;
  constructor(
    private ionSerivce: IongadgetService,
    private navCtrl: NavController,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private transactionAPI: TransactionApiService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initData();
  }

  initData() {
      this.storage.get('userInfo').then((user) => {
        if (user) {
          this.userID = user.id;
          this.token = user.token;
        }
      });
      this.storage.get('planInfo').then((planInfo) => {
        console.log(planInfo);
        const temp = planInfo;
        const arr = temp.price.toString().split('.');
        temp.bigprc = arr[0];
        temp.smallprc = arr[1];
        this.planInfo = temp;
        this.subscriptionID = planInfo.id;
        this.freeTrial = planInfo.free_trial;
        this.defineDisplay();
        // this.cdr.detectChanges();
      });
  }

  getLastPaymentHistory() {
    return new Promise((resolve, reject) => {
      this.transactionAPI.getLastPaymentHistory(this.userID, this.token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          console.log(result);
        } else  {
          this.ionSerivce.presentToast(result.RESPONSE);
        }
      });
    });
  }

  getTransactionHistory() {
    this.ionSerivce.showLoading();
    return new Promise((resolve, reject) => {
      this.transactionAPI.getTransactionHistory(this.userID, this.token).subscribe(result => {
        this.ionSerivce.closeLoading();
        console.log(result);
        if (result.RESPONSECODE === 1) {
          if (result.data && result.data.length > 0) {
            this.planInfo.invoice_pdf = result.data[0].invoice_pdf;
            this.planInfo.lastpaymentAmount = result.data[0].amount;
            this.planInfo.payment_method = result.data[0].payment_method;
          }
          resolve(true);
        } else {
          this.ionSerivce.presentToast(result.RESPONSE);
          reject(false);
        }
      }, err => {
        this.ionSerivce.closeLoading();
      });
    });
  }

  defineDisplay() {
    if (this.subscriptionID === 1) {
      this.displayValue = 1;
    } else if (this.subscriptionID > 1 && this.freeTrial === true) {
      this.displayValue = 2;
    } else  {
      this.getTransactionHistory().then((result) => {
        if (result) {
          console.log(result);
          this.displayValue = 4;
        }
      });
    }
    this.ionSerivce.closeLoading();
    this.cdr.detectChanges();
  }

  back() {
    this.navCtrl.back();
  }

  toggleMenu() {
    this.ionSerivce.toggleMenu();
  }

  openFeedback() {
    this.generalService.openFeedback();
  }

}

