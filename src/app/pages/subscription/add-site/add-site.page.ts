import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, LoadingController, IonInput, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DomainService } from './../../../serverAPI/domain/domain.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.page.html',
  styleUrls: ['./add-site.page.scss'],
})
export class AddSitePage implements OnInit {
  @ViewChild('urlInput', { static: false }) urlInput: IonInput
  userID: any;
  loading: any;
  token: any;
  domname = '';
  compname = '';
  duringSubmit = false;
  readyToSubmit = false;
  // tslint:disable-next-line: variable-name
  domain_addForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    domainUrl: [
      { type: 'required', message: 'Domain Url is required' },
      { type: 'pattern', message: 'Invalid Domain. Example: pinterest.com' }
    ],
    domainName: [
      { type: 'required', message: 'Domain Name is required' },
      { type: 'minlength', message: 'Must be at least 3 characters long.' },
    ],
  };
  // tslint:disable-next-line: variable-name
  validate_domainUrl = false;
  // tslint:disable-next-line: variable-name
  validate_domainName = false;
  duplicatedDomain = false;
  constructor(
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ga: GoogleAnalytics,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private domainAPI: DomainService,
    private ionService: IongagetService,
    private events: Events
  ) { }

  ngOnInit() {
    this.initForm();
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  ionViewDidEnter(){
    this.urlInput.setFocus();
  }

  initForm() {
    this.domain_addForm = this.formBuilder.group({
      domainUrl: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[.]+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]')
      ])),
      domainName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    });
  }


  setDomainUrlValidation(event) {
    this.validate_domainUrl = event;
    if (event === false) {
      this.duplicatedDomain = false;
    }
  }

  setDomainNameValidation(event) {
    this.validate_domainName = event;
    if (event === false) {
      this.duplicatedDomain = false;
    }
  }

  ValidateDomain() {
    this.validate_domainUrl = true;
    this.validate_domainName = true;
    if (this.domain_addForm.valid) {
      this.duringSubmit = true;
      let domname = 'www.' + this.domname;
      this.domainAPI.validateDomain(domname, this.userID, this.token).subscribe((result) => {
        console.log('validation: ', result);
        if (result['RESPONSECODE'] === 1) {
          this.addDomain(domname);
        } else  {
          this.duringSubmit = false; 
          this.ionService.showAlert('Invalid Domain', result['RESPONSE']);
        }
      }, err => {
        this.duringSubmit = false; 
        this.ionService.showAlert('Domain Validation Failed', 'Server API Problem');
      });
    }
  }

  addDomain(domname) {
    this.domainAPI.addDomain(this.compname, domname, this.userID, this.token).subscribe((result) => {
      console.log('Adding Domain: ', result);
      if (result['RESPONSECODE'] === 1) {
        this.storage.get('userInfo').then((user) => {
          user.new_user = false;
          this.events.publish('userInfo_set', user);
          this.router.navigate(['domain-scan'], { queryParams: { action: 'addDomain', domainName: this.domname } })
        });
      } else if (result['RESPONSE'] === 'Domain Name Already Exists') {

        this.duplicatedDomain = true;
        this.duringSubmit = false; 
      } else {
        this.duringSubmit = false; 
        this.ionService.showAlert('Adding Domain Failed', result['RESPONSE']);
      }
    }, err => {
      this.duringSubmit = false; 
      this.ionService.showAlert('Adding Domain Failed', 'Server API Problem');
    });
  }

}
