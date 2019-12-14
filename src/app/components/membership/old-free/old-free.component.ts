import { MembershipService } from './../../../services/membership/membership.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-old-free',
  templateUrl: './old-free.component.html',
  styleUrls: ['./old-free.component.scss'],
})
export class OldFreeComponent implements OnInit {
  @Input() details: any;
  constructor(
    private router: Router,
    private memberService: MembershipService
  ) {
    //console.log(this.subscriptionName);
  }

  ngOnInit() {
    console.log(this.details);
  }

  changeMembership() {
    this.router.navigate(['subscription']);
  }

  deleteMembership() {
    this.memberService.deleteAccount();
  }

}
