import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-success',
  templateUrl: './feedback-success.page.html',
  styleUrls: ['./feedback-success.page.scss'],
})
export class FeedbackSuccessPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
