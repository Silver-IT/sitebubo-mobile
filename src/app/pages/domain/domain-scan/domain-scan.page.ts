import { TempService } from './../../../services/temp/temp.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ReportService } from './../../../serverAPI/report/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { DomainService } from './../../../serverAPI/domain/domain.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { IonSlides, IonSlide, Events } from '@ionic/angular';
import { delay, takeUntil, timeout, concatMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';



@Component({
  selector: 'app-domain-scan',
  templateUrl: './domain-scan.page.html',
  styleUrls: ['./domain-scan.page.scss'],
})
export class DomainScanPage implements OnInit, OnDestroy {
  @ViewChild('temp', { static: false }) temp: HTMLElement;
  @ViewChild('results', { static: false }) results: HTMLElement;
  userID: number;
  planID: number;
  action: any;
  token: any;
  domainName: any;
  percentage = 0;
  completed = false;
  tempResult: any;
  status = {
    started: false,
    process: false,
    finished: false
  };
  pushes = [];
  private dataStream: Subject<any> = new Subject();
  private _unsubscribeAll: Subject<any> = new Subject();

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
    private socketService: SocketService,
    ) {
      this.initData();
    }

  ngOnInit() {
    this.fnHandler = this.fnHandler.bind(this);
    this.dataStream.pipe(
      takeUntil(this._unsubscribeAll),
      concatMap((data) => of(data).pipe(delay(1500)))
    ).subscribe(data => {
      if (data.monitor === 'Web Site Scanning' && data.status === 'Finished') {
        this.tempResult = data;
        setTimeout(() => {
          this.defineRoutering();
        }, 2000);
      } else {
        this.tempResult = data;
        if (data.monitor === 'Web Site Scanning' && data.status === 'Started' ) {
         this.status.started = true; 
        } else {
          this.status.process = true;
          this.doTricksWithUI(data);
        }
      }
    });
  }

  ngOnDestroy() {
    this.socketService.removeHandler('web-scanning');
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initData() {
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
            this.action = params.action;
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

  doTricksWithUI(data) {
    if (data.status === 'Started') {
      this.changelabelOfCurrentMonitor();
    } else if (data.status === 'Finished') {
      this.addNewMonitor();
    }
  }

  changelabelOfCurrentMonitor() {
    setTimeout(() => {
      this.tempResult.status = 'in Progress';
    }, 1000)
  }

  addNewMonitor() {
    console.log(this.results);
    const ele = `<div class='special'><ion-label class="slide-in-bottom">${ this.tempResult.monitor } ... ${ this.tempResult.result }</ion-label><svg  xmlns="http://www.w3.org/2000/svg" class="check" width="166" height="151" viewBox="0 0 166 150.9"><path d="M0.3 96l62.4 54.1L165.6 0.3"/></svg></div>`;
    this.results['nativeElement'].insertAdjacentHTML('beforeend', ele);
  }

  fnHandler(data) {
    console.log(data);
    this.dataStream.next(data);
  }

  startWebSocket(parameter, action) {
    this.socketService.defineEventHandlers('web-scanning', this.fnHandler);
    this.socketService.websiteScan(parameter);
  }

  defineRoutering() {
    let route: string;
    if (this.action === 'addDomain') {
      route = 'domain-list';
    } else if (this.action === 'manual-scan') {
      route = 'tabs/seo';
    }
    if (this.planID === 1) {
      this.admobservice.showInterstitial().then((result) => {
        if (result) {
          setTimeout(() => {
            this.router.navigate([route], { replaceUrl: true });
          }, 2000);
        }
      });
    } else {
      setTimeout(() => {
        this.router.navigate([route], { replaceUrl: true });
      }, 2000);
    } 
  }

  generateReport() {
    this.reportAPI.generateReport(this.domainName, this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] ===  1) {
        this.percentage = 100;
        this.completed = true;
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
