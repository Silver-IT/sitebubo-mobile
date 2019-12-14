import { Network } from '@ionic-native/network/ngx';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private network: Network,
    private events: Events
  ) { }

  watchNetworkConnection() {
    console.log('watch connection');
    this.network.onChange().subscribe(connection => {
      // alert('connection: ' + JSON.stringify(connection));
    });

    this.network.onConnect().subscribe(connection => {
      // alert('on: ' + JSON.stringify(connection));
    });

    this.network.onDisconnect().subscribe(connection => {
      // alert('off: ' + JSON.stringify(connection));
    });
  }
}
