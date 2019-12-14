import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
    private storage: Storage,
    private formBuilder: FormBuilder
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
      this.modalCtrl.dismiss(true);
    }
  }
}
