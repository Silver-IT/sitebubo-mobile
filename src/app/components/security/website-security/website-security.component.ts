import { Component, OnInit, Input } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';

@Component({
  selector: 'app-website-security',
  templateUrl: './website-security.component.html',
  styleUrls: ['./website-security.component.scss'],
})
export class WebsiteSecurityComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  securityData: any;
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

  ionViewWillEnter() {
    
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
      if (result['RESPONSECODE'] === 1) {
        this.securityData = result.data;
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

}
