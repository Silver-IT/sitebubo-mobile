import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PluginsService } from 'src/app/serverAPI/plugins/plugins.service';
import { IongagetService } from 'src/app/services/ionGadgets/iongaget.service';

@Component({
  selector: 'app-google-analytics',
  templateUrl: './google-analytics.page.html',
  styleUrls: ['./google-analytics.page.scss'],
})
export class GoogleAnalyticsPage implements OnInit {
  @ViewChild('viewIdInput', { static: false }) viewIDInput: IonInput;
  analyticsForm: FormGroup;
  readyToSubmit = false;
  email = '';
  viewID = '';
  validation_messages = {
    viewID: [
      { type: 'required', message: 'View ID is required' },
      { type: 'minlength', message: 'Must be at least 4 characters long' }
    ]
  }
  validate_viewID = false;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private pluginsAPI: PluginsService,
    private ionService: IongagetService,
    private navparams: NavParams
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ionViewDidEnter() {
    this.viewIDInput.setFocus();
  }

  ngAfterViewInit() {
    this.viewIDInput.ionFocus.subscribe(() => {
      this.validate_viewID = false;
    });
    this.viewIDInput.ionBlur.subscribe(() => {
      this.validate_viewID = true;
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
      this.pluginsAPI.connectPlugin(params.monitor, params.userID, params.domainID, params.domainUserID, params.token).subscribe((result) => {
        console.log(result);
        this.ionService.closeLoading();
        if (result['RESPONSECODE'] === 1) {
          this.modalCtrl.dismiss(true);
        } else {
          this.ionService.presentToast(result['RESPONSE']);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Server API Problem');
      });      
    }
  }
}
