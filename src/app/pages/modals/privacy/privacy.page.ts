import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { OtherApiService } from 'src/app/apis/other/other-api.service';

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
    private otherService: OtherApiService,
    private ionService: IongadgetService
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
      this.otherService.getPrivacyPolicy().subscribe((result) => {
        if (result.RESPONSECODE ===  1) {
          this.pageName = result.data[0].page_name;
          this.pageContent = result.data[0].content;
          const doc = document.getElementById('content') as HTMLElement;
          doc.innerHTML = this.pageContent;
        } else {
          this.ionService.showAlert('Fetching Data Failed', result.RESPONSE);
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
