import { Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { map, filter, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
const server_root = 'https://app.sitewiser.com/api/public/';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public domain_url = server_root + 'apidomain/';
  public subscription_url = server_root +'apisubscription/';
  public auth_url = server_root + 'apiusers/';
  public other_url = server_root + 'apipage/';
  public report_url = server_root + 'apireport/';
  public uptime_url = server_root + 'apiuptime/';
  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events
  ) {
    
   }

   public sendGetRequest(url): Observable<any> {
    console.log(url);
    const response = this.https.get(url).pipe(
      filter(this.filterResponse.bind(this)),
      map(res => res)
    );
    return response;
   }

   public sendPostRequest(url, postData): Observable<any> {
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const response = this.https.post(url, postData, httpOptions).pipe(
      filter(this.filterResponse.bind(this)),
      map(res => res)
    );
    return response;
   }

   public filterResponse(response) {
    // response['RESPONSE'] = 'Access denied. Please give me valid token';
    if (response['RESPONSE'] === 'Access denied. Please give me valid token') {
      this.events.publish('denied_token');
      this.storage.clear().then(() => {
        this.router.navigate(['welcome'], { replaceUrl: true });
      });
    } else {
      return response;
    }
   }

}
