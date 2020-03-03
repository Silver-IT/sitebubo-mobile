import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { ActionSheetController, Events } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { DatetimePipe } from 'src/app/pipes/datetime/datetime.pipe';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/generalComponents/general.service';


@Component({
  selector: 'app-cspeed',
  templateUrl: './cspeed.component.html',
  styleUrls: ['./cspeed.component.scss'],
  providers: [DatetimePipe]
})
export class CspeedComponent implements OnInit {
  @ViewChild('desktopTitle', {static: false}) desktopTitle: ElementRef<any>;
  @ViewChild('mobileTitle', {static: false}) mobileTitle: ElementRef<any>;
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  filterDisplay = 0;
  filter = 0;
  speedData: any;
  desktopDisplayData: any;
  mobileDisplayData: any;
  desktopChart: GoogleChartInterface;
  mobileChart: GoogleChartInterface;
  constructor(
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService,
    public options: ConstantsService,
    private action: ActionSheetController,
    private dataTime: DatetimePipe,
    private cdr: ChangeDetectorRef,
    private events: Events,
    private router: Router,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.listenEvents();
    this.domainName = this.tempService.dashboardParams.domainName;
    this.domainUserID = this.tempService.dashboardParams.domainUserID;
    this.initData();
  }

  listenEvents() {
    this.events.subscribe('reloadresult', () => {
      this.initData();
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getSpeedData().then(async (res) => {
          if (res) {
            await this.changeStatusBarColor('desktop').then(() => {
              this.setChartValues('desktop');
            });
            await this.changeStatusBarColor('mobile').then(() => {
              this.setChartValues('mobile');
            });
            await this.cdr.detectChanges();
          }
        });
      }
    });
  }

  getAnotherResult(type) {
    if (type === 'prev') {
      this.filter = this.filter + 1;
      this.initData();
    } else {
      this.filter = this.filter - 1;
      this.initData();
    }
  }

  getSpeedData(): any {
    return new Promise((resolve) => {
      this.ionService.showLoading();
      this.monitorAPI.getPageSpeed(this.filter, this.domainName, this.domainUserID, this.userID, this.token).subscribe(async (result) => {
        this.ionService.closeLoading();
        if (result.RESPONSECODE === 1) {
          this.events.publish('mobileAlert', result.data.metrics.mobile.negative_alert);
          this.events.publish('desktopAlert', result.data.metrics.desktop.negative_alert);
          this.speedData = result.data;
          this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails.interactive;
          this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails.interactive;
          resolve(result.data);
        } else {
          this.ionService.presentToast(result.RESPONSE);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Error from server API');
      });
    });
  }

  changeFilterDisplay(event) {
    console.log(event.target.value);
    this.filterDisplay = event.target.value;
  }

  socketPageSpeed() {
    this.generalService.confirmManualScanCount('speed', this.userID, this.token).then((res) => {
      if (res) {
        this.router.navigate(['domain-scan'], {queryParams: {
          action: 'speed-scan'
        }});
      }
    });
  }

  async changeDisplayData(display) {
    let heading: string;
    if (display === 'desktop') {
      heading = 'What kind of data do you want to see from desktop status';
    } else {
      heading = 'What kind of data do you want to see from mobile status';
    }
    const action = await this.action.create({
      header: heading,
      buttons: [
        {
          text: 'First Contentful Paint',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails['first-contentful-paint'];
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails['first-contentful-paint'];
            }
          }
        },
        {
          text: 'Speed Index',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails['speed-index'];
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails['speed-index'];
            }
          }
        },
        {
          text: 'Time to Interactive',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails.interactive;
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails.interactive;
            }
          }
        },
        {
          text: 'First Meaningful Paint',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails['first-meaningful-paint'];
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails['first-meaningful-paint'];
            }
          }
        },
        {
          text: 'First CPU Idle',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails['first-cpu-idle'];
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails['first-cpu-idle'];
            }
          }
        },
        {
          text: 'Max Potential First Input Delay',
          handler: () => {
            if (display === 'desktop') {
              this.desktopDisplayData = this.speedData.metrics.desktop.scoredetails['max-potential-fid'];
            } else {
              this.mobileDisplayData = this.speedData.metrics.mobile.scoredetails['max-potential-fid'];
            }
          }
        },
      ]
    });
    action.onDidDismiss().then(() => {
      this.changeStatusBarColor(display);
      this.setChartValues(display);
    });
    await action.present();
  }

  changeStatusBarColor(display): any {
    return new Promise((resolve) => {

      if (display === 'desktop') {
        const timeload = this.desktopDisplayData.real_value;
        if (timeload <= 2) {
          this.desktopDisplayData.status = this.options.safeStatus;
          this.desktopDisplayData.status.percentage = 100;
          this.desktopTitle.nativeElement.style.color = this.options.safeStatus.outline;
        } else if (timeload > 2 && timeload < 4) {
          this.desktopDisplayData.status = this.options.warningStatus;
          this.desktopDisplayData.status.percentage = 66;
          this.desktopTitle.nativeElement.style.color = this.options.warningStatus.outline;
        } else {
          this.desktopDisplayData.status = this.options.dangerStatus;
          this.desktopDisplayData.status.percentage = 33;
          this.desktopTitle.nativeElement.style.color = this.options.dangerStatus.outline;
        }
      } else {
        const timeload = this.mobileDisplayData.real_value;
        if (timeload <= 2) {
          this.mobileDisplayData.status = this.options.safeStatus;
          this.mobileDisplayData.status.percentage = 100;
          this.mobileTitle.nativeElement.style.color = this.options.safeStatus.outline;
        } else if (timeload > 2 && timeload < 4) {
          this.mobileDisplayData.status = this.options.warningStatus;
          this.mobileDisplayData.status.percentage = 69;
          this.mobileTitle.nativeElement.style.color = this.options.warningStatus.outline;
        } else {
          this.mobileDisplayData.status = this.options.dangerStatus;
          this.mobileDisplayData.status.percentage = 33;
          this.mobileTitle.nativeElement.style.color = this.options.dangerStatus.outline;
        }
      }
      resolve(true);
    });
  }

  setChartValues(display) {
    const chartOptions = {
      legend: { position: 'top', alignment: 'center' },
      chartArea: { width: '80%', left: '15%', right: '5%' },
      series: {
        0: { lineWidth: 1 },
        1: { color: '#a6ddea', lineWidth: 1 }
      },
      position: 'center',
      alignment: 'center',
      vAxis: {
        minValue: 0,
        gridlines: { count: 5 }
      }
    };

    if (display === 'desktop') {
      this.desktopChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Dates', 'Desktop Speed'],
        ],
        options: chartOptions
      };
      console.log(this.desktopDisplayData);
      this.desktopDisplayData.chart.forEach(element => {
        const temp = [this.dataTime.transform(element.time), parseFloat(element.score)];
        this.desktopChart.dataTable.push(temp);
      });
    } else {
      this.mobileChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Dates', 'Mobile Speed'],
        ],
        options: chartOptions
     };
      this.mobileDisplayData.chart.forEach(element => {
        const temp = [this.dataTime.transform(element.time), element.score];
        this.mobileChart.dataTable.push(temp);
      });
    }
  }

  openFactors(reportName) {
    if (reportName === 'desktop') {
      this.events.publish('gotoDesktop');
    } else {
      this.events.publish('gotoMobile');
    }
  }
}

