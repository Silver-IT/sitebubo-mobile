import { Component, OnInit } from '@angular/core';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { ActionSheetController } from '@ionic/angular';
import { TempService } from 'src/app/services/temp/temp.service';
import { NoyearPipe } from 'src/app/pipes/noyear/noyear.pipe';
import { OnlytimePipe } from 'src/app/pipes/onlytime/onlytime.pipe';

@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./../overview/overview.component.scss', './disk.component.scss'],
  providers: [NoyearPipe, OnlytimePipe]
})
export class DiskComponent implements OnInit {
  userID: number;
  token: string;
  diskData: any;
  diskUsageChart: GoogleChartInterface;
  inodeUsageChart: GoogleChartInterface;
  filter = 0.3;
  filterLabel = '3 hours';
  constructor(
    private storage: Storage,
    private monitorAPI: MonitorApiService,
    private ionService: IongadgetService,
    private actionCtrl: ActionSheetController,
    private tempService: TempService,
    private noyear: NoyearPipe,
    private onlytime: OnlytimePipe
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
    this.monitorAPI.getDiskDetails(filter, params.domainName, params.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.diskData = result.data.data;
        this.drawChart(result.data.data.chart);
        this.drawTable(result.data.data.server.disk_table);
      } else {
        this.ionService.presentToast('There is no data.');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Fectching Data failed due to api.');
    });
  }

  drawTable(tableData) {
    console.log(tableData);
  }

  selectedPipe(time) {
    if (this.filter > 1) {
      return this.noyear.transform(time);
    } else {
      return this.onlytime.transform(time);
    }
  }

  drawChart(charts) {
      const chartOptions = {
      legend: { position: 'top', alignment: 'center' },
      chartArea: { width: '80%', left: '15%', right: '5%' },
      series: {
        1: { color: '#6f6f6f' },
        2: { color: '#61e743' },
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
    };
    // tslint:disable-next-line: align
    this.diskUsageChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', '/', '/boot.efi']
      ],
     options: chartOptions
    };
    // tslint:disable-next-line: align
    this.inodeUsageChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Usage', '/', '/boot.efi']
      ],
      options: chartOptions
    };
    // tslint:disable-next-line: align
    charts.disk_usage.forEach((element) => {
      // tslint:disable-next-line: max-line-length
      this.diskUsageChart.dataTable.push([this.selectedPipe(element.time), element['/'], element['/boot/efi'] ]);
    });
    // tslint:disable-next-line: align
    charts.disks_inodes.forEach((element) => {
      // tslint:disable-next-line: max-line-length
      this.inodeUsageChart.dataTable.push([this.selectedPipe(element.time), element['/'], element['/boot/efi'] ]);
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
