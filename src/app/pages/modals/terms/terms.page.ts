import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { ModalController, NavParams } from '@ionic/angular';
import { OtherService } from './../../../serverAPI/other/other.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  pageName: any;
  pageContent: any;
  newTerms: boolean;
  constructor(
    private modalCtrl: ModalController,
    private otherService: OtherService,
    private ionService: IongagetService,
    private navParams: NavParams,
    private storage: Storage,
    private router: Router
  ) {
    this.getData();
   }

  ngOnInit() {
    this.newTerms = this.navParams.get('newTerm');
    if (this.newTerms) {
      this.ionService.presentToast('Terms and Condtions got updated');
    }
  }

  getData() {
    this.otherService.getTermsConditions().subscribe((result) => {
      console.log(result);
      if (result['RESPONSECODE'] ===  1) {
        this.pageName = result['data'][0].page_name;
        this.pageContent = result['data'][0].content;
        let doc = document.getElementById('content') as HTMLElement;
        doc.innerHTML = this.pageContent;
      } else {
        this.dismiss();
        this.ionService.showAlert('Fetching Data Failed', result['RESPONSE']);
      }
    }, err => {
      this.dismiss();
      this.ionService.showAlert('Fetching Data Failed', 'Server API Problem');
    });
  }

  agreeTerms() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.ionService.showLoading();
        this.otherService.agreeOnTerms(user.id, user.token).subscribe((result) => {
          this.ionService.closeLoading();
          if (result['RESPONSECODE'] === 1) {
            this.modalCtrl.dismiss();
          } else {
            this.ionService.presentToast('Agreement Failed. Please try again');
          }
        });
      }
    })
  }

  dismiss() {
    if (this.newTerms) {
     this.ionService.presentToast('The terms and conditions are launched until you agree on it');
     this.modalCtrl.dismiss().then(() => {
       this.router.navigate(['welcome'], { replaceUrl: true });
     });
    } else {
      this.modalCtrl.dismiss();
    } 
  }

}
