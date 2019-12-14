import { Component, OnInit } from '@angular/core';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { ModalController } from '@ionic/angular';
import { OtherService } from './../../../serverAPI/other/other.service';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  pageName: any;
  pageContent: any;
  constructor(
    private modalCtrl: ModalController,
    private otherService: OtherService,
    private ionService: IongagetService
  ) { 
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
      this.otherService.getPrivacyPolicy().subscribe((result) => {
        if (result['RESPONSECODE'] ===  1) {
          this.pageName = result['data'][0].page_name;
          this.pageContent = result['data'][0].content;
          let doc = document.getElementById('content') as HTMLElement;
          doc.innerHTML = this.pageContent;
        } else {
          this.ionService.showAlert('Fetching Data Failed', result['RESPONSE']);
          this.dismiss();
        }
      }, err => {
        this.ionService.showAlert('Fetching Data Failed', 'Server API Problem');
        this.dismiss();
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
