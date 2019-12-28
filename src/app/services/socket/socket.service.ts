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
  ) {}

  ngOnInit() {

  }
  
  defineEventHandlers(eventName, fnHandler) {
    this.socket.on(eventName, (data) => {
      fnHandler(data);
    });
    // this.socket.on('testing', (data) => {
    //   console.log('Testing Event :', data);
    // });
  }

  removeHandler(eventName) {
    this.socket.removeAllListeners(eventName);
  }
  
  websiteScan(params) {
    this.socket.emit('request-web-scanning', params);
  }
}
