import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { OtherApiService } from 'src/app/apis/other/other-api.service';

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
    private otherService: OtherApiService,
    private ionService: IongadgetService,
    private navParams: NavParams,
    private storage: Storage,
    private router: Router
  ) {
    this.getData();
   }

  ngOnInit() {
    this.newTerms = this.navParams.get('newTerm');
    if (this.newTerms) {
      this.ionService.presentToast('Please accept the updated Terms');
    }
  }

  getData() {
    this.otherService.getTermsConditions().subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE ===  1) {
        this.pageName = result.data[0].page_name;
        this.pageContent = result.data[0].content;
        const doc = document.getElementById('content') as HTMLElement;
        doc.innerHTML = this.pageContent;
      } else {
        this.dismiss();
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.dismiss();
      this.ionService.presentToast('Server API Problem');
    });
  }

  agreeTerms() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.ionService.showLoading();
        this.otherService.agreeOnTerms(user.id, user.token).subscribe((result) => {
          this.ionService.closeLoading();
          if (result.RESPONSECODE === 1) {
            this.modalCtrl.dismiss();
          } else {
            this.ionService.presentToast('Agreement Failed. Please try again');
          }
        });
      }
    });
  }

  dismiss() {
    if (this.newTerms) {
     this.ionService.presentToast('You must accept the Terms to continue using this app');
     this.modalCtrl.dismiss().then(() => {
       this.router.navigate(['welcome'], { replaceUrl: true });
     });
    } else {
      this.modalCtrl.dismiss();
    }
  }
}
