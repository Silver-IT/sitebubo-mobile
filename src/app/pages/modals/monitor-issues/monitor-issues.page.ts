import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { TempService } from './../../../services/temp/temp.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-monitor-issues',
  templateUrl: './monitor-issues.page.html',
  styleUrls: ['./monitor-issues.page.scss'],
})
export class MonitorIssuesPage implements OnInit {
  userID: number;
  token: string;
  filterType = 1;
  positiveData = [];
  negativeData = [];
  showData: any;
  reportName: string;
  title: string;
  constructor(
    private tempService: TempService,
    private monitorAPI: MonitorService,
    private ionService: IongagetService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      this.userID =  user.id;
      this.token = user.token;
      this.filterType = this.navParams.get('factor');
      this.reportName = this.navParams.get('reportName');
      if (this.reportName === 'seo') {
        this.getSeoIssues();
        this.title = 'Issues'
      } else if (this.reportName === 'desktop'){
        this.getDesktopIssues();
        this.title = 'Desktop Score';
      } else {
        this.getMobileIssues();
        this.title = 'Mobile Score';
      }
    });
  }

  getDesktopIssues() {
    this.monitorAPI.getDesktopReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.seperateData(result.data.desktopreport).then((result) => {
          console.log(result);
          this.positiveData = result.positive;
          this.negativeData = result.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  getMobileIssues() {
    this.monitorAPI.getMobileReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.seperateData(result.data.mobilereport).then((result) => {
          console.log(result);
          this.positiveData = result.positive;
          this.negativeData = result.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  getSeoIssues() {
    this.monitorAPI.getIssuesRport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.seperateData(result.data.manualreport).then((result) => {
          console.log(result);
          this.positiveData = result.positive;
          this.negativeData = result.negative;
          this.decideShowData();
        });
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  seperateData(data): Promise<any> {
    return new Promise((resolve, reject) => {
      let temp = [];
      let result = {
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
