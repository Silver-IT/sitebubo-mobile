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
  detailedPage: string;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private pluginsApi: PluginsApiService,
    private storage: Storage,
    private admob: AdmobService
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
          } else if (params.pageName === 'analytics') {
            this.pageType = 3;
            this.detailedPage = params.detailedPage;
            this.getGoogleAnalyticsDetails();
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

  openFeedback() {
    this.generalSerive.openFeedback();
  }

  changeGoogleAnalyticsType(event) {
    this.detailedPage = event.target.value;
  }

  getGoogleAnalyticsDetails() {
    const params = this.tempService.dashboardParams;
    console.log(params);
    this.storage.get('userInfo').then((user) => {
      this.pluginsApi.getAnalyticsDetails(params.domainName, params.domainID, user.id, user.token).subscribe((result) => {
        console.log(result);
      });
    });
  }
}
