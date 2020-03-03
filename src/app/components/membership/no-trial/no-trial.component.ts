import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-no-trial',
  templateUrl: './no-trial.component.html',
  styleUrls: ['./no-trial.component.scss'],
})
export class NoTrialComponent implements OnInit {
  @Input() details: any;
  @Input() newUser: any;
  constructor(
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {}

  changePlan() {
    this.router.navigate(['plans']);
  }

  cancelMemebership() {
    this.router.navigate(['cancel-membership']);
  }

  openInvoice() {
    this.iab.create(this.details.invoice_pdf, '_blank', 'closebuttoncaption=back');
  }

  addDomain() {
    this.router.navigate(['add-site']);
  }
}
