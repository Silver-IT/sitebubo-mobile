import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PluginsApiService } from 'src/app/apis/plugins/plugins-api.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  pageType: number;
  brokenlinksCount: number;
  serverMonitorPage = 0;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.tempService.dashboardParams) {
      this.brokenlinksCount = this.tempService.brokenLinksCount;
      this.activateRoute.queryParams.subscribe((params) => {
        if (params) {
          if (params.pageName === 'expire') {
            this.pageType = 1;
          } else if (params.pageName === 'link') {
            this.pageType = 2;
          } else if (params.pageName === 'overview') {
            this.pageType = 4;
          } else if (params.pageName === 'analytics') {
            this.pageType = 3;
          } else {
            this.pageType = 0;
          }
        } else {
          this.pageType = 0;
        }
      });
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  changeServerMonitorPage(event) {
    this.serverMonitorPage = parseInt(event.target.value, 10);
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }
}
