import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DomainApiService } from 'src/app/apis/domain/domain-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.page.html',
  styleUrls: ['./add-domain.page.scss'],
})
export class AddDomainPage implements OnInit {
  @ViewChild('urlInput', { static: false }) urlInput: IonInput;
  extraError: string;
  userID: any;
  token: any;
  domname = '';
  compname = '';
  duringSubmit = false;
  readyToSubmit = false;
  domainAddForm: FormGroup;
  validationMessages = {
    domainUrl: [
      { type: 'required', message: 'Domain Url is required' },
      { type: 'pattern', message: 'Invalid Domain' }
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
    private modalCtrl: ModalController,
    private router: Router,
    private storage: Storage,
    private domainAPI: DomainApiService,
    private ionService: IongadgetService
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

  dismiss() {
    this.modalCtrl.dismiss();
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
      this.ionService.showLoading();
      const domname = 'www.' + this.domname;
      this.domainAPI.validateDomain(domname, this.userID, this.token).subscribe((result) => {
        if (result.RESPONSECODE === 1) {
          this.addDomain(domname);
        } else  {
          this.ionService.closeLoading();
          if (result.RESPONSE === 'Not Valid Domain') {
            this.extraError = 'The domain doesn\'t exist';
            this.duplicatedDomain = true;
            this.readyToSubmit = false;
          } else {
            this.ionService.showAlert('Invalid Domain', result.RESPONSE);
          }
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.showAlert('Domain Validation Failed', 'Server API Problem');
      });
    }
  }

  detectChangesInForm() {
    if (this.domainAddForm.valid) {
      this.readyToSubmit = true;
    } else {
      this.readyToSubmit = false;
    }
  }

  addDomain(domname) {
    this.domainAPI.addDomain(this.compname, domname, this.userID, this.token).subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        console.log(result);
        this.modalCtrl.dismiss();
        // return;
        this.router.navigate(['domain-scan'], { queryParams: { action: 'addDomain', domainName: this.domname, domain_id: result.id } });
      } else if (result.RESPONSE === 'Domain Name Already Exists') {
        this.extraError = 'This domain name already exists';
        this.duplicatedDomain = true;
        this.readyToSubmit = false;
      } else {
        this.ionService.showAlert('Adding Domain Failed', result.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.showAlert('Adding Domain Failed', 'Server API Problem');
    });
  }
}
