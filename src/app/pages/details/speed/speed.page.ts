import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router } from '@angular/router';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.page.html',
  styleUrls: ['./speed.page.scss'],
})
export class SpeedPage implements OnInit {
  domainName: string;
  domainUserID: number;
  pageType = 1;
  mobileAlert: number;
  desktopAlert: number;
  reportDetails: any;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private cdr: ChangeDetectorRef,
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
      this.reportDetails = result;
      this.mobileAlert = result.mobilenegative_secore;
      this.desktopAlert = result.desktopnegative_secore;
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
}
