import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(
    private iab: InAppBrowser
  ) { }

  async payNow(userID, planID, token, freetrial): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let url = 'https://app.sitebubo.com/payments_pro/redirectpaypal?user_id=' + userID + '&plan_id=' + planID;
      url += '&token=' + token;
      if (freetrial) {
        url += '&freetrial=yes';
      }
      const browser = this.iab.create(url, '_blank', 'closebuttoncaption=back');
      browser.on('loadstop').subscribe((result) => {
          if (result.url === 'https://app.sitebubo.com/payments_pro/paymentsuccess') {
          browser.close();
          resolve('success');
        } else if (result.url  === 'https://app.sitebubo.com/payments_pro/paymentfailure') {
          browser.close();
          resolve('error');
        } else if (result.url  === 'https://app.sitebubo.com/payments_pro/ordercancelled') {
          browser.close();
          resolve('cancelled');
        } else if (result.url  === 'https://app.sitebubo.com/payments_pro/paypalpending') {
          browser.close();
          resolve('pending');
        } else if (result.url  === 'https://app.sitebubo.com/payments_pro/freetrialfailure') {
          browser.close();
          resolve('free-trial-failed');
        }
      });
    });
  }
}
