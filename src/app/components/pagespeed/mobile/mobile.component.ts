import { Component, OnInit } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  userID: number;
  token: string;
  filterType = 1;
  positiveData = [];
  negativeData = [];
  showData: any;
  constructor(
    private monitorAPI: MonitorService,
    private storage: Storage,
    private ionService: IongagetService,
    private tempService: TempService
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      this.userID =  user.id;
      this.token = user.token;
      this.initData();
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getMobileData();
      }
    });
  }

  getMobileData() {
    this.monitorAPI.getMobileReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID,this.userID, this.token).subscribe((result) => {
      console.log(result);
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

}
