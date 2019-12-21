import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-notification-pop',
  templateUrl: './notification-pop.component.html',
  styleUrls: ['./notification-pop.component.scss'],
})
export class NotificationPopComponent implements OnInit {
  details: any;
  constructor(
    private navparams: NavParams
  ) { }

  ngOnInit() {
    this.details = JSON.parse(this.navparams.get('pushData'));
  }

}
