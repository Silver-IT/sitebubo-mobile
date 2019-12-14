import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { ExDomainsPage } from './../../modals/ex-domains/ex-domains.page';
import { Storage } from '@ionic/storage';
import { SubscriptionsService } from './../../../serverAPI/subscriptions/subscriptions.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { MembershipService } from './../../../services/membership/membership.service';

@Component({
  selector: 'app-cancel-membership',
  templateUrl: './cancel-membership.page.html',
  styleUrls: ['./cancel-membership.page.scss'],
})
export class CancelMembershipPage implements OnInit {
  daysLeft: number;
  userID: number;
  token: any;
  currentPlanName: string;
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private subscriptionAPI: SubscriptionsService,
    private modalCtrl: ModalController,
    private ionService: IongagetService,
    private generalService: GeneralService,
    private router: Router,
    private actionCtrl: ActionSheetController,
    private memberService: MembershipService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.initData();
  }

  initData() {
    this.storage.get('planInfo').then((info) => {
      console.log(info);
      if (info) {
        this.daysLeft = info.days_left;
        this.currentPlanName = info.name;
      }
    });
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  goback() {
    this.navCtrl.back();
  }

  activateFreePlan(cancelData) {
    this.ionService.showLoading();
    this.subscriptionAPI.activatefreesubscription(1, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.downgradeDomains(cancelData).then((res) => {
          console.log(res);
          if (res) {
            this.generalService.updatePlanInfo(this.userID, this.token).then((temp) => {
              console.log(temp);
              if (temp) {
                this.ionService.closeLoading();
                this.router.navigate(['membership'], {replaceUrl: true});
              }
            });
          } else {
            this.ionService.closeLoading();
            this.ionService.presentToast(res['RESPONSE']);
          }
        },err => {
          this.ionService.closeLoading();
          this.ionService.presentToast('Error occured while downgrading data');
        });
      } else {
        this.ionService.closeLoading();
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem while activating free plan');
    });
  }

  deleteAccount() {
    this.memberService.deleteAccount();
  }


  async checkExDomainList() {
    const exDomain = await this.modalCtrl.create({
      component: ExDomainsPage,
      componentProps: {
        selectedPlan: 'Starter',
        currentPlan: this.currentPlanName,
        allowedCnt: 1,
        reason: true
      },
    });
    exDomain.onDidDismiss().then((result) => {
      if (result.role === 'success') {
        console.log(result.data);
        this.activateFreePlan(result.data);
      }
    });
    return await exDomain.present();
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

}
