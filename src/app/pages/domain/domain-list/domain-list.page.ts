import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { DomainApiService } from 'src/app/apis/domain/domain-api.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.page.html',
  styleUrls: ['./domain-list.page.scss'],
})
export class DomainListPage implements OnInit {
  title: any;
  token: any;
  userID: any;
  domainCounts: any;
  domains = [];
  allDomList = [];
  myDomList = [];
  invitedDomList = [];
  filterType = 0;
  showContent: boolean;
  noResult = 'hidden';
  orders = [];
  press = {
    duration: 0,
    started: false
  };
  constructor(
    private storage: Storage,
    private domainAPI: DomainApiService,
    private ionService: IongadgetService,
    private actionCtrl: ActionSheetController,
    private generalService: GeneralService,
    private router: Router,
    private tempService: TempService,
    private cdr: ChangeDetectorRef,
    private admobservice: AdmobService
  ) {

  }

  async ionViewWillEnter() {
    this.storage.get('planInfo').then((info) => {
      if (info.id  === 1) {
        this.admobservice.showAdmobBanner().then(async (result) => {
        });
        this.initData();
      } else {
        this.initData();
      }
    });
  }

  ionViewWillLeave() {
    this.admobservice.removeBanner();
  }

  ngOnInit() {
  }

  async initData() {
    await this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
      this.showContent = false;
      this.getDomainList();
    });
  }

  getDomainList() {
    this.ionService.showLoading();
    this.myDomList = [];
    this.invitedDomList = [];
    this.allDomList = [];
    this.domainAPI.getDomainList(this.userID, this.token).subscribe((result) => {
      this.showContent = true;
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        console.log(result.data);
        this.allDomList = result.data;
        this.domainCounts = result.domains;
        this.generalService.restDomainInfo(result.domains);
        if (result.data) {
          this.allDomList.forEach(element => {
            if (element.user_id === this.userID) {
              element.type = 'mine';
              this.myDomList.push(element);
            } else if (element.user_id !== this.userID) {
              element.type = 'invited';
              this.invitedDomList.push(element);
            }
          });
        }
        this.defineShow();

      } else {
          this.ionService.presentToast('Something went wrong with Server');
          this.filterType = 1;
          this.domains = [];
      }
    }, err => {
      this.ionService.closeLoading();
      this.showContent = true;
      this.ionService.presentToast('Connection Error from Server');
    });
  }

  defineShow() {
    const temp = this.tempService.filterType;
    if (temp !== 0) {
      if (temp === 1) {
        this.filterType = 1;
        this.domains = this.allDomList;
        this.title = 'All Sites (' + this.domainCounts.domains + ')';
      } else if (temp === 2) {
        this.filterType = 2;
        this.domains = this.myDomList;
        this.title = 'My Sites (' + this.domainCounts.my_domains + '/' + this.domainCounts.total_domains + ')';
      } else {
        this.filterType = 3;
        this.domains = this.invitedDomList;
        this.title = 'Invited Sites (' + this.domainCounts.invited_domains + ')';
      }
    } else {
      if (this.myDomList.length > 0) {
        this.filterType = 2;
        this.domains = this.myDomList;
        this.title = 'My Sites (' + this.domainCounts.my_domains + '/' + this.domainCounts.total_domains + ')';
      } else if (this.invitedDomList.length > 0) {
        this.filterType = 3;
        this.domains = this.invitedDomList;
        this.title = 'Invited Sites (' + this.domainCounts.invited_domains + ')';
      } else {
        this.filterType = 1;
        this.domains = this.allDomList;
        this.title = 'All Sites (' + this.domainCounts.domains + ')';
      }
    }
  }

  async filterSites() {
    const action = await this.actionCtrl.create({
      header: 'Filter options',
      buttons: [
        {
          text: 'All Sites (' + this.domainCounts.domains + ')',
          handler: () => {
            this.filterType = 1;
            this.domains = this.allDomList;
            this.title = 'All Sites (' + this.domainCounts.domains + ')';
          },
        },
        {
          text: 'My Sites (' + this.domainCounts.my_domains + ')',
          handler: () => {
            this.filterType = 2;
            this.domains = this.myDomList;
            this.title = 'My Sites (' + this.domainCounts.my_domains + '/' + this.domainCounts.total_domains + ')';
          },
        },
        {
          text: 'Invited Sites (' + this.domainCounts.invited_domains + ')',
          handler: () => {
            this.filterType = 3;
            this.domains = this.invitedDomList;
            this.title = 'Invited Sites (' + this.domainCounts.invited_domains + ')';
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ],
    });
    await action.present();
  }

  addDomain(myDomCnt, totalDomCnt) {
    this.generalService.showDomainModal(myDomCnt, totalDomCnt);
  }

  openDomain(domainId, domName, domUserID, possession, scannedBoolean) {
    if (scannedBoolean) {
      const params = {
        domainID: domainId,
        domainName: domName,
        domainUserID: domUserID,
        type: possession
      };
      this.tempService.saveDashboradParams(params, this.filterType).then(() => {
        this.router.navigate(['dashboard']);
      });
    } else {
      const message = domName + ' is not scanned yet.';
      this.ionService.presentToast(message);
    }
  }

  deleteDomain(domainName) {
    this.ionService.showLoading();
    this.domainAPI.deleteDomain(domainName, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        const message = 'The domain ' + domainName + ' has been removed';
        this.ionService.presentToast(message);
        this.getDomainList();
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openFeedback() {
    this.generalService.openFeedback();
  }

  onRenderItems(event) {
    const item1 = this.domains[event.detail.from];
    const item2 = this.domains[event.detail.to];
    const indexStart = this.allDomList.indexOf(item1);
    const indexLast = this.allDomList.indexOf(item2);
    const temp1 = this.allDomList[indexStart];
    const temp2 = this.allDomList[indexLast];
    this.allDomList[indexStart] = temp2;
    this.allDomList[indexLast] = temp1;
    event.detail.complete();
    this.reorderDomains().then(() => {
       if (this.domains.length > 1) {
         this.saveDomainsOrder().then(() => {
           this.cdr.detectChanges();
         }).catch(err => {
           this.ionService.presentToast('Error occured while reordering');
         });
       }
    });
  }

  reorderDomains(): Promise<any> {
    return new Promise((resolve, reject) => {
      const mytemp = [];
      const invitedtemp = [];
      this.allDomList.forEach((element) => {
        if (element.user_id === this.userID) {
          mytemp.push(element);
        } else {
          invitedtemp.push(element);
        }
      });
      this.myDomList = mytemp;
      this.invitedDomList = invitedtemp;
      if (this.filterType === 1) {
        this.domains = this.allDomList;
      } else if (this.filterType === 2) {
        this.domains = this.myDomList;
      } else {
        this.domains = this.invitedDomList;
      }
      resolve(true);
    });
  }

  saveDomainsOrder(): Promise<any> {
    return new Promise((resolve, reject) => {
      const temp = [];
      this.allDomList.forEach((element) => {
        temp.push({id: element.id});
      });
      this.domainAPI.reorderDomains(JSON.stringify(temp), this.userID, this.token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
