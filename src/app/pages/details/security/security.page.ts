import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  pageType = 1;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if ( !this.tempService.dashboardParams) {
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }
  }
  
  openFeedback() {
    this.generalSerive.openFeedback();
  }

  switchPages(event) {
    this.pageType = parseInt(event.target.value);
  }
}
