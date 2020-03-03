import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { NoyearPipe } from 'src/app/pipes/noyear/noyear.pipe';
import { OnlytimePipe } from 'src/app/pipes/onlytime/onlytime.pipe';

@Component({
  selector: 'app-uptime',
  templateUrl: './uptime.page.html',
  styleUrls: ['./uptime.page.scss'],
  providers: [NoyearPipe, OnlytimePipe]
})

export class UptimePage implements OnInit {
  @ViewChild('content', { static: false }) content: HTMLElement;
  userID: number;
  token: string;
  filterLabel = '3 hours';
  filter = 0.3;
  downtimeFilterLabel = '24 hours';
  uptimeStatus: any;
  downtimeRecord = [];
  filterType = 1;
  uptimeChart: GoogleChartInterface;
  event = {
    hide: false,
    show: false
  };
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private monitorAPI: MonitorApiService,
    private ionService: IongadgetService,
    private storage: Storage,
    private actionCtrl: ActionSheetController,
    private noyear: NoyearPipe,
    private onlytime: OnlytimePipe,
    private cdr: ChangeDetectorRef
  ) { }

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
      this.getUptimeStatus(this.filter);
    });
  }

  getUptimeStatus(filter) {
    if (this.tempService.dashboardParams) {
      this.monitorAPI
      .getUptimeStatus(filter, this.tempService.dashboardParams.domainName,
        this.tempService.dashboardParams.domainUserID, this.userID, this.token )
      .subscribe((result: any) => {
        console.log(result);
        if (result.RESPONSECODE === 1) {
          this.uptimeStatus = result.data.uptime[0];
          this.prepareChart(this.uptimeStatus);
          this.defineRecords(this.downtimeFilterLabel);
        } else {
          this.ionService.presentToast(result.RESPONSE);
        }
      }, err => {
        this.router.navigate(['dashboard']);
      });
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  prepareChart(uptimeData) {
    if (this.uptimeChart) {
      this.uptimeChart.dataTable = [
        ['Status', 'Loading Time']
      ];
      this.cdr.detectChanges();
      this.drawChart(uptimeData);
    } else {
      this.drawChart(uptimeData);
    }
  }

  drawChart(uptimeData) {
    const details = uptimeData.chart.details;
    console.log(details);
    if (details.length > 0) {
      this.uptimeChart = {
        chartType: 'LineChart',
       dataTable: [
         ['Status', 'Loading Time'],
       ],
       options: {
          legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          series: {
            0: { lineWidth: 1 },
            1: { color: '#a6ddea', lineWidth: 1 }
          },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            maxValue: 0.3,
            gridlines: {
              count: 3,
            }
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1,
            // maxTextLines: 1,
          }
       }
      };
      if (this.filter < 1) {
        details.forEach((element) => {
          const temp = [ this.onlytime.transform(element.time), parseFloat(element.score) ];
          this.uptimeChart.dataTable.push(temp);
        });
      } else  {
        details.forEach((element) => {
          const temp = [ this.noyear.transform(element.time) + ':00', parseFloat(element.score) ];
          this.uptimeChart.dataTable.push(temp);
        });
      }
    } else {
      this.cdr.detectChanges();
    }
  }

  defineRecords(filterLabel) {
    if (filterLabel === '24 hours') {
      this.downtimeRecord = this.uptimeStatus.downtimes_24hours;
    } else if (filterLabel === '7 days') {
      this.downtimeRecord = this.uptimeStatus.downtimes_7days;
    } else {
      this.downtimeRecord = this.uptimeStatus.downtimes_30days;
      console.log(this.downtimeRecord);
    }
  }

  async downtimeFilter() {
    const action = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Last 24 hours',
          handler: () => {
            this.downtimeFilterLabel = '24 hours';
            this.defineRecords('24 hours');
          }
        },
        {
          text: 'Last 7 days',
          handler: () => {
            this.downtimeFilterLabel = '7 days';
            this.defineRecords('7 days');
          }
        },
        {
          text: 'Last 30 days',
          handler: () => {
            this.downtimeFilterLabel = '30 days';
            this.defineRecords('30 days');
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

  calcuateDuration(dataArray: Array<any>): any {
    return new Promise((resolve) => {
      let temp = []; temp = dataArray;
      const final = [];
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
        };
        final.push(ultratemp);
      });
      resolve(final);
    });
  }

  async openFilter() {
    const action = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Last 3 hours',
          handler: () => {
            this.filter = 0.3;
            this.filterLabel = '3 hours';
            this.getUptimeStatus(0.3);
          }
        },
        {
          text: 'Last 6 hours',
          handler: () => {
            this.filter = 0.6;
            this.filterLabel = '6 hours';
            this.getUptimeStatus(0.6);
          }
        },
        {
          text: 'Last 12 hours',
          handler: () => {
            this.filter = 0.12;
            this.filterLabel = '12 hours';
            this.getUptimeStatus(0.12);
          }
        },
        {
          text: 'Last 24 hours',
          handler: () => {
            this.filter = 0.24;
            this.filterLabel = '24 hours';
            this.getUptimeStatus(0.24);
          }
        },
        {
          text: 'Last 3 days',
          handler: () => {
            this.filter = 3;
            this.filterLabel = '3 days';
            this.getUptimeStatus(3);
          }
        },
        {
          text: 'Last 7 days',
          handler: () => {
            this.filter = 7;
            this.filterLabel = '7 days';
            this.getUptimeStatus(7);
          }
        },
        {
          text: 'Last 30 days',
          handler: () => {
            this.filter = 30;
            this.filterLabel = '30 days';
            this.getUptimeStatus(30);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    action.onDidDismiss().then(() => {
      // this.getUptimeStatus();
    });
    await action.present();
  }
}
