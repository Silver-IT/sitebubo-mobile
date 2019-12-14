import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-done',
  templateUrl: './all-done.component.html',
  styleUrls: ['./all-done.component.scss'],
})
export class AllDoneComponent implements OnInit {
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

  ionViewDidEnter(){
  
   document.querySelector('.content p').classList.add('description');
  }

}
