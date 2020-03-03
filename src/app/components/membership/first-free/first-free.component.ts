import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-free',
  templateUrl: './first-free.component.html',
  styleUrls: ['./first-free.component.scss'],
})
export class FirstFreeComponent implements OnInit {
  @Input() details: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  addDomain() {
    this.router.navigate(['add-site']);
  }

  changePlan() {
    this.router.navigate(['plans'], { replaceUrl: true, queryParams: {
      newUser: true
    } });
  }
}
