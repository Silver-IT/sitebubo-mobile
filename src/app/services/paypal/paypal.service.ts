import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(
  ) { }

  async payNow(userID, planID, token, freetrial): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let url = 'https://app.sitewiser.com/payments_pro/redirectpaypal?user_id=' + userID + '&plan_id=' + planID;
      url += '&token=' + token;
      if (freetrial) {
        url += '&freetrial=yes';
      }
      const browser = window.open(url, '_blank');
      browser.addEventListener('loadstop', (result) => {
          if (result['url'] === 'https://app.sitewiser.com/payments_pro/paymentsuccess') {
          browser.close();
          resolve('success');
        } else if (result['url']  === 'https://app.sitewiser.com/payments_pro/paymentfailure') {
          browser.close();
          resolve('error');
          // this.ionService.presentToast('Subscription Activation Failed. Please try again');
        } else if (result['url']  === 'https://app.sitewiser.com/payments_pro/ordercancelled') {
          browser.close();
          resolve('cancelled');
          // this.ionService.presentToast('Subscription Activation Failed. Please try again');
        } else if (result['url']  === 'https://app.sitewiser.com/payments_pro/paypalpending') {
          browser.close();
          resolve('pending');
        } else if (result['url']  === 'https://app.sitewiser.com/payments_pro/freetrialfailure') {
          browser.close();
          resolve('free-trial-failed');
        }
      });
    });
  }

}
