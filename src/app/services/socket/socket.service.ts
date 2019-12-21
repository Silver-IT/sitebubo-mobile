import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  websiteScan(params): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(params);
      this.socket.emit('request-web-scanning', params);
      resolve(true);
    })
   }
}
