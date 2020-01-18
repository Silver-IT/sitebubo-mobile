import { Component, OnInit } from '@angular/core';
import { PluginsApiService } from 'src/app/apis/plugins/plugins-api.service';
import { TempService } from 'src/app/services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-cgoogle-visitors',
  templateUrl: './cgoogle-visitors.component.html',
  styleUrls: ['./cgoogle-visitors.component.scss'],
})
export class CgoogleVisitorsComponent implements OnInit {
  visitorsDetails: any;
  constructor(
    private pluginsAPI: PluginsApiService,
    private tempService: TempService,
    private storage: Storage,
    private router: Router,
    private ionService: IongadgetService
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.getVisitorsDetails(user.id, user.token);
      } else {
        this.router.navigate(['domain-list'], { replaceUrl: true });
      }
    });
  }

  getVisitorsDetails(userID, token) {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.pluginsAPI.getGoogleVisitors(params.domainName, params.domainUserID, userID, token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.visitorsDetails = result.data.analytics;
        console.log(this.visitorsDetails);
      } else {
        this.ionService.presentToast('No Result from Server');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }
}
