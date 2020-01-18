import { Events } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TempService } from './../../../services/temp/temp.service';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
@Component({
  selector: 'app-seo',
  templateUrl: './seo.page.html',
  styleUrls: ['./seo.page.scss'],
})
export class SeoPage implements OnInit {
  slideOpts = {
    slidesPerView: 3,
    slideToClickedSlide: true
  };
  pageType = 1;
  manualAlerts: number;
  reportDetails: any;
  totalAvailableScanCount: number;
  scannedCount: number;
  constructor(
    private generalSerive: GeneralService,
    private cdr: ChangeDetectorRef,
    private tempService: TempService,
    private router: Router,
    private events: Events,
    private ionService: IongadgetService,
  ) { }

  ngOnInit() {
    this.listenEvents();
    if (this.tempService.dashboardParams) {
      this.getReportDetails();
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  listenEvents() {
    this.events.subscribe('reloadresult', () => {
      this.getReportDetails();
    });
  }

  getReportDetails() {
    this.generalSerive.getReportDetails().then((result) => {
      this.manualAlerts = result.seonegative_secore;
      this.reportDetails = result;
      this.totalAvailableScanCount = result.totalscan;
      this.scannedCount = result.scanfinished;
      this.cdr.detectChanges();
    });
  }

  switchPages(event) {
    // tslint:disable-next-line: radix
    this.pageType = parseInt(event.target.value);
    if (this.pageType === 2 ) {
      this.launchIssues('seo', 0);
    }
    this.cdr.detectChanges();
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }

  launchIssues(reportName, factorNum) {
    this.generalSerive.openMonitorIssues(reportName, factorNum).then((result) => {
      this.pageType = 1;
      this.cdr.detectChanges();
    });
  }

  manualScan() {
    if (this.scannedCount >= this.totalAvailableScanCount) {
      this.ionService.presentToast('You have reached your limit of ' + this.totalAvailableScanCount + ' manual scans for this month.');
    } else {
      this.generalSerive.confirmManualScan(this.totalAvailableScanCount, this.scannedCount).then(res => {
        if (res) {
          const params: NavigationExtras = {
            queryParams: {
              action: 'manual-scan'
            }
          };
          this.router.navigate(['domain-scan'], params);
        }
      });
    }
  }
}
