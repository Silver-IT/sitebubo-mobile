import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private evetns: Events
  ) { 
    // this.defineEventHandlers();
  }

  ngOnInit() {

  }
  
  defineEventHandlers() {
    this.socket.on('web-scanning', (data) => {
      this.evetns.publish('scanning', data);
    });


    // this.socket.on('testing', (data) => {
    //   console.log('Testing Event :', data);
    // });
  }
  
  websiteScan(params) {
    this.socket.emit('request-web-scanning', params);
  }
}
