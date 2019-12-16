import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TempService } from './../../../services/temp/temp.service';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['../../../pages/dashboard/dashboard.page.scss'],
})
export class MoreOptionsComponent implements OnInit {
  dashboard: any;
  orders = [];
  countos = {
    conversion: 0,
    visitors: 0,
    brokens: 0
  }
  constructor(
    private tempService: TempService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.dashboard = this.tempService.dashboardData;
    this.orders = this.tempService.dashboardData['monitor-orders'];
    console.log(this.dashboard);
  }

  jumpToPage(param) {
    const params: NavigationExtras = {
      queryParams: {
        pageName: param
      }
    };
    this.router.navigate(['tabs/more'], params);
  }
}
