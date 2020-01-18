import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { MonitorApiService } from 'src/app/apis/monitor/monitor-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
@Component({
  selector: 'app-cblacklist',
  templateUrl: './cblacklist.component.html',
  styleUrls: ['./cblacklist.component.scss'],
})
export class CblacklistComponent implements OnInit {
  @ViewChild('card', { static: false }) card: HTMLElement;
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  blacklistData: any;
  lastChecked: any;
  constructor(
    private monitorAPI: MonitorApiService,
    private storage: Storage,
    private ionService: IongadgetService,
    private tempService: TempService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tempService.dashboardParams) {
      this.domainName = this.tempService.dashboardParams.domainName;
      this.domainUserID = this.tempService.dashboardParams.domainUserID;
      this.initData();
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        this.getBlackListData();
      }
    });
  }

  getBlackListData() {
    this.monitorAPI.getBlackListReport(this.domainName, this.domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.lastChecked = result.data.blacklist[0].date;
        this.blacklistData = result.data.blacklist[0].security_details;
        this.cdr.detectChanges();
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }
}
