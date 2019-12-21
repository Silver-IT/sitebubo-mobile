import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NetworkService } from './services/networkStatus/network.service';
import { GeneralService } from './services/generalComponents/general.service';
import { IongagetService } from './services/ionGadgets/iongaget.service';
import { AuthService } from './serverAPI/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { PushNotificationsService } from './services/pushNotifications/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  email = '';
  plan = '';
  domainCount = 0;
  showMenu = false;
  newUser: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private networkService: NetworkService,
    private events: Events,
    private generalService: GeneralService,
    private ionService: IongagetService,
    private cdr: ChangeDetectorRef,
    private authAPI: AuthService,
    private storageService: StorageService,
    private deeplinks: Deeplinks,
    private fcm: FCM,
    private pushService: PushNotificationsService
  ) {
    this.listenEvents();
    this.networkService.watchNetworkConnection();
    this.initializeApp();
  }

  initializeApp() {   
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenOutsideChanges();
      this.listenFCM();
      this.veryifyToken().then((result) => {
        if (result) {
          console.log(result);
          this.storageService.setStorage(result).then(() => {
            this.generalService.defineInitialRoutering();
          });
        }
      }).catch((err) => {
        
      });
    });
  }

  veryifyToken() {
    return new Promise((resolve, reject) => {
      this.storage.get('userInfo').then((user) => {
        if (user) {
          this.authAPI.verifyToken(user.token).subscribe((result) => {
            if (result['RESPONSECODE'] === 1) {
              this.newUser = result['data'].user.new_user;
              this.email = result['data'].user.email;
              this.domainCount = result['data'].domain.current_domains;
              resolve(result['data']);
            } else  {
              this.generalService.logOut();
              this.router.navigate(['welcome'], { replaceUrl: true });
              reject('error');
            }
          });
        } else  {
          this.generalService.logOut();
          this.router.navigate(['welcome'], { replaceUrl: true });
          reject('error');
        }
      });
    });
  }

  listenFCM() {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        alert('Tapped:      ' + JSON.stringify(data));
      } else {
       alert(JSON.stringify(data));
      }
    });
  }

  listenEvents() {
    this.events.subscribe('denied_token', () => {
      this.ionService.closeLoading();
    });

    this.events.subscribe('userInfo_set', (user) => {
      console.log('userInfo set', user);
      this.email = user.email;
      this.newUser = user.new_user;
      this.storage.set('userInfo', user);
      this.cdr.detectChanges();
    });
    
    this.events.subscribe('planInfo_set', (info) => {
      console.log('planInfo set', info);
      this.storage.set('planInfo', info);
      this.cdr.detectChanges();
    });
    
    this.events.subscribe('domainInfo_set', (info) => {
      this.domainCount = info.current_domains;
      console.log('domainInfo set', info);
      this.storage.set('domainInfo', info);
      this.cdr.detectChanges();
    });
    
    this.events.subscribe('log_out', () => {
      this.showMenu = false;
      this.cdr.detectChanges();
    });

  }

  listenOutsideChanges() {
    this.deeplinks.route({
      '/verifymail': { id: 'verified', code: 'asdkfeicke0329ds3mns' },
      '/': { params: 'route' }
    }).subscribe((match) => {
      if (match['$route']['id'] === 'verified') {
        this.router.navigate(['verifymail'], {
          queryParams: {
            id: 'verified' , code: 'asdkfeicke0329ds3mns'
          }
        })
      }
    }, (nomatch) => {
      
    });
  }

  openDomainList() {
    this.router.navigate(['domain-list']);
  }

  openMembership() {
    this.router.navigate(['membership']);
  }

  openMyProfile() {
    this.generalService.openMyProfile();
  }

  openNotificationSettings() {
    this.router.navigate(['notification-setting']);
  }

  openFeedback() {
    this.generalService.openFeedback();
  }

  openRating() {
    this.generalService.openRating();
  }

  logout() {
    this.generalService.logOut();
    this.events.publish('log_out');
  }

  ChangePlan() {
    this.router.navigate(['subscription']);
  }
}
