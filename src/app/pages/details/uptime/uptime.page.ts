import { ActionSheetController, Events } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';

@Component({
  selector: 'app-uptime',
  templateUrl: './uptime.page.html',
  styleUrls: ['./uptime.page.scss'],
})
export class UptimePage implements OnInit {
  @ViewChild('content', { static: false }) content: HTMLElement;
  userID: number;
  token: string;
  uptimeStatus: any;
  downtimeRecord = [];
  filterType = 1;
  filterLabel: string;
  event = {
    hide: false,
    show: false
  }
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private monitorAPI: MonitorService,
    private ionService: IongagetService,
    private storage: Storage,
    private actionCtrl: ActionSheetController,
    private events: Events
  ) { }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.initData();
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
      this.getUptimeStatus();
    });
  }

  getUptimeStatus() {
    if (this.tempService.dashboardParams) {
      this.monitorAPI.getUptimeStatus(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token )
      .subscribe((result) => {
        console.log(result);
        if (result['RESPONSECODE'] === 1) {
          this.uptimeStatus = result.data.uptime[0];
          this.defineRecords();
        } else {
          this.ionService.presentToast(result['RESPONSE']);
        }
      }, err => {
        this.router.navigate(['dashboard']);
      });    
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  defineRecords() {
    if (this.filterType === 1) {
      this.filterLabel = 'Last 24 hours';
      this.downtimeRecord = this.uptimeStatus['downtimes_24hours'];
    } else if (this.filterType === 2) {
      this.filterLabel = 'Last 7 days';
      this.downtimeRecord = this.uptimeStatus['downtimes_7days'];
    } else {
      this.filterLabel = 'Last 30 days';
      this.downtimeRecord = this.uptimeStatus['downtimes_30days'];
      console.log(this.downtimeRecord);
    }
  }

  calcuateDuration(dataArray): any {
    return new Promise((resolve, reject) => {
      let temp = []; temp = dataArray;
      let final = [];
      temp.forEach((element) => {
        let ultratemp: any;
        let letter: string;
        console.log(element);
        if (element.days !== '0' ) {
          letter += element.days + ' days ';
        }
        if (element.hours !== '0' ) {
          letter += element.hours + ' hours ';
        }
        if (element.minutes !== '0' ) {
          letter += element.days + ' minutes ';
        }

        ultratemp = {
          duration: letter,
          date: element.date,
          time: element.time
        }
        final.push(ultratemp);
      })
      resolve(final);
    });
  }

  async showMoreInfo() {
    const action = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Last 24 hours',
          handler: () => {
            this.filterType = 1;
            this.defineRecords();
          }
        },
        {
          text: 'Last 7 days',
          handler: () => {
            this.filterType = 2;
            this.defineRecords();
          }
        },
        {
          text: 'Last 30 days',
          handler: () => {
            this.filterType = 3;
            this.defineRecords();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await action.present();
  }

  logScrolling(event) {
    // const temp = event.detail.currentY;
    // if ( temp > 50 && !this.event.hide) {
    //   this.events.publish('hide_header', true);
    //   this.event.hide = true;
    // } else if (temp < 50 && this.event.hide) {
    //   this.events.publish('hide_header', false);
    //   this.event.hide = false;
    // } 
  }
}
