import { Component, OnInit } from '@angular/core';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { AuthService } from './../../../serverAPI/auth/auth.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-verifymail',
  templateUrl: './verifymail.page.html',
  styleUrls: ['./verifymail.page.scss'],
})
export class VerifymailPage implements OnInit {
  afterVerified: string;
  beforeVerified: string;
  loading: any;
  message: string;
  imgsrc = '/assets/imgs/checkmark.png';
  navparams: any;
  userID: number;
  token: string;
  constructor(
    private ga: GoogleAnalytics,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ionService: IongagetService,
    private authService: AuthService
  ) {
    this.initData();
   }

  ngOnInit() {
  }

  initData() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.navparams = params;
      const id = this.navparams.id;
      const code = this.navparams.code;
      if (params.id) {
        this.ionService.showLoading();
        this.afterVerified = 'showdiv';
        this.beforeVerified = 'hidediv';
        this.authService.validateEmail(params.id, params.code).subscribe( (data) => {
          this.ionService.closeLoading();
          if (data.RESPONSECODE === 1) {
              this.message = 'Your email is verified successfully <br/> Please click on Login to proceed further';
          } else {
              this.message = 'Your email verification is unsuccessful';
          }
        }, err => {
            console.log(err);
            this.ga.trackException(err, false);
            this.ionService.closeLoading();
        }, () => console.log(''));
      } else {
        this.beforeVerified = 'showdiv';
        this.afterVerified = 'hidediv';
        if (params.userID) {
          this.userID = parseInt(params.userID);
          this.token = params.token; 
        }
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }

  resendVerificationEmail() {
    this.ionService.showLoading();
    this.authService.resendEmail(this.userID).subscribe((result) => {
      this.ionService.closeLoading();
      if (result['RESPONSECODE'] === 1) {
        this.ionService.presentToast('Resent verification email successfully');
      } else {
        this.ionService.presentToast('Something might be wrong with server api');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Failed due to server api problem. Sorry');
    });
  }

}
