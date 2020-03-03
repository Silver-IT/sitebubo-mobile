import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { DatetimePipe } from 'src/app/pipes/datetime/datetime.pipe';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { GeneralService } from 'src/app/services/generalComponents/general.service';

@Component({
  selector: 'app-cseo',
  templateUrl: './cseo.component.html',
  styleUrls: ['./../../pagespeed/cspeed/cspeed.component.scss'],
  providers: [DatetimePipe]
})
export class CseoComponent implements OnInit {
  @ViewChild('seoTitle', { static: false }) seoTitle: ElementRef<any>;
  userID: number;
  token: string;
  seoChart: GoogleChartInterface;
  seoData: any;
  displayData: any;
  filter = 0;
  constructor(
    private storage: Storage,
    private monitorAPI: MonitorApiService,
    private ionService: IongadgetService,
    private tempService: TempService,
    private options: ConstantsService,
    private dateTimePipe: DatetimePipe,
    private iab: InAppBrowser,
    private router: Router,
    private events: Events,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.listenEvents();
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.initData();
      }
    });
  }

  listenEvents() {
    this.events.subscribe('reloadresult', () => {
      this.initData();
    });
  }

  initData() {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.monitorAPI.getSeoDetails(this.filter, params.domainName, params.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      this.ionService.closeLoading();
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.seoData = result.data;
        this.displayData = result.data.performance[0];
        this.changeStatusBarColor(this.displayData);
        this.drawChart(this.seoData.chart);
      } else {
        this.ionService.presentToast('No data from server.');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error from Server Api.');
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

  linkToLearnMore(url) {
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

  changeStatusBarColor(display) {
    const score = display.score;
    console.log(score);
    if (score < 50) {
      this.displayData.status = this.options.dangerStatus;
      this.displayData.status.percentage = score;
      this.seoTitle.nativeElement.style.color = this.options.dangerStatus.outline;
    } else if (score >= 50 && score < 90) {
      this.displayData.status = this.options.warningStatus;
      this.displayData.status.percentage = score;
      this.seoTitle.nativeElement.style.color = this.options.warningStatus.outline;
    } else {
      this.displayData.status = this.options.safeStatus;
      this.displayData.status.percentage = score;
      this.seoTitle.nativeElement.style.color = this.options.safeStatus.outline;
    }
  }

  drawChart(charts) {
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
          maxValue: 100,
          gridlines: {
            count: 5,
          }
        }
    };
    this.seoChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Dates', 'Seo Score']
      ],
      options: chartOptions
    };
    charts.forEach(element => {
      const temp = [this.dateTimePipe.transform(element.time), element.score];
      this.seoChart.dataTable.push(temp);
    });
  }

  socketSeo() {
    this.generalService.confirmManualScanCount('seo', this.userID, this.token).then((res) => {
      if (res) {
        this.router.navigate(['domain-scan'], {queryParams: {
          action: 'seo-scan'
        }});
      }
    });
  }
}
