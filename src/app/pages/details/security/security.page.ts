import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.notification) {
        this.pageType = this.tempService.dashboardParams.pageType;
      } else {
        this.pageType = 1;
      }
    });
  }

  openFeedback() {
    this.generalSerive.openFeedback();
  }

  switchPages(event) {
    // tslint:disable-next-line: radix
    this.pageType = parseInt(event.target.value);
  }
}
