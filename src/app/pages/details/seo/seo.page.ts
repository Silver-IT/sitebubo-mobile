import { Events } from '@ionic/angular';
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
  };
  pageType = 1;
  constructor(
    private generalSerive: GeneralService,
    private cdr: ChangeDetectorRef,
    private tempService: TempService,
    private router: Router,
    private events: Events,
  ) { }

  ngOnInit() {
    this.listenEvents();
    if (this.tempService.dashboardParams) {
    } else {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }

  listenEvents() {
    this.events.subscribe('reloadresult', () => {
    });
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }
}
