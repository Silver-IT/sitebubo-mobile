import { Component, OnInit, ViewChild } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';

@Component({
  selector: 'app-cspeed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss'],
})
export class SpeedComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  speedData: any;
  @ViewChild('card', { static: false }) card: HTMLElement;
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
        this.getSpeedData();
      }
    });
  }

  getSpeedData() {
    this.monitorAPI.getPageSpeed(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.speedData = result.data;
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }
}
