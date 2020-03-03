import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router } from '@angular/router';
import { IonSlides, Events} from '@ionic/angular';

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
    private events: Events
  ) { }

  ngOnInit() {
    this.events.subscribe('gotoDesktop', () => {
      this.pageType = 2;
    });
    this.events.subscribe('gotoMobile', () => {
      this.pageType = 3;
    });
    if (this.tempService.dashboardParams) {
      // this.getReportDetails();
      this.events.subscribe('mobileAlert', (alert) => {
        this.mobileAlert = alert;
      });
      this.events.subscribe('desktopAlert', (alert) => {
        this.desktopAlert = alert;
      });
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  switchPages(event) {
    this.pageType = parseInt(event.target.value, 10);
    this.cdr.detectChanges();
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }
}
