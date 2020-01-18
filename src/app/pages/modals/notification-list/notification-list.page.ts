import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage implements OnInit {
  notifications = [];
  showData = [];
  filterType: number;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.notifications = this.navParams.get('notifications');
    this.filterType = 2;
    this.defineShowData().then((result) => {
      this.showData = result;
    });
  }

  changeFilterType(event) {
    this.filterType = parseInt(event.target.value, 10);
    this.defineShowData().then((result) => {
      this.showData = result;
    });
  }

  async defineShowData(): Promise<any> {
    return new Promise((resolve) => {
      let showData = [];
      if (this.filterType === 1) {
        showData = this.notifications;
      } else if (this.filterType === 2) {
        this.notifications.forEach(element => {
          if (element.view) {
            console.log(element.view);
            showData.push(element);
          }
        });
      } else {
        this.notifications.forEach(element => {
          if (!element.view) {
            console.log(element.view);
            showData.push(element);
          }
        });
      }
      resolve(showData);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
