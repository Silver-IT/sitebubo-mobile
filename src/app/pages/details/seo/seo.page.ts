import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TempService } from './../../../services/temp/temp.service';
import { GeneralService } from './../../../services/generalComponents/general.service';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.page.html',
  styleUrls: ['./seo.page.scss'],
})
export class SeoPage implements OnInit {
  slideOpts = {
    slidesPerView: 3,
    slideToClickedSlide: true
  }
  pageType = 1;
  manualAlerts: number;
  reportDetails: any;
  constructor(
    private generalSerive: GeneralService,
    private cdr: ChangeDetectorRef,
    private tempService: TempService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.tempService.dashboardParams) {
      this.getReportDetails();
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  getReportDetails() {
    this.generalSerive.getReportDetails().then((result) => {
      console.log(result);
      this.manualAlerts = result.seonegative_secore;
      this.reportDetails = result;
      this.cdr.detectChanges();
    });
  }

  switchPages(event) {
    this.pageType = parseInt(event.target.value);
    this.cdr.detectChanges();
  }
  
  openFeedback() {
    this.generalSerive.openFeedback();
  }

  launchIssues(reportName, factorNum) {
    this.generalSerive.openMonitorIssues(reportName, factorNum);
  }

  manualScan() {
    const params: NavigationExtras = {
      queryParams: {
        action: 'manual-scan'
      }
    }
    this.router.navigate(['domain-scan'], params);
  }
}
