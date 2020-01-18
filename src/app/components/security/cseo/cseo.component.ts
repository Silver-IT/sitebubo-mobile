import { Component, OnInit, ChangeDetectorRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TempService } from './../../../services/temp/temp.service';
import { GeneralService } from './../../../services/generalComponents/general.service';

@Component({
  selector: 'app-cseo',
  templateUrl: './cseo.component.html',
  styleUrls: ['./cseo.component.scss'],
})
export class CseoComponent implements OnInit, OnChanges {
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
    private storage: Storage,
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
      console.log(this.seoData);
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

  seperateData(data): Promise<any> {
    return new Promise((resolve) => {
      let temp = [];
      const result = {
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
    this.statusNumber = parseInt(event, 10);
    if (event < 40) {
      this.statusString = 'Poor';
    } else if (event < 60) {
      this.statusString = 'Fair';
    } else if (event < 80) {
      this.statusString = 'Good';
    } else {
      this.statusString = 'Excellent';
    }
    this.cdr.detectChanges();
  }

  openFactors(reportName, factorNumber) {
    this.generalService.openMonitorIssues(reportName, factorNumber);
  }
}
