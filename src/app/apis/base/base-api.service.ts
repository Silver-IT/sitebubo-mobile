import { Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';

// tslint:disable-next-line: variable-name
const server_root = 'https://app.sitebubo.com/api/public/';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  // tslint:disable-next-line: variable-name
  public domain_url = server_root + 'apidomain/';
  // tslint:disable-next-line: variable-name
  public subscription_url = server_root + 'apisubscription/';
  // tslint:disable-next-line: variable-name
  public auth_url = server_root + 'apiusers/';
  // tslint:disable-next-line: variable-name
  public other_url = server_root + 'apipage/';
  // tslint:disable-next-line: variable-name
  public report_url = server_root + 'apireport/';
  // tslint:disable-next-line: variable-name
  public uptime_url = server_root + 'apiuptime/';
  // tslint:disable-next-line: variable-name
  public server_url = server_root + 'apiserver/';

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook
  ) {}

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
    if (response.RESPONSE === 'Access denied. Please give me valid token') {
      this.events.publish('denied_token');
      this.storage.clear().then(() => {
        this.facebook.logout();
        this.router.navigate(['welcome'], { replaceUrl: true });
      });
    } else {
      return response;
    }
   }
}
