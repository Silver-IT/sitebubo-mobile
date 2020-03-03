import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { Events } from '@ionic/angular';
import { TempService } from './../../../services/temp/temp.service';
import { Component, ViewChild, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  @ViewChild('header', { static: false }) header: HTMLElement;
  @ViewChild('tabs', { static: false }) tabs: HTMLElement;
  domainName: string;
  notifications: any;
  userID: number;
  token: string;
  unreadCount = 0;
  constructor(
    private tempSerivce: TempService,
    private events: Events,
    private ionService: IongadgetService,
    private generalService: GeneralService,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private admob: AdmobService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.reload) {
        this.events.publish('reloadresult');
      }
    });
    this.defineAdmobShow();
    this.initData();
  }

  ngOnDestroy() {
    this.admob.removeBanner();
  }

  defineAdmobShow() {
    this.storage.get('planInfo').then((info) => {
      if (info.id === 1) {
        this.admob.showAdmobBanner();
      } else {
        this.admob.removeBanner();
      }
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  ionViewWillEnter() {
    if (this.tempSerivce.dashboardParams) {
      this.domainName = this.tempSerivce.dashboardParams.domainName;
      this.notifications = this.tempSerivce.notifications.notifications;
      this.unreadCount = this.tempSerivce.unreadCount;
      this.cdr.detectChanges();
    }
  }

  // listenEvents() {
  //   this.events.subscribe('hide_header', (result) => {
  //     const tabs = document.getElementById('tabs');
  //     const header = document.getElementById('header');
  //     const down = document.getElementsByClassName('underHeader')[0];
  //     if (result) {
  //      tabs.classList.add('expanded');
  //      header.classList.add('hide-header');
  //      down.classList.add('paddingTop');
  //     } else {
  //       tabs.classList.remove('expanded');
  //       header.classList.remove('hide-header');
  //       down.classList.remove('paddingTop');
  //     }
  //   });
  // }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openNotificationModal() {
    this.generalService.openNotifications(this.notifications, 1).then((result) => {
      if (result) {
        this.generalService.updateNotifications(this.domainName, this.userID, this.token).then((res) => {
          if (res) {
            this.unreadCount = 0;
            this.cdr.detectChanges();
          }
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
