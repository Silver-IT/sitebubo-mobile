import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// modules
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// plugins
import { FCM } from '@ionic-native/fcm/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
// modals
import { MyprofilePageModule } from './pages/modals/myprofile/myprofile.module';
import { TermsPageModule } from './pages/modals/terms/terms.module';
import { PrivacyPageModule } from './pages/modals/privacy/privacy.module';
import { GoogleAnalyticsPageModule } from './pages/modals/google-analytics/google-analytics.module';
import { NotificationListPageModule } from './pages/modals/notification-list/notification-list.module';
import { MonitorIssuesPageModule } from './pages/modals/monitor-issues/monitor-issues.module';
import { ExDomainsPageModule } from './pages/modals/ex-domains/ex-domains.module';
import { InviteUserPageModule } from './pages/modals/invite-user/invite-user.module';
import { ForgotpasswordPageModule } from './pages/modals/forgotpassword/forgotpassword.module';
import { FeedbackSuccessPageModule } from './pages/modals/feedback-success/feedback-success.module';
import { FeedbackPageModule } from './pages/modals/feedback/feedback.module';
import { AllDonePageModule } from './pages/modals/all-done/all-done.module';
import { AddDomainPageModule } from './pages/modals/add-domain/add-domain.module';
// popovers
import { PallDoneComponent } from './components/popover/pall-done/pall-done.component';


const config: SocketIoConfig = { url: 'https://socket.sitebubo.com', options: {} };

@NgModule({
  declarations: [AppComponent, PallDoneComponent],
  entryComponents: [ PallDoneComponent ],
  imports: [
    HttpClientModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // modals
    MyprofilePageModule,
    TermsPageModule,
    PrivacyPageModule,
    GoogleAnalyticsPageModule,
    NotificationListPageModule,
    MonitorIssuesPageModule,
    ExDomainsPageModule,
    InviteUserPageModule,
    ForgotpasswordPageModule,
    FeedbackSuccessPageModule,
    FeedbackPageModule,
    AllDonePageModule,
    AddDomainPageModule
  ],
  providers: [
    // HttpResponse,
    FCM,
    Facebook,
    AdMobFree,
    AppRate,
    BackgroundMode,
    SocialSharing,
    YoutubeVideoPlayer,
    InAppBrowser,
    Network,
    InAppPurchase,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
