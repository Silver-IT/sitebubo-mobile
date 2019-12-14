import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-first-free',
  templateUrl: './first-free.component.html',
  styleUrls: ['./first-free.component.scss'],
})
export class FirstFreeComponent implements OnInit {
  @Input() details: any;
  constructor(
    private router: Router,
    private events: Events,
    private storage: Storage
  ) { }

  ngOnInit() {

  }

  addDomain() {
    this.router.navigate(['add-site']);
  }

  changePlan() {
    this.router.navigate(['subscription'], { replaceUrl: true, queryParams: {
      newUser: true
    } });
  }
}
