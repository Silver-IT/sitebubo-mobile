import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { TempService } from 'src/app/services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { NoyearPipe } from 'src/app/pipes/noyear/noyear.pipe';
import { OnlytimePipe } from 'src/app/pipes/onlytime/onlytime.pipe';
import { ConstantsService } from 'src/app/constants/constants.service';
import { IntparsePipe } from 'src/app/pipes/intparse/intparse.pipe';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./../../../pages/dashboard/dashboard.page.scss', './overview.component.scss'],
  providers: [NoyearPipe, OnlytimePipe, IntparsePipe]
})
export class OverviewComponent implements OnInit {
  @ViewChild('cpuTitle', {static: false}) cpuTitle: ElementRef<any>;
  @ViewChild('ramTitle', {static: false}) ramTitle: ElementRef<any>;
  @ViewChild('diskTitle', {static: false}) diskTitle: ElementRef<any>;
  userID: number;
  token: string;
  cpuChart: GoogleChartInterface;
  loadChart: GoogleChartInterface;
  ramChart: GoogleChartInterface;
  networkChart: GoogleChartInterface;
  diskChart: GoogleChartInterface;
  inodeChart: GoogleChartInterface;
  filter = 0.3;
  filterLabel = '3 hours';
  overViewData: any;
  status: any = {};
  constructor(
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService,
    private monitorAPI: MonitorApiService,
    private noyear: NoyearPipe,
    private onlytime: OnlytimePipe,
    private options: ConstantsService,
    private intParse: IntparsePipe,
    private actionCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
      this.initData(this.filter);
    });
  }

  initData(filter) {
    this.ionService.showLoading();
    const params = this.tempService.dashboardParams;
    this.monitorAPI.getOverviewDetails(filter, params.domainName, params.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.overViewData = result.data.data;
        this.drawChart(result.data.data.chart);
        this.changeStatusBarColor(result.data.data.server);
      } else {
        this.ionService.presentToast('There is no data.');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Fectching Data failed due to api.');
    });
  }

  selectedPipe(time) {
    if (this.filter > 1) {
      return this.noyear.transform(time);
    } else {
      return this.onlytime.transform(time);
    }
  }

  selectColor(score) {
    if (score < 30) {
      return this.options.safeStatus.outline;
    } else if (score >= 30 && score < 80) {
      return this.options.warningStatus.outline;
    } else {
      return this.options.dangerStatus.outline;
    }
  }

  changeStatusBarColor(display) {
    this.status.cpu = this.selectColor(this.intParse.transform(display.cpu));
    this.cpuTitle.nativeElement.style.color = this.selectColor(this.intParse.transform(display.cpu));
    this.status.ram = this.selectColor(this.intParse.transform(display.ram_used));
    this.ramTitle.nativeElement.style.color = this.selectColor(this.intParse.transform(display.ram_used));
    this.status.disk = this.selectColor(this.intParse.transform(display.disk));
    this.diskTitle.nativeElement.style.color = this.selectColor(this.intParse.transform(display.disk));
  }

  drawChart(charts) {
    this.cpuChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', 'Aggregated Usage']
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            format: 'percent',
            minValue: 0,
            gridlines: {
              count: 5
            }
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };
    this.loadChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', '1 Min', '5 Min', '15 Min']
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          series: {
            1: { color: '#6f6f6f' },
            2: { color: '#61e743' }
          },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            minValue: 0,
            gridlines: {
              count: 5
            }
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };
    this.ramChart = {
      chartType: 'AreaChart',
      dataTable: [
        ['Usage', 'Used']
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            format: '# GB',
            gridlines: {
              count: 5
            },
            minValue: 0
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };
    this.networkChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', 'eth1', 'eth0', 'lo'],
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          series: {
            1: { color: '#6f6f6f' },
            2: { color: '#61e743' }
          },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            format: '# MB/s',
            minValue: 0,
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };
    this.diskChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', '/', '/boot/efi']
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          series: {
            1: { color: '#6f6f6f' },
          },
          vAxis: {
            format: 'percent',
            gridlines: {
              count: 5
            }
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };
    this.inodeChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', '/', '/boot/efi']
      ],
      options: {
        legend: { position: 'top', alignment: 'center' },
          chartArea: { width: '80%', left: '15%', right: '5%' },
          series: {
            1: { color: '#6f6f6f' },
          },
          position: 'center',
          alignment: 'center',
          curveType: 'function',
          vAxis: {
            format: 'percent',
            minValue: 0,
            gridlines: {
              count: 5
            }
          },
          hAxis: {
            slantedText: false,
            maxAlternation: 1
          }
      }
    };

    charts.cpu.forEach((element) => {
      this.cpuChart.dataTable.push([this.selectedPipe(element.time), element.score / 100]);
    });
    charts.load_average.forEach((element) => {
      // tslint:disable-next-line: max-line-length
      this.loadChart.dataTable.push([this.selectedPipe(element.time), parseFloat(element.load1) , parseFloat(element.load5), parseFloat(element.load15)]);
    });
    charts.ram_average.forEach((element) => {
      this.ramChart.dataTable.push([this.selectedPipe(element.time), element.score / 100]);
    });
    charts.network_speed.forEach((element) => {
      this.networkChart.dataTable.push([this.selectedPipe(element.time), element.eth1, element.eth0, element.lo]);
    });
    charts.disk_usage.forEach((element) => {
      this.diskChart.dataTable.push([this.selectedPipe(element.time), element['/'] / 100, element['/boot/efi'] / 100]);
    });
    charts.disks_inodes.forEach((element) => {
      this.inodeChart.dataTable.push([this.selectedPipe(element.time), element['/'] / 100, element['/boot/efi'] / 100]);
    });
  }

  async changeFilterType() {
    const action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Last 3 hours',
          handler: () => {
            this.filter = 0.3;
            this.filterLabel = '3 hours';
            this.initData(0.3);
          }
        },
        {
          text: 'Last 6 hours',
          handler: () => {
            this.filter = 0.6;
            this.filterLabel = '6 hours';
            this.initData(0.6);
          }
        },
        {
          text: 'Last 12 hours',
          handler: () => {
            this.filter = 0.12;
            this.filterLabel = '12 hours';
            this.initData(0.12);
          }
        },
        {
          text: 'Last 24 hours',
          handler: () => {
            this.filter = 0.24;
            this.filterLabel = '24 hours';
            this.initData(0.24);
          }
        },
        {
          text: 'Last 3 days',
          handler: () => {
            this.filter = 3;
            this.filterLabel = '3 days';
            this.initData(3);
          }
        },
        {
          text: 'Last 7 days',
          handler: () => {
            this.filter = 7;
            this.filterLabel = '7 days';
            this.initData(7);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    (await action).present();
  }
}
