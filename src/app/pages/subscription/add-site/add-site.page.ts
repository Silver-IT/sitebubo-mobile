import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonInput, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DomainApiService } from 'src/app/apis/domain/domain-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.page.html',
  styleUrls: ['./add-site.page.scss'],
})
export class AddSitePage implements OnInit {
  @ViewChild('urlInput', { static: false }) urlInput: IonInput;
  userID: any;
  loading: any;
  token: any;
  domname = '';
  compname = '';
  duringSubmit = false;
  readyToSubmit = false;
  domainAddForm: FormGroup;
  validationMessages = {
    domainUrl: [
      { type: 'required', message: 'Domain Url is required' },
      { type: 'pattern', message: 'Invalid Domain. Example: pinterest.com' }
    ],
    domainName: [
      { type: 'required', message: 'Domain Name is required' },
      { type: 'minlength', message: 'Must be at least 3 characters long.' },
    ],
  };
  validateDomainUrl = false;
  validateDomainName = false;
  duplicatedDomain = false;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private domainAPI: DomainApiService,
    private ionService: IongadgetService,
    private events: Events
  ) { }

  ngOnInit() {
    this.initForm();
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  ionViewDidEnter() {
    this.urlInput.setFocus();
  }

  initForm() {
    this.domainAddForm = this.formBuilder.group({
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
    this.validateDomainUrl = event;
    if (event === false) {
      this.duplicatedDomain = false;
    }
  }

  setDomainNameValidation(event) {
    this.validateDomainName = event;
    if (event === false) {
      this.duplicatedDomain = false;
    }
  }

  ValidateDomain() {
    this.validateDomainUrl = true;
    this.validateDomainName = true;
    if (this.domainAddForm.valid) {
      this.duringSubmit = true;
      const domname = 'www.' + this.domname;
      this.domainAPI.validateDomain(domname, this.userID, this.token).subscribe((result) => {
        console.log('validation: ', result);
        if (result.RESPONSECODE === 1) {
          this.addDomain(domname);
        } else  {
          this.duringSubmit = false;
          this.ionService.showAlert('Invalid Domain', result.RESPONSE);
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
      if (result.RESPONSECODE === 1) {
        this.storage.get('userInfo').then((user) => {
          user.new_user = false;
          this.events.publish('userInfo_set', user);
          this.router.navigate(['domain-scan'], { queryParams: { action: 'addDomain', domainName: this.domname, domain_id: result.id } });
        });
      } else if (result.RESPONSE === 'Domain Name Already Exists') {

        this.duplicatedDomain = true;
        this.duringSubmit = false;
      } else {
        this.duringSubmit = false;
        this.ionService.showAlert('Adding Domain Failed', result.RESPONSE);
      }
    }, err => {
      this.duringSubmit = false;
      this.ionService.showAlert('Adding Domain Failed', 'Server API Problem');
    });
  }
}
