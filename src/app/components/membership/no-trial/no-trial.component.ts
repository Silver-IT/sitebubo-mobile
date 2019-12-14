import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-trial',
  templateUrl: './no-trial.component.html',
  styleUrls: ['./no-trial.component.scss'],
})
export class NoTrialComponent implements OnInit {
  @Input() details: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.details);
  }

  changePlan() {
    this.router.navigate(['subscription']);
  }

  cancelMemebership() {
    this.router.navigate(['cancel-membership']);
  }

  openInvoice() {
    window.open(this.details.invoice_pdf, '_blank');
  }

}
