import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { GeneralService } from '../generalComponents/general.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private events: Events,
    private generalService: GeneralService
  ) { }

  async setStorage(result) {
    return new Promise(async (resolve, reject) => {
      if (result.user.terms) {
        this.generalService.openTermsAndConditions(true);
      }
      this.events.publish('userInfo_set', result.user);
      this.events.publish('planInfo_set', result.subscription);
      this.events.publish('domainInfo_set', result.domain);
      resolve(true);
    });
  }
}
