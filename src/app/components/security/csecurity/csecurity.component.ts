import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-csecurity',
  templateUrl: './csecurity.component.html',
  styleUrls: ['./csecurity.component.scss'],
})
export class CsecurityComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  securityData: any;
  constructor(
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService
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
        this.getSecurityData();
      }
    });
  }

  getSecurityData() {
    this.monitorAPI.getSecurityReport(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.securityData = result.data;
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

}

