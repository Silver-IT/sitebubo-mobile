import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';

@Component({
  selector: 'app-cbroken-links',
  templateUrl: './cbroken-links.component.html',
  styleUrls: ['./cbroken-links.component.scss'],
})
export class CbrokenLinksComponent implements OnInit {
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  brokenLinks = [];
  constructor(
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService,
    private cdr: ChangeDetectorRef
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
        this.getBrokenlinks();
      }
    });
  }

  getBrokenlinks() {
    this.ionService.showLoading();
    this.monitorAPI.getBrokenLinkReport(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.brokenLinks = result.data;
        console.log(result.data);
        this.cdr.detectChanges();
      } else {
        if (result.RESPONSE === 'No Broken Links') {
          this.brokenLinks = null;
        } else {
          this.ionService.presentToast(result.RESPONSE);
        }
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error from server API');
    });
  }
}
