import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { TempService } from 'src/app/services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConstantsService } from 'src/app/constants/constants.service';
import { DatetimePipe } from 'src/app/pipes/datetime/datetime.pipe';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-cmobile',
  templateUrl: './cmobile.component.html',
  styleUrls: ['./../cspeed/cspeed.component.scss'],
  providers: [DatetimePipe]
})
export class CmobileComponent implements OnInit {
  @ViewChild('desktopTitle', {static: false}) desktopTitle: ElementRef<any>;
  userID: number;
  token: string;
  filter = 0;
  displayData: any;
  desktopData: any;
  desktopChart: GoogleChartInterface;
  metricsFilter = 0;
  constructor(
    private storage: Storage,
    private monitorAPI: MonitorApiService,
    private ionService: IongadgetService,
    private tempService: TempService,
    private options: ConstantsService,
    private dateTimePipe: DatetimePipe,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
      this.initData();
    });
  }

  initData() {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.monitorAPI.getMobileSpeed(this.filter, params.domainName, params.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      this.ionService.closeLoading();
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.desktopData = result.data;
        this.displayData = result.data.performance[0];
        this.changeStatusBarColor(this.displayData);
        this.setChatrtValues(this.desktopData.chart);
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
      this.desktopTitle.nativeElement.style.color = this.options.dangerStatus.outline;
    } else if (score >= 50 && score < 90) {
      this.displayData.status = this.options.warningStatus;
      this.displayData.status.percentage = score;
      this.desktopTitle.nativeElement.style.color = this.options.warningStatus.outline;
    } else {
      this.displayData.status = this.options.safeStatus;
      this.displayData.status.percentage = score;
      this.desktopTitle.nativeElement.style.color = this.options.safeStatus.outline;
    }
  }

  setChatrtValues(charts) {
    console.log(charts);
    const chartOptions = {
      legend: { position: 'top', alignment: 'center' },
        chartArea: { width: '80%', left: '15%', right: '5%' },
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

    this.desktopChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Dates', 'Desktop Score'],
      ],
      options: chartOptions
    };
    charts.forEach(element => {
      const temp = [this.dateTimePipe.transform(element.time), element.score];
      this.desktopChart.dataTable.push(temp);
    });
  }

  changeMetricsFilter(event) {
    console.log(event.target.value);
    this.metricsFilter = event.target.value;
  }
}
