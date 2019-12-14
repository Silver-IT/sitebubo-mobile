import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-pay',
  templateUrl: './first-pay.component.html',
  styleUrls: ['./first-pay.component.scss'],
})
export class FirstPayComponent implements OnInit {
  @Input() details: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  gotoDomainList() {
    this.router.navigate(['domain-list'], {replaceUrl: true});
  }

}
