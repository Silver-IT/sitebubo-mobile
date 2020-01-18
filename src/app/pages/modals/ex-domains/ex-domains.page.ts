import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, IonButton } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { DomainApiService } from 'src/app/apis/domain/domain-api.service';

@Component({
  selector: 'app-ex-domains',
  templateUrl: './ex-domains.page.html',
  styleUrls: ['./ex-domains.page.scss'],
})
export class ExDomainsPage implements OnInit {
  userID: any;
  token: any;
  domains = [];
  currentPlan: string;
  newPlan: string;
  allowedCnt: number;
  cancel: boolean;
  single = 'domain';
  deleteIndexes = [];
  feedback = '';
  daysLeft: number;
  @ViewChild('downgrade', { static: false }) downgrade: IonButton;
  @ViewChild('confirm', { static: false }) confirm: ElementRef<any>;
  constructor(
    private modalCtrl: ModalController,
    private ionService: IongadgetService,
    private domainAPI: DomainApiService,
    private storage: Storage,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.initData();
    this.getExsitingDomains().then((result) => {
      if (result) {
        let temp = []; temp = result;
        this.domains = temp;
        console.log(result);
      }
    }).catch(err => {

    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
    this.storage.get('planInfo').then((info) => {
      this.daysLeft = info.days_left;
    });
    this.currentPlan = this.navParams.get('currentPlan');
    this.newPlan = this.navParams.get('selectedPlan');
    this.allowedCnt = this.navParams.get('allowedCnt');
    this.cancel = this.navParams.get('reason');
    if (this.allowedCnt > 1) {
      this.single = 'domains';
    }
  }

  getExsitingDomains(): any {
    return new Promise((resolve, reject) => {
      this.ionService.showLoading();
      this.storage.get('userInfo').then((user) => {
        this.domainAPI.getDomainList(user.id, user.token).subscribe((result) => {
          this.ionService.closeLoading();
          if (result.RESPONSECODE === 1) {
            if (result.data) {
              let temp = []; const final = [];
              temp = result.data;
              temp.forEach((element) => {
                if (element.user_id === user.id) {
                  final.push(element);
                }
              });
              resolve(final);
            }
          } else {
              this.ionService.presentToast(result.RESPONSE);
              reject(null);
          }
        }, err => {
          this.ionService.closeLoading();
          this.ionService.showAlert('Error from Server', 'Unable to call Server API');
          reject(err);
        });
      });
    });
  }

  getValues(index, event) {
    if (event.detail.checked === true) {
      this.domains[index].checked = true;
    } else {
      this.domains[index].checked = false;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  deleteDomains() {
    this.sunUpDomains().then((result) => {
      console.log(result);
      if ((this.domains.length - result.length) > this.allowedCnt) {
        // this.ionService.closeLoading();
        this.ionService.presentToast('You are allowed to have ' + this.allowedCnt + ' domains on this plan');
        return;
      } else {
        const params = {
          domains: result,
          feedback: this.feedback
        };
        this.modalCtrl.dismiss(params, 'success');
      }
    });
  }

  sunUpDomains(): any {
    return new Promise((resolve, reject) => {
      const temp = [];
      if (this.domains) {
        this.domains.forEach(element => {
          if (!element.checked) {
            temp.push(element.domain_name);
          }
        });
      }
      resolve(temp);
    });
  }

  changeStyle(event) {
    console.log(this.downgrade);
    if (event) {
      // tslint:disable-next-line: no-string-literal
      this.downgrade['el'].classList.remove('downgrade-enter');
      // tslint:disable-next-line: no-string-literal
      this.downgrade['el'].classList.add('downgrade-exit');
      this.confirm.nativeElement.classList.add('downgrade-enter');
      this.confirm.nativeElement.classList.remove('downgrade-exit');
      this.confirm.nativeElement.classList.remove('hide');
    } else  {
      this.confirm.nativeElement.classList.remove('downgrade-enter');
      this.confirm.nativeElement.classList.add('downgrade-exit');
      // tslint:disable-next-line: no-string-literal
      this.downgrade['el'].classList.remove('downgrade-exit');
      // tslint:disable-next-line: no-string-literal
      this.downgrade['el'].classList.add('downgrade-enter');
    }
  }
}
