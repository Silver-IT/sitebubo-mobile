import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feeback-success',
  templateUrl: './feeback-success.page.html',
  styleUrls: ['./feeback-success.page.scss'],
})
export class FeebackSuccessPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
