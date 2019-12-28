import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// plugins
import { Network } from '@ionic-native/network/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
// http
import { HttpClientModule, HttpResponse } from '@angular/common/http';
// modals
import { FeedbackPageModule } from './pages/modals/feedback/feedback.module';
import { PrivacyPageModule } from './pages/modals/privacy/privacy.module';
import { TermsPageModule } from './pages/modals/terms/terms.module';
import { ExDomainsPageModule } from './pages/modals/ex-domains/ex-domains.module';
import { AddDomainPageModule } from './pages/modals/add-domain/add-domain.module';
import { FeebackSuccessPageModule } from './pages/modals/feeback-success/feeback-success.module';
import { ForgotpasswordPageModule } from './pages/modals/forgotpassword/forgotpassword.module';
import { CheckEmailPageModule } from './pages/modals/check-email/check-email.module';
import { MyprofilePageModule } from './pages/modals/userManagement/myprofile/myprofile.module';
import { AllDonePageModule } from './pages/modals/all-done/all-done.module';
import { InviteUserPageModule } from './pages/modals/invite-user/invite-user.module';
import { NotificationListPageModule } from './pages/modals/notification-list/notification-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleAnalyticsPageModule } from './pages/modals/plugins/google-analytics/google-analytics.module';
import { MonitorIssuesPageModule } from './pages/modals/monitor-issues/monitor-issues.module';
// popover
import { AllDoneComponent } from './components/popover/all-done/all-done.component';
import { NotificationPopComponent } from './components/popover/notification-pop/notification-pop.component';



// const config: SocketIoConfig = { url: 'http://localhost:1111', options: {} };
const config: SocketIoConfig = { url: 'https://socket.sitebubo.com', options: {} };

@NgModule({
  declarations: [AppComponent, AllDoneComponent, NotificationPopComponent],
  entryComponents: [ AllDoneComponent, NotificationPopComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // modals
    PrivacyPageModule,
    TermsPageModule,
    FeedbackPageModule,
    ExDomainsPageModule,
    AddDomainPageModule,
    FeebackSuccessPageModule,
    ForgotpasswordPageModule,
    CheckEmailPageModule,
    MyprofilePageModule,
    AllDonePageModule,
    InviteUserPageModule,
    NotificationListPageModule,
    GoogleAnalyticsPageModule,
    MonitorIssuesPageModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    GoogleAnalytics,
    Facebook,
    FCM,
    InAppPurchase,
    AppRate,
    Keyboard,
    HttpResponse,
    Deeplinks,
    AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
