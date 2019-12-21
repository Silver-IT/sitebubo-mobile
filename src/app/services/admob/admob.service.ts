import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  admobConfig: AdMobFreeBannerConfig = {
    isTesting: true,
    autoShow: true,
    id: 'ca-app-pub-9386468627439822/4191581557'
  }
  interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: true,
    autoShow: true,
    id: 'ca-app-pub-9386468627439822/9060764852'
  }
  constructor(
    private admob: AdMobFree,
    private platform: Platform
  ) { }

  showAdmobBanner(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.admob.banner.config(this.admobConfig);
      await this.admob.banner.prepare().then(() => {
        resolve(true);
      }).catch(err => {
        reject(false);
      });
    });
  }

  showInterstitial(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.admob.interstitial.config(this.interstitialConfig);
      this.admob.interstitial.prepare().then(() => {
        resolve(true);
      }).catch((err) => {
        reject(false);
      });
    });
  }

  removeBanner() {
    this.admob.banner.remove();
  }

  removeInterstitial() {
  }
}
