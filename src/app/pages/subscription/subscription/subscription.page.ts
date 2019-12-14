import { Component, OnInit } from '@angular/core';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { SubscriptionsService } from './../../../serverAPI/subscriptions/subscriptions.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  loading: any;
  newUser: boolean;
  products: any;
  plansList: any;
  subscriptionID: any;
  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iap: InAppPurchase,
    private navCtrl: NavController,
    private subscriptionApi: SubscriptionsService,
    private ionService: IongagetService,
    private loadingCtrl: LoadingController
  ) {
    // this.getProductsFromIAP();
  }

  ngOnInit() {
    this.initData();
  }

  ionViewWillEnter(){
    this.storage.get('userInfo').then((user) => {
      this.newUser = user.new_user;
      this.activatedRoute.queryParams.subscribe((params) => {
        if (params.newUser !== undefined) {
          this.newUser = params.newUser;
        }
      });
    });
    this.storage.get('planInfo').then((info) => {
      if (info.id !== undefined) {
        this.subscriptionID = info.id;
      }
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        console.log(user.new_user); 
        this.getSubscriptions(user.id, user.token);
      } else {
        this.router.navigate(['welcome'], { replaceUrl: true });
      }
    });
    
  }

  getProductsFromIAP() {
    this.iap.getProducts(['P2', 'P3', 'P4']).then((products) => {
      // this.products = products;
      // alert(JSON.stringify(products));
    }).catch((error) => {
      this.ionService.showAlert('Error From InAppPurchase', 'Couldnot get products from InAppPurchase');
    });
  }

  async getSubscriptions(userID, token) {
      this.ionService.showLoading();
      await this.subscriptionApi.getSubscriptionPlan(userID, token).subscribe(async (plans) => {
        this.ionService.closeLoading();
        if (plans.RESPONSECODE === 1) {
          console.log(plans);
          this.plansList = plans.data.reverse();
        } else {
          this.ionService.showAlert('Error while fetching Plans', 'Something might be wrong from the api');
        }
      }, err => {
        console.log(err);
        this.ionService.closeLoading();
        this.ionService.showAlert('Connection Error to the Server', 'Couldnot fetch the plans');
      });
  }

  goback() {
    this.navCtrl.back();
  }

  selectPlan(id, name, price ) {
    this.router.navigate(['detailed-plan'], { queryParams: { planID: id, planName: name, planPrice: price } });
  }

  restore() {
    // this.iap.restorePurchases().then(purchases => {
      // this.previousPurchases = purchases;
      // Unlock the features of the purchases!
    // });
  }

}
