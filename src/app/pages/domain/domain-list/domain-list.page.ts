import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { ActionSheetController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { DomainService } from './../../../serverAPI/domain/domain.service';
import { TempService } from './../../../services/temp/temp.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.page.html',
  styleUrls: ['./domain-list.page.scss'],
})
export class DomainListPage implements OnInit {
  @ViewChild('group', { static: false }) group: HTMLElement;
  @ViewChildren('reorder') reorders;
  @ViewChildren('cards') cards;
  title: any;
  token: any;
  userID: any;
  domainCounts: any;
  domains = [];
  loading: any;
  allDomList = [];
  myDomList = [];
  invitedDomList = [];
  filterType = 0;
  showContent: boolean;
  noResult = 'hidden';
  pressInterval = 0;
  reorderable = false;
  targetElement: HTMLElement;
  reorderElement: HTMLElement;
  orders = [];
  press = {
    duration: 0,
    started: false
  }
  constructor(
    private storage: Storage,
    private domainAPI: DomainService,
    private ionService: IongagetService,
    private actionCtrl: ActionSheetController,
    private generalService: GeneralService,
    private ga: GoogleAnalytics,
    private events: Events,
    private router: Router,
    private tempService: TempService,
    private cdr: ChangeDetectorRef,
    private monitorAPI: MonitorService
  ) {

  }

  async ionViewWillEnter() {
    this.showContent = false;
    await this.initData().then(async () => {
      await this.getDomainList();
    });
  }

  ngOnInit() {
    
  }

  async initData() {
    await this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
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
      console.log('Domain List: ', result);
      if (result['RESPONSECODE'] === 1) {
        this.allDomList = result.data;
        console.log(result.data);
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
            console.log(this.domains);
            this.title = 'All Sites (' + this.domainCounts.domains + ')';
          },
        },
        {
          text: 'My Sites (' + this.domainCounts.my_domains + ')',
          handler: () => {
            this.filterType = 2;
            this.domains = this.myDomList;
            console.log(this.domains);
            this.title = 'My Sites (' + this.domainCounts.my_domains + '/' + this.domainCounts.total_domains + ')';
          },
        },
        {
          text: 'Invited Sites (' + this.domainCounts.invited_domains + ')',
          handler: () => {
            this.filterType = 3;
            this.domains = this.invitedDomList;
            console.log(this.domains);
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
    // this.generalService.showDomainModal();
  }

  openDomain(domain_id, domain_name, domain_userID, type) {
    let params = {
      domainID: domain_id,
      domainName: domain_name,
      domainUserID: domain_userID,
      type: type
    };
    this.tempService.saveDashboradParams(params, this.filterType).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  deleteDomain(domainName) {
    this.ionService.showLoading();
    this.domainAPI.deleteDomain(domainName, this.userID, this.token).subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      if (result['RESPONSECODE'] === 1) {
        this.getDomainList();
      } else {
        this.ionService.presentToast(result['RESPONSE']);
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
     console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let item1 = this.domains[event.detail.from];
    let item2 = this.domains[event.detail.to];
    const indexStart = this.allDomList.indexOf(item1);
    const indexLast = this.allDomList.indexOf(item2);
    const temp1 = this.allDomList[indexStart];
    const temp2 = this.allDomList[indexLast];
    this.allDomList[indexStart] = temp2;
    this.allDomList[indexLast] = temp1;
    event.detail.complete();
     this.reorderDomains().then(() => {
       console.log(this.allDomList);
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
      let mytemp = [];
      let invitedtemp = [];
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
      let temp = [];
      this.allDomList.forEach((element) => {
        temp.push({id: element.id});
      });
      this.domainAPI.reorderDomains(JSON.stringify(temp), this.userID, this.token).subscribe((result) => {
        if (result['RESPONSECODE'] === 1) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  changeImgStatus(index, status) {
    // const element = document.getElementById('skeleton_' + index);
    if (status) {
      // element.style.display = 'none';
    } else {
      
    }
  }
}
