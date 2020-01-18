import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { IongadgetService } from '../ionGadgets/iongadget.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public networkStatus: boolean;
  constructor(
    private network: Network,
    private ionService: IongadgetService
  ) { }

  initNetwork() {
    this.network.onConnect().subscribe(() => {
      if (this.networkStatus === false) {
        this.ionService.presentToast('You are online now.');
      }
      this.ionService.closeLoading();
      this.networkStatus = true;
    });
    this.network.onDisconnect().subscribe(() => {
      if (this.networkStatus === true) {
        this.ionService.presentToast('No Network Connection.');
      }
      this.ionService.presentOfflineLoading();
      this.networkStatus = false;
    });
  }
}
