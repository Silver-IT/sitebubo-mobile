import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from 'src/app/services/membership/membership.service';
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
  ) { }

  ngOnInit() {}

  changeMembership() {
    this.router.navigate(['plans']);
  }

  deleteMembership() {
    this.memberService.deleteAccount();
  }
}
