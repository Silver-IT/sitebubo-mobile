import { Component, OnInit } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  issues: any;
  constructor(
    private monitorAPI: MonitorService,
    private storage: Storage,
    private ionService: IongagetService,
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
        this.getIssues();
      }
    });
  }

  getIssues() {
    this.ionService.showLoading();
    this.monitorAPI.getIssuesRport(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result['RESPONSECODE'] === 1) {
        this.issues = result.data;
        console.log(this.issues);
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error from server API');
    });
  }
}
