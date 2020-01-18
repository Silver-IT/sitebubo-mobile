import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pall-done',
  templateUrl: './pall-done.component.html',
  styleUrls: ['./pall-done.component.scss'],
})
export class PallDoneComponent implements OnInit {
  title: string;
  content: string;
  constructor(
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.title = this.navParams.get('title').trim();
    this.content = this.navParams.get('content');
    console.log(this.content);
  }

  ionViewDidEnter() {
   document.querySelector('.content p').classList.add('description');
  }
}
