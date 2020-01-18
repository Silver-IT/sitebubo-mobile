import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-cspeed',
  templateUrl: './cspeed.component.html',
  styleUrls: ['./cspeed.component.scss'],
})
export class CspeedComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  speedData: any;
  speed: number;
  actualSpeed = 0;
  displaySpeed: number;
  status: string;
  @ViewChild('card', { static: false }) card: HTMLElement;
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
        this.getSpeedData();
      }
    });
  }

  getSpeedData() {
    this.monitorAPI.getPageSpeed(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.speedData = result.data;
        this.distinguishSpeed(result.data.primary[0].status);
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  distinguishSpeed(status) {
    const temp = parseFloat(status.split(' ')[0]);
    this.actualSpeed = temp;
    if (temp <= 1) {
      this.speed = 4;
    } else if (temp > 1 && temp <= 2) {
      this.speed = 3;
    } else if (temp > 2 && temp <= 3) {
      this.speed = 2;
    } else {
      this.speed = 1;
    }
  }

  onrender(event) {
    if (event <= 1) {
      this.status = 'Poor';
    } else if (event > 1 && event <= 2) {
      this.status = 'Fair';
    } else if (event > 2 && event <= 3) {
      this.status = 'Good';
    } else {
      this.status = 'Excellent';
    }
  }
}

