import { TempService } from './../../../services/temp/temp.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ReportService } from './../../../serverAPI/report/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { DomainService } from './../../../serverAPI/domain/domain.service';


@Component({
  selector: 'app-domain-scan',
  templateUrl: './domain-scan.page.html',
  styleUrls: ['./domain-scan.page.scss'],
})
export class DomainScanPage implements OnInit {
  userID: any;
  action: any;
  token: any;
  domainName: any;
  percentage = 0;
  completed = false;
  loading: any;
  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ga: GoogleAnalytics,
    private reportAPI: ReportService,
    private ionService: IongagetService,
    private domainAPI: DomainService,
    private tempService: TempService
    ) {
      this.initData();
    }

  ngOnInit() {
    setInterval(() => {
      if (this.percentage >= 99) {
        return;
      } else {
        this.percentage = this.percentage + 1;
      }
    }, 1500);
  }

  initData() {
    this.ga.startTrackerWithId('UA-131219006-1') .then(() => {
      this.ga.trackView('Home');
    }).catch(e => console.log('Error starting GoogleAnalytics', e));

    this.storage.get('userInfo').then((user) => {
      console.log(user);
      if ( user ) {
        this.userID = user.id;
        this.token = user.token;
        this.activatedRoute.queryParams.subscribe(params => {
          if (params) {
            if (params.action === 'addDomain') {
              this.domainName = params.domainName;
              this.generateReport(user.id, user.token);
            } else if (params.action === 'manual-scan') {
              const domainName = this.tempService.dashboardParams.domainName;
              const domainUserID = this.tempService.dashboardParams.domainUserID;
              this.manualScan(domainName, domainUserID);
            }
          }
        });
      }
    });
  }

  generateReport(userID, token) {
    this.reportAPI.generateReport(this.domainName, userID, token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] ===  1) {
        this.percentage = 100;
        this.completed = true;
        setTimeout(() => {
          this.router.navigate(['domain-list'], { replaceUrl: true });
        }, 2000);
      } else {
        this.ionService.presentToast(result['RESPONSE']);
        this.deleteDomain();
      }
    }, err => {
      this.ionService.presentToast('Server API Problem');
      this.deleteDomain();
    });
  }

  manualScan(domainName, domainUserID) { 
    this.reportAPI.manualScan(domainName, domainUserID, this.userID, this.token).subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] === 1) {
        this.percentage = 100;
        this.completed = true;
        setTimeout(() => {
          this.router.navigateByUrl('tabs/seo', { replaceUrl: true });
        }, 2000);
      } else {
        this.ionService.presentToast(result['RESPONSE']);
        setTimeout(() => {
          this.router.navigateByUrl('tabs/seo', { replaceUrl: true });
        }, 2000);
      }
    }, err => {
      this.ionService.presentToast('Server API Problem');
      setTimeout(() => {
        this.router.navigateByUrl('tabs/seo', { replaceUrl: true });
      }, 2000);
    });
  }

  deleteDomain() {
    this.ionService.showLoading();
    this.domainAPI.deleteDomain(this.domainName, this.userID, this.token).subscribe((result) => {
      console.log(result);
      this.ionService.closeLoading();
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }, err => {
      console.log(err);
      this.ionService.closeLoading();
      this.router.navigate(['domain-list'], { replaceUrl: true });
    });
  }
}
