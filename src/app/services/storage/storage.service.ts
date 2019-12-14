import { IongagetService } from './../ionGadgets/iongaget.service';
import { Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../generalComponents/general.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private events: Events,
    private gService: GeneralService,
    private ionSerivce: IongagetService
  ) { }

  async setStorage(result) {
    return new Promise(async (resolve, reject) => {
      if (result.user.terms) {
        this.gService.openTermsAndConditions(true);
      } 
      this.events.publish('userInfo_set', result.user);    
      this.events.publish('planInfo_set', result.subscription);
      this.events.publish('domainInfo_set', result.domain);
      resolve(true);
    });
  }

  

}
