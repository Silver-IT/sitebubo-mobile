import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
})
export class BlacklistComponent implements OnInit {
  @ViewChild('card', { static: false }) card: HTMLElement;
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  blacklistData: any;

  constructor(
    private monitorAPI: MonitorService,
    private storage: Storage,
    private ionService: IongagetService,
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

  ngAfterViewInit() {
    console.log('asdfasdfasdfasdfasdfasdfasdfasdf');
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
      if (result['RESPONSECODE'] === 1) {
        this.blacklistData = result.data.blacklist[0]['security_details'];
        this.cdr.detectChanges();
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }
}
