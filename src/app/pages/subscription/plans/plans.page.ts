import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Storage } from '@ionic/storage';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  newUser: boolean;
  products: any;
  plansList: any;
  subscriptionID: any;
  plat: string;
  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private subscriptionApi: SubscriptionApiService,
    private ionService: IongadgetService,
    private platform: Platform,
    private iap: InAppPurchase
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      const platforms = this.platform.platforms();
      this.plat = platforms[1];
      this.initData();
    });
  }

  ionViewWillEnter() {
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
    this.iap.restorePurchases().then((res) => {
      console.log(JSON.stringify(res));
      this.ionService.presentToast('Successfully restored.');
    });
  }
}
