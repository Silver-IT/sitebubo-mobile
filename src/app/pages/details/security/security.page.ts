import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  pageType: number;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    alert('security page');
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.notification) {
        alert(JSON.stringify(this.tempService.dashboardParams));
        this.pageType = this.tempService.dashboardParams.pageType;
      } else {
        this.pageType = 1;
      }
    });
    // if ( !this.tempService.dashboardParams) {
    //   this.router.navigate(['domain-list'], { replaceUrl: true });
    // } else {
    //   alert(JSON.stringify(this.tempService.dashboardParams));
    //   if (this.tempService.dashboardParams.pageType) {
    //     this.pageType = this.tempService.dashboardParams.pageType;
    //   } else {
    //     this.pageType = 1;
    //   }
    // }
  }

  ionViewWillEnter() {
    alert('security VIEW page');
  }
  
  openFeedback() {
    this.generalSerive.openFeedback();
  }

  switchPages(event) {
    this.pageType = parseInt(event.target.value);
  }
}
