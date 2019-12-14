import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

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
  ) { 
  }
  
  ngOnInit() {
  }

  getback() {
    this.router.navigate(['subscription'], { queryParams: {
      newUser: true
    } });
  }

  addSite() {
    this.router.navigate(['add-site']);
  }

  upgrade() {
    this.router.navigate(['subscription']);
  }

  cancelMembership() {
    this.router.navigate(['cancel-membership']);
  }

}
