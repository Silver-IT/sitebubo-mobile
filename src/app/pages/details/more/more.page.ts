import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  pageType: any;
  brokenlinksCount: number;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.tempService.dashboardParams) {
      this.brokenlinksCount = this.tempService.brokenLinksCount;
      this.activateRoute.queryParams.subscribe((params) => {
        if (params) {
          if (params.pageName === 'expire') {
            this.pageType = 2;
          } else  {
            this.pageType = 1;
          }
        } else {
          this.pageType = 1; 
        }
      });
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  changePageType(value) {
    this.pageType = value;
  }
  
  openFeedback() {
    this.generalSerive.openFeedback();
  }
}
