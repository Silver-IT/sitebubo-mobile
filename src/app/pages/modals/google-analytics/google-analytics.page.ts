import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, IonInput, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PluginsApiService } from 'src/app/apis/plugins/plugins-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-google-analytics',
  templateUrl: './google-analytics.page.html',
  styleUrls: ['./google-analytics.page.scss'],
})
export class GoogleAnalyticsPage implements OnInit, AfterViewInit {
  @ViewChild('viewIdInput', { static: false }) viewIDInput: IonInput;
  analyticsForm: FormGroup;
  readyToSubmit = false;
  email = '';
  viewID = '';
  errorMessage: string;
  validationMessages = {
    viewID: [
      { type: 'required', message: 'View ID is required' },
      { type: 'minlength', message: 'Must be at least 4 characters long' }
    ]
  };
  validateViewID = false;
  extraError = false;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private pluginsAPI: PluginsApiService,
    private ionService: IongadgetService,
    private navparams: NavParams,
    private socialSharing: SocialSharing,
    private youtube: YoutubeVideoPlayer,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ionViewDidEnter() {
    // this.viewIDInput.setFocus();
  }

  ngAfterViewInit() {
    this.viewIDInput.ionFocus.subscribe(() => {
      this.extraError = false;
      this.validateViewID = false;
    });
    this.viewIDInput.ionBlur.subscribe(() => {
      this.validateViewID = true;
    });
    this.viewIDInput.ionChange.subscribe(() => {
      this.watchChanges();
    });
  }

  initForm() {
    this.analyticsForm = this.formBuilder.group({
      viewID: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ]))
    });
  }

  watchChanges() {
    if (this.analyticsForm.valid) {
      this.readyToSubmit = true;
    } else {
      this.readyToSubmit = false;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  connectGoogleAnalytics() {
    if (this.analyticsForm.valid) {
      console.log(this.navparams.data);
      const params = this.navparams.data;
      this.ionService.showLoading();
      const keys = {
        name: 'view-id',
        value: this.viewID
      };
      const temp = [];
      temp.push(keys);
      this.pluginsAPI.connectPlugin(params.monitor, params.userID, params.domainID, params.domainUserID, params.token, JSON.stringify(temp))
      .subscribe((result: any) => {
        this.ionService.closeLoading();
        if (result.RESPONSECODE === 1) {
          this.ionService.presentToast('Google Analytics monitor has been connected');
          this.modalCtrl.dismiss(true);
        } else {
          this.extraError = true;
          this.readyToSubmit = false;
          this.errorMessage = result.RESPONSE;
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Server API Problem');
      });
    }
  }

  shareWithSocial() {
    this.socialSharing.share('serviceaccount@sitebubo.iam.gserviceaccount.com', 'Add email to google view settings')
    .then((res) => {
      // this.ionService.presentToast('Email is shared successfully.');
    });
  }

  openReadMore() {
    const url = 'https://wiki.getuptimize.com/connect-google-analytics/';
    this.iab.create(url, '_blank', 'closebuttoncaption=back');
  }

  playTutorialVideo() {
    this.youtube.openVideo('NNvaNNg13Gs');
  }
}
