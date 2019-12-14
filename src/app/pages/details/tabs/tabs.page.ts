import { Storage } from '@ionic/storage';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { Events } from '@ionic/angular';
import { TempService } from './../../../services/temp/temp.service';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
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
    private ionService: IongagetService,
    private generalService: GeneralService,
    private storage: Storage,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.initData();
    this.listenEvents();
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
    }
    this.notifications = this.tempSerivce.notifications.notifications;
    this.unreadCount = this.tempSerivce.unreadCount;
    console.log(this.unreadCount);
    this.cdr.detectChanges();
  }

  listenEvents() {
    this.events.subscribe('hide_header', (result) => {
      const tabs = document.getElementById('tabs');
      const header = document.getElementById('header');
      const down = document.getElementsByClassName('underHeader')[0];
      if (result) {
       tabs.classList.add('expanded');
       header.classList.add('hide-header');
       down.classList.add('paddingTop');
      } else {
        tabs.classList.remove('expanded');
        header.classList.remove('hide-header');
        down.classList.remove('paddingTop');
      }
    });
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openNotificationModal() {
    this.generalService.openNotifications(this.notifications, 1).then((result) => {
      if (result) {
        this.generalService.updateNotifications(this.domainName, this.userID, this.token).then((result) => {
          if (result) {
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
