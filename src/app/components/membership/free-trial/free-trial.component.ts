import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-free-trial',
  templateUrl: './free-trial.component.html',
  styleUrls: ['./free-trial.component.scss'],
})
export class FreeTrialComponent implements OnInit {
  @Input() details: any;
  @Input() newUser: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  getback() {
    this.router.navigate(['plans'], { queryParams: {
      newUser: true
    } });
  }

  addSite() {
    this.router.navigate(['add-site']);
  }

  upgrade() {
    this.router.navigate(['plans']);
  }

  cancelMembership() {
    this.router.navigate(['cancel-membership']);
  }
}
