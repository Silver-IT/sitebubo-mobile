import { TempService } from './../../../services/temp/temp.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ReportService } from './../../../serverAPI/report/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { DomainService } from './../../../serverAPI/domain/domain.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-domain-scan',
  templateUrl: './domain-scan.page.html',
  styleUrls: ['./domain-scan.page.scss'],
})
export class DomainScanPage implements OnInit {
  userID: number;
  planID: number;
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
    private tempService: TempService,
    private admobservice: AdmobService,
    private socket: SocketService
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
    // this.ga.startTrackerWithId('UA-131219006-1') .then(() => {
    //   this.ga.trackView('Home');
    // }).catch(e => console.log('Error starting GoogleAnalytics', e));

    this.storage.get('userInfo').then((user) => {
      if ( user ) {
        this.userID = user.id;
        this.token = user.token;
        this.storage.get('planInfo').then((info) => {
          this.planID = info.id;
        });
        this.activatedRoute.queryParams.subscribe(params => {
          if (params) {
            const parameter = {
              user_id: this.userID,
              domain_name: this.tempService.dashboardParams.domainName,
              domain_id: this.tempService.dashboardParams.domainID
            };
            if (params.action === 'addDomain') {
              this.domainName = params.domainName;
              this.startWebSocket(parameter, 'generate');
            } else if (params.action === 'manual-scan') {
              this.startWebSocket(parameter, 'manual');
            }
          }
        });
      }
    });
  }

  startWebSocket(parameter, action) {
    // this.socket.websiteScan(parameter).then((res) => {
    //   if (res) {
        if (action === 'generate') {
          this.generateReport();
        } else if (action === 'manual') {
          this.manualScan();
        }
    //   }
    // });
  }

  generateReport() {
    this.reportAPI.generateReport(this.domainName, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] ===  1) {
        this.percentage = 100;
        this.completed = true;
        if (this.planID === 1) {
          this.admobservice.showInterstitial().then((result) => {
            if (result) {
              setTimeout(() => {
                this.router.navigate(['domain-list'], { replaceUrl: true });
              }, 2000);
            }
          });
        } else {
          setTimeout(() => {
            this.router.navigate(['domain-list'], { replaceUrl: true });
          }, 2000);
        } 
      } else {
        this.ionService.presentToast(result['RESPONSE']);
        this.deleteDomain();
      }
    }, err => {
      this.ionService.presentToast('Server API Problem');
      this.deleteDomain();
    });
  }

  manualScan() {
    this.reportAPI.manualScan(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.percentage = 100;
        this.completed = true;
        if (this.planID === 1) { 
          this.admobservice.showInterstitial().then((result) => {
            if (result) {
              setTimeout(() => {
                this.router.navigate(['tabs/seo'], { replaceUrl: true, queryParams: { reload: true } });
              }, 2000);
            }
          })
        } else {
          setTimeout(() => {
            this.router.navigate(['tabs/seo'], { replaceUrl: true, queryParams: { reload: true } });
          }, 2000);
        }
      } else {
        this.ionService.presentToast(result['RESPONSE']);
        setTimeout(() => {
          this.router.navigate(['tabs/seo'], { replaceUrl: true });
        }, 2000);
      }
    }, err => {
      this.ionService.presentToast('Server API Problem');
      setTimeout(() => {
        this.router.navigate(['tabs/seo'], { replaceUrl: true });
      }, 2000);
    });
  }

  deleteDomain() {
    this.ionService.showLoading();
    this.domainAPI.deleteDomain(this.domainName, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      this.router.navigate(['domain-list'], { replaceUrl: true });
    }, err => {
      console.log(err);
      this.ionService.closeLoading();
      this.router.navigate(['domain-list'], { replaceUrl: true });
    });
  }
}
