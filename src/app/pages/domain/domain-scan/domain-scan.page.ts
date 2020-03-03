import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// services
import { TempService } from './../../../services/temp/temp.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { delay, takeUntil, concatMap } from 'rxjs/operators';
import { IntparsePipe } from 'src/app/pipes/intparse/intparse.pipe';

@Component({
  selector: 'app-domain-scan',
  templateUrl: './domain-scan.page.html',
  styleUrls: ['./domain-scan.page.scss'],
  providers: [IntparsePipe]
})
export class DomainScanPage implements OnInit, OnDestroy {
  @ViewChild('results', { static: false }) results: ElementRef<any>;
  userID: number;
  planID: number;
  action: any;
  token: any;
  domainName: any;
  percentage = 0;
  progresShow = 0;  completed = false;
  tempResult: any;
  status = {
    started: false,
    process: false,
    finished: false
  };
  pushes = [];
  currentMonitor: string;
  title: string;
  private dataStream: Subject<any> = new Subject();
  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tempService: TempService,
    private admobservice: AdmobService,
    private socketService: SocketService,
    private backgroundmode: BackgroundMode,
    private intparse: IntparsePipe
    ) {
      this.admobservice.removeBanner();
      this.backgroundmode.enable();
      this.initData();
    }

  ngOnInit() {
    this.fnHandler = this.fnHandler.bind(this);
    this.dataStream.pipe(
      takeUntil(this.unsubscribeAll),
      concatMap(x => {
        if (x.monitor === 'Web Site Scanning' && x.status === 'Started') {
          return of(x);
        } else {
          return of(x).pipe(
            concatMap((data) => of(data).pipe(delay(2500)))
          );
        }
      })
    ).subscribe(data => {
      if (data.monitor === 'Web Site Scanning' && data.status === 'Finished') {
        this.tempResult = data;
        setTimeout(() => {
          this.defineRoutering();
        }, 1500);
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
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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
            console.log(params);
            this.action = params.action;
            if (params.action === 'addDomain') {
              const parameter = {
                user_id: this.userID,
                domain_name: params.domainName,
                domain_id: parseInt(params.domain_id, 10)
              };
              this.title = 'Web Scan';
              this.domainName = params.domainName;
              this.startWebSocket(parameter, 'full-scan');
            } else {
              const parameter = {
                user_id: this.userID,
                domain_name: this.tempService.dashboardParams.domainName,
                domain_id: this.tempService.dashboardParams.domainID
              };
              this.domainName = this.tempService.dashboardParams.domainName;
              if (params.action === 'seo-scan') {
                this.title = 'SEO Scan';
                this.startWebSocket(parameter, 'seo-scan');
              } else if (params.action === 'speed-scan') {
                this.title = 'Speed Scan';
                this.startWebSocket(parameter, 'speed-scan');
              } else if (params.action === 'security-scan') {
                this.title = 'Security Scan';
                this.startWebSocket(parameter, 'security-scan');
              }
            }
          }
        });
      }
    });
  }

  doTricksWithUI(data) {
    console.log(data);
    if (data.status === 'Started') {
      this.currentMonitor = data.monitor;
      this.changelabelOfCurrentMonitor();
    } else {
      let interval: number;
      if (this.action === 'addDomain') {
        interval = 0.1;
      } else if (this.action === 'security-scan') {
        interval = 1;
      } else if (this.action === 'speed-scan') {
        interval = 0.3333;
      } else if (this.action === 'seo-scan') {
        interval = 0.3333;
      }
      this.percentage  = this.percentage + interval;
      this.progresShow = this.intparse.transform(this.percentage * 100);
      this.addNewMonitor();
    }
  }

  changelabelOfCurrentMonitor() {
    setTimeout(() => {
      this.tempResult.status = 'in Progress';
    }, 1000);
  }

  addNewMonitor() {
    let ele = `<div class='special'><ion-label class="slide-in-bottom">${ this.tempResult.monitor } ... ${ this.tempResult.result }`;
    ele += `</ion-label>`;
    ele += `<svg  xmlns="http://www.w3.org/2000/svg" class="check" width="166" height="151" viewBox="0 0 166 150.9">`;
    ele += `<path d="M0.3 96l62.4 54.1L165.6 0.3"/></svg></div>`;
    this.results.nativeElement.insertAdjacentHTML('beforeend', ele);
  }

  fnHandler(data) {
    this.dataStream.next(data);
  }

  startWebSocket(parameter, action) {
    if (action === 'full-scan') {
      this.socketService.defineEventHandlers('web-scanning', this.fnHandler);
      this.socketService.websiteScan(parameter);
    } else if (action === 'security-scan') {
      this.socketService.emitSecurityScan(parameter, this.fnHandler);
    } else if (action === 'seo-scan') {
      this.socketService.emitSeoScanning(parameter, this.fnHandler);
    } else if (action === 'speed-scan') {
      this.socketService.emitPageSpeed(parameter, this.fnHandler);
    }
  }

  defineRoutering() {
    this.completed = true;
    let route: string;
    if (this.action === 'addDomain') {
      route = 'domain-list';
    } else if (this.action === 'speed-scan') {
      route = 'tabs/speed';
    } else if (this.action === 'security-scan') {
      route = 'tabs/security';
    } else if (this.action === 'seo-scan') {
      route = 'tabs/seo';
    }
    if (this.planID === 1) {
      this.admobservice.showInterstitial().then(() => {
        setTimeout(() => {
          this.router.navigate([route], { replaceUrl: true, queryParams: { reload: true } });
        }, 2000);
      });
    } else {
      setTimeout(() => {
        this.router.navigate([route], { replaceUrl: true, queryParams: { reload: true } });
      }, 2000);
    }
  }

  // deleteDomain() {
  //   this.ionService.showLoading();
  //   this.domainAPI.deleteDomain(this.domainName, this.userID, this.token).subscribe((result) => {
  //     this.ionService.closeLoading();
  //     this.router.navigate(['domain-list'], { replaceUrl: true });
  //   }, err => {
  //     console.log(err);
  //     this.ionService.closeLoading();
  //     this.router.navigate(['domain-list'], { replaceUrl: true });
  //   });
  // }

  // generateReport() {
    //   this.reportAPI.generateReport(this.domainName, this.userID, this.token).subscribe((result) => {
      //     if (result.RESPONSECODE ===  1) {
  //       this.percentage = 100;
  //       this.completed = true;
  //     } else {
  //       this.ionService.presentToast(result.RESPONSE);
  //       this.deleteDomain();
  //     }
  //   }, err => {
  //     this.ionService.presentToast('Server API Problem');
  //     this.deleteDomain();
  //   });
  // }

  // manualScan() {
  //   this.reportAPI.
  //   manualScan(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID, this.userID, this.token)
  //   .subscribe((result) => {
  //     if (result.RESPONSECODE === 1) {
  //       this.percentage = 100;
  //       this.completed = true;
  //       if (this.planID === 1) {
  //         this.admobservice.showInterstitial().then((res) => {
  //           if (res) {
  //             setTimeout(() => {
  //               this.router.navigate(['tabs/seo'], { replaceUrl: true, queryParams: { reload: true } });
  //             }, 2000);
  //           }
  //         });
  //       } else {
  //         setTimeout(() => {
  //           this.router.navigate(['tabs/seo'], { replaceUrl: true, queryParams: { reload: true } });
  //         }, 2000);
  //       }
  //     } else {
  //       this.ionService.presentToast(result.RESPONSE);
  //       setTimeout(() => {
  //         this.router.navigate(['tabs/seo'], { replaceUrl: true });
  //       }, 2000);
  //     }
  //   }, err => {
  //     this.ionService.presentToast('Server API Problem');
  //     setTimeout(() => {
  //       this.router.navigate(['tabs/seo'], { replaceUrl: true });
  //     }, 2000);
  //   });
  // }

}
