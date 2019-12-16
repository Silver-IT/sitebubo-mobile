import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountoModule } from 'angular2-counto';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { SkeletonDomainListComponent } from './skeletons/skeleton-domain-list/skeleton-domain-list.component';
import { SkeletonFeedbackComponent } from './skeletons/skeleton-feedback/skeleton-feedback.component';
import { SkeletonSpeedComponent } from './skeletons/skeleton-speed/skeleton-speed.component';
import { SkeletonSecurityComponent } from './skeletons/skeleton-security/skeleton-security.component';
import { OldFreeComponent } from './membership/old-free/old-free.component';
import { FirstFreeComponent } from './membership/first-free/first-free.component';
import { FirstPayComponent } from './membership/first-pay/first-pay.component';
import { NoTrialComponent } from './membership/no-trial/no-trial.component';
import { FreeTrialComponent } from './membership/free-trial/free-trial.component';
import { BlacklistComponent } from './security/blacklist/blacklist.component';
import { MalwareComponent } from './security/malware/malware.component';
import { WebsiteSecurityComponent } from './security/website-security/website-security.component';
import { MobileComponent } from './pagespeed/mobile/mobile.component';
import { DesktopComponent } from './pagespeed/desktop/desktop.component';
import { SpeedComponent } from './pagespeed/speed/speed.component';
import { IssuesComponent } from './seo/issues/issues.component';
import { CseoscoreComponent } from './seo/cseoscore/cseoscore.component';
import { CdomainExpireComponent } from './more/cdomain-expire/cdomain-expire.component';
import { CbrokenLinksComponent } from './more/cbroken-links/cbroken-links.component';
import { MoreOptionsComponent } from './more/more-options/more-options.component';


import { DatetimePipe } from '../pipes/datetime/datetime.pipe';
import { IntparsePipe } from '../pipes/intparse/intparse.pipe';
import { FloatonePipe } from '../pipes/floatone/floatone.pipe';
import { SmallcasePipe } from './../pipes/smallcase/smallcase.pipe';

@NgModule({
  declarations: [
    SkeletonDomainListComponent, 
    SkeletonFeedbackComponent,
    SkeletonSecurityComponent,
    SkeletonSpeedComponent,
    OldFreeComponent,
    FirstFreeComponent,
    FirstPayComponent,
    NoTrialComponent,
    FreeTrialComponent,
    BlacklistComponent,
    MalwareComponent,
    WebsiteSecurityComponent,
    MobileComponent,
    DesktopComponent,
    SpeedComponent,
    IssuesComponent,
    CseoscoreComponent,
    CdomainExpireComponent,
    CbrokenLinksComponent,
    MoreOptionsComponent,

    DatetimePipe,
    IntparsePipe,
    FloatonePipe,
    SmallcasePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    RoundProgressModule,
    MatExpansionModule,
    CountoModule
  ],
  exports: [
    SkeletonDomainListComponent,
    OldFreeComponent,
    FirstFreeComponent,
    NoTrialComponent,
    FreeTrialComponent,
    FirstPayComponent,
    BlacklistComponent,
    MalwareComponent,
    WebsiteSecurityComponent,
    MobileComponent,
    DesktopComponent,
    SpeedComponent,
    IssuesComponent,
    CseoscoreComponent,
    CdomainExpireComponent,
    CbrokenLinksComponent,
    MoreOptionsComponent,
    
    DatetimePipe,
    IntparsePipe,
    FloatonePipe,
    SmallcasePipe
  ]
})
export class ComponentsModule { }
