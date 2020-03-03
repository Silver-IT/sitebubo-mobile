import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TempService } from './../../../services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';

@Component({
  selector: 'app-monitor-issues',
  templateUrl: './monitor-issues.page.html',
  styleUrls: ['./monitor-issues.page.scss'],
})
export class MonitorIssuesPage implements OnInit {
  userID: number;
  token: string;
  filterType: number;
  positiveData = [];
  negativeData = [];
  showData: any;
  reportName: string;
  title: string;
  constructor(
    private tempService: TempService,
    private monitorAPI: MonitorApiService,
    private ionService: IongadgetService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      this.userID =  user.id;
      this.token = user.token;
      this.filterType = this.navParams.get('factor');
      console.log(this.filterType);
      this.reportName = this.navParams.get('reportName');
      if (this.reportName === 'seo') {
        this.getSeoIssues();
        this.title = 'Issues';
      } else if (this.reportName === 'desktop') {
        this.getDesktopIssues();
        this.title = 'Desktop Score';
      } else {
        this.getMobileIssues();
        this.title = 'Mobile Score';
      }
    });
  }

  getDesktopIssues() {
    this.monitorAPI
    .getDesktopReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.seperateData(result.data.desktopreport).then((res) => {
          console.log(res);
          this.positiveData = res.positive;
          this.negativeData = res.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  getMobileIssues() {
    this.monitorAPI.
    getMobileReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.seperateData(result.data.mobilereport).then((res) => {
          console.log(res);
          this.positiveData = res.positive;
          this.negativeData = res.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  getSeoIssues() {
    this.monitorAPI
    .getIssuesRport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token)
    .subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        this.seperateData(result.data.manualreport).then((res) => {
          console.log(res);
          this.positiveData = res.positive;
          this.negativeData = res.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  seperateData(data): Promise<any> {
    return new Promise((resolve, reject) => {
      let temp = [];
      const result = {
        negative: [],
        positive: []
      };
      temp = data;
      temp.forEach((element) => {
        if (element.alertlevel === 2) {
          result.positive.push(element);
        } else {
          result.negative.push(element);
        }
      });
      resolve(result);
    });
  }

  decideShowData() {
    if (this.filterType === 1) {
      this.showData = this.positiveData;
    } else {
      this.showData = this.negativeData;
    }
  }

  changeFiterType(filterType) {
    if (filterType === this.filterType) {
      return;
    }
    this.filterType = filterType;
    this.decideShowData();
  }

  dismisss() {
    this.modalCtrl.dismiss();
  }
}
