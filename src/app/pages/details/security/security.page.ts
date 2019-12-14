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
  slideOpts = {
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,
    slideToClickedSlide: true
  }
  pageType: number;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private generalSerive: GeneralService,
    private tempService: TempService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    
  }
  
  ionViewWillEnter() {

  }
  
  openFeedback() {
    this.generalSerive.openFeedback();
  }

  switchPages(event) {
    this.slides.getActiveIndex().then(result => {
      console.log(result);
      this.pageType = result%3;
      this.cdr.detectChanges();
    })
  }
}
