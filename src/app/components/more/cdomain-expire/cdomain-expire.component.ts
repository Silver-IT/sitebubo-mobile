import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
@Component({
  selector: 'app-cdomain-expire',
  templateUrl: './cdomain-expire.component.html',
  styleUrls: ['./cdomain-expire.component.scss'],
})
export class CdomainExpireComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  expireData: any;
  expiredays: number;
  constructor(
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService,
  ) { }

  ngOnInit() {
    this.domainName = this.tempService.dashboardParams.domainName;
    this.domainUserID = this.tempService.dashboardParams.domainUserID;
    this.initData();
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getExpireData();
      }
    });
  }

  getExpireData() {
    this.ionService.showLoading();
    this.monitorAPI.getDomainExpireReport(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.expireData = result.data.whois[0];
        console.log(result.data.whois[0]);
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error from server API');
    });
  }
}
