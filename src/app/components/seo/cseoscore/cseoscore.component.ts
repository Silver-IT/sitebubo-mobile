import { Component, OnInit, ChangeDetectorRef, NgZone, Input, SimpleChanges } from '@angular/core';
import { MonitorService } from './../../../serverAPI/monitor/monitor.service';
import { Storage } from '@ionic/storage';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { TempService } from './../../../services/temp/temp.service';
import { GeneralService } from './../../../services/generalComponents/general.service';

@Component({
  selector: 'app-cseoscore',
  templateUrl: './cseoscore.component.html',
  styleUrls: ['./cseoscore.component.scss'],
})
export class CseoscoreComponent implements OnInit {
  @Input() pageType: any;
  @Input() reportDetails: any;
  userID: number;
  token: string;
  domainName: string;
  domainUserID: number;
  seoData: any;
  finalStatusNumber: number;
  statusNumber = 0;
  statusString = 'Unknown';

  positiveData: any;
  negativeData: any;
  constructor(
    private monitorAPI: MonitorService,
    private storage: Storage,
    private ionService: IongagetService,
    private tempService: TempService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.domainName = this.tempService.dashboardParams.domainName;
    this.domainUserID = this.tempService.dashboardParams.domainUserID;
    this.initData();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.reportDetails) {
      this.seoData = changes.reportDetails.currentValue;
    }
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
      }
    });
  }

  getDesktopReports() {
    this.monitorAPI.getDesktopReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID,this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.seperateData(result.data.desktopreport).then((result) => {
          console.log('DESKTOP:  ',result);
          this.positiveData = result.positive;
          this.negativeData = result.negative;
        });
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  getMobileReports() {
    this.monitorAPI.getMobileReport(this.tempService.dashboardParams.domainName, this.tempService.dashboardParams.domainUserID,this.userID, this.token).subscribe((result) => {
      if (result['RESPONSECODE'] === 1) {
        this.seperateData(result.data.mobilereport).then((result) => {
          console.log('MOBILE:  ',result);
          this.positiveData = result.positive;
          this.negativeData = result.negative;
        });
      } else {
        this.ionService.presentToast(result['RESPONSE']);
      }
    }, err => {
      this.ionService.presentToast('Error from server API');
    });
  }

  seperateData(data): Promise<any> {
    return new Promise((resolve, reject) => {
      let temp = [];
      let result = {
        negative: [],
        positive: []
      };
      temp = data;
      temp.forEach((element) => {
        if (element.status === 'success') {
          result.positive.push(element);
        } else {
          result.negative.push(element);
        }
      });
      resolve(result);
    });
  }

  onrender(event) {
    this.statusNumber = parseInt(event);
    if (event < 20) {
      this.statusString = 'Very Poor';
    } else if (event < 40){
      this.statusString = 'Poor';
    } else if (event < 60) {
      this.statusString = 'Fair';
    } else if (event < 80) {
      this.statusString = 'Good';
    } else {
      this.statusString = 'Great';
    }
    this.cdr.detectChanges();
  }

  openFactors(reportName, factorNumber) {
    this.generalService.openMonitorIssues(reportName, factorNumber);
  }
}