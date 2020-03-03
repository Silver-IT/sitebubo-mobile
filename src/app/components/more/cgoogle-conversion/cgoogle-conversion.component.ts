import { Component, OnInit } from '@angular/core';
import { PluginsApiService } from 'src/app/apis/plugins/plugins-api.service';
import { TempService } from 'src/app/services/temp/temp.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-cgoogle-conversion',
  templateUrl: './cgoogle-conversion.component.html',
  styleUrls: ['./cgoogle-conversion.component.scss'],
})
export class CgoogleConversionComponent implements OnInit {
  conversionDetails: any;
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
        this.getConversionDetails(user.id, user.token);
      } else {
        this.router.navigate(['domain-list'], { replaceUrl: true });
      }
    });
  }

  getConversionDetails(userID: string, token: string) {
    const params = this.tempService.dashboardParams;
    this.ionService.showLoading();
    this.pluginsAPI.getGoogleConversion(params.domainName, params.domainUserID, userID, token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.conversionDetails = result.data.analytics;
        console.log(this.conversionDetails);
      } else {
        this.ionService.presentToast('No Result from server');
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server API Problem');
    });
  }
}
