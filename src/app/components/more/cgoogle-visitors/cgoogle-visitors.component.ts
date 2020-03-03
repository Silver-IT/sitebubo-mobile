import { Component, OnInit, OnDestroy } from '@angular/core';
import { TempService } from 'src/app/services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { NoyearPipe } from 'src/app/pipes/noyear/noyear.pipe';
import { SocketService } from 'src/app/services/socket/socket.service';


@Component({
  selector: 'app-cgoogle-visitors',
  templateUrl: './cgoogle-visitors.component.html',
  styleUrls: ['./cgoogle-visitors.component.scss'],
  providers: [NoyearPipe]
})
export class CgoogleVisitorsComponent implements OnInit, OnDestroy {
  userID: number;
  token: string;
  filter = 0;
  analyticsDetail: any;
  audienceFilter = 0;
  behaviourFilter = 0;
  goalFilter = 0;
  usersChart: GoogleChartInterface;
  newusersChart: GoogleChartInterface;
  sessionsChart: GoogleChartInterface;
  durationChart: GoogleChartInterface;
  bounceChart: GoogleChartInterface;
  conversionChart: GoogleChartInterface;
  completionChart: GoogleChartInterface;
  pageviewsChart: GoogleChartInterface;
  pageviewspersessionChart: GoogleChartInterface;
  sessionsperuserChart: GoogleChartInterface;
  constructor(
    private monitorAPI: MonitorApiService,
    private tempService: TempService,
    private storage: Storage,
    private router: Router,
    private ionService: IongadgetService,
    private datetime: NoyearPipe,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getGoogleAnalyticsDetail();
      } else {
        this.router.navigate(['domain-list'], { replaceUrl: true });
      }
    });
  }

  ngOnDestroy() {
    const event = '/domain/' + this.tempService.dashboardParams.domainName + '/monitor/realtime';
    this.socket.removeHandler(event);
  }

  getGoogleAnalyticsDetail() {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.monitorAPI.getGoogleAnalytics(this.filter, params.domainName, params.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      this.ionService.closeLoading();
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.analyticsDetail = result.data.analytics;
        this.prepareChartData(result.data.analytics);
        this.socket.watchChanges('realtime', params.domainName, this.analyticsDetail);
      } else {
        this.ionService.presentToast('Failed: ' + result.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server Api Problem');
    });
  }


  changeAudienceFilter(event) {
    this.audienceFilter = event.target.value;
  }

  changeBehaviourFilter(event) {
    this.behaviourFilter = event.target.value;
  }

  changeGoalFilter(event) {
    this.goalFilter = event.target.value;
  }

  getAnotherResult(param) {
    if (param === 'next') {
      this.filter --;
      this.getGoogleAnalyticsDetail();
    } else {
      this.filter ++;
      this.getGoogleAnalyticsDetail();
    }
  }

  prepareChartData(data) {
    const chartOptions = {
      legend: { position: 'top', alignment: 'center' },
        chartArea: { width: '80%', left: '15%', right: '5%' },
        series: {
          0: { lineWidth: 1 },
          1: { color: '#a6ddea', lineWidth: 1 }
        },
        position: 'center',
        alignment: 'center'
    };
    this.usersChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.newusersChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.sessionsChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.durationChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
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
          vAxis: {
            format: 'HH:mm:ss',
            gridlines: {
              count: 6,
            }
          }
      }
    };
    this.bounceChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
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
          vAxis: {
            format: 'percent'
        }
      }
    };
    this.conversionChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.completionChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.pageviewsChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.pageviewspersessionChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    this.sessionsperuserChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Date', 'Current period', 'Comparison period'],
      ],
      options: chartOptions
    };
    // tslint:disable-next-line: no-unused-expression
    for (let i = data.users.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.users.chart[0][i];
      const secondData = data.users.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.usersChart.dataTable.push(temp);
    }
    for (let i = data.newusers.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.newusers.chart[0][i];
      const secondData = data.newusers.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.newusersChart.dataTable.push(temp);
    }
    for (let i = data.sessions.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.sessions.chart[0][i];
      const secondData = data.sessions.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.sessionsChart.dataTable.push(temp);
    }
    for (let i = data.avgsessionduration.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.avgsessionduration.chart[0][i];
      const secondData = data.avgsessionduration.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        new Date(0, 0, 0, 0, 0, firstData.score),
        new Date(0, 0, 0, 0, 0, secondData.score)
      ];
      this.durationChart.dataTable.push(temp);
    }
    for (let i = data.bouncerate.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.bouncerate.chart[0][i];
      const secondData = data.bouncerate.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score / 100,
        secondData.score / 100
      ];
      this.bounceChart.dataTable.push(temp);
    }
    for (let i = data.goalcompletionsall.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.goalcompletionsall.chart[0][i];
      const secondData = data.goalcompletionsall.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.completionChart.dataTable.push(temp);
    }
    for (let i = data.goalconversionrateall.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.goalconversionrateall.chart[0][i];
      const secondData = data.goalconversionrateall.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.conversionChart.dataTable.push(temp);
    }
    for (let i = data.pageviews.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.pageviews.chart[0][i];
      const secondData = data.pageviews.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.pageviewsChart.dataTable.push(temp);
    }
    for (let i = data.pageviewspersession.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.pageviewspersession.chart[0][i];
      const secondData = data.pageviewspersession.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.pageviewspersessionChart.dataTable.push(temp);
    }
    for (let i = data.sessionsperuser.chart[0].length - 1 ; i >= 0 ; i-- ) {
      const firstData = data.sessionsperuser.chart[0][i];
      const secondData = data.sessionsperuser.chart[1][i];
      const temp = [
        this.datetime.transform(firstData.time),
        firstData.score,
        secondData.score
      ];
      this.sessionsperuserChart.dataTable.push(temp);
    }
  }
}
