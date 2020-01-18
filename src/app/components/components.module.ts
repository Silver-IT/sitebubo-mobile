import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// modules
import { CountoModule } from 'angular2-counto';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatExpansionModule } from '@angular/material/expansion';
// pipes
import { DatetimePipe } from '../pipes/datetime/datetime.pipe';
import { CamelCasePipe } from './../pipes/camelCase/camel-case.pipe';
import { SmallCasePipe } from './../pipes/smallCase/small-case.pipe';
import { FloatonePipe } from './../pipes/floatone/floatone.pipe';
import { IntparsePipe } from './../pipes/intparse/intparse.pipe';
// components
import { OldFreeComponent } from './membership/old-free/old-free.component';
import { NoTrialComponent } from './membership/no-trial/no-trial.component';
import { FreeTrialComponent } from './membership/free-trial/free-trial.component';
import { FirstPayComponent } from './membership/first-pay/first-pay.component';
import { FirstFreeComponent } from './membership/first-free/first-free.component';
import { CmoreOptionsComponent } from './more/cmore-options/cmore-options.component';
import { CdomainExpireComponent } from './more/cdomain-expire/cdomain-expire.component';
import { CbrokenLinksComponent } from './more/cbroken-links/cbroken-links.component';
import { CspeedComponent } from './pagespeed/cspeed/cspeed.component';
import { CseoComponent } from './security/cseo/cseo.component';
import { CsecurityComponent } from './security/csecurity/csecurity.component';
import { CmalwareComponent } from './security/cmalware/cmalware.component';
import { CblacklistComponent } from './security/cblacklist/cblacklist.component';
import { SsecurityComponent } from './skeletons/ssecurity/ssecurity.component';
import { SdomainListComponent } from './skeletons/sdomain-list/sdomain-list.component';
import { CgoogleConversionComponent } from './more/cgoogle-conversion/cgoogle-conversion.component';
import { CgoogleVisitorsComponent } from './more/cgoogle-visitors/cgoogle-visitors.component';
import { CgoogleAcquistionComponent } from './more/cgoogle-acquistion/cgoogle-acquistion.component';

@NgModule({
    declarations: [
        SdomainListComponent,
        SsecurityComponent,
        CblacklistComponent,
        CmalwareComponent,
        CsecurityComponent,
        CseoComponent,
        CspeedComponent,
        CbrokenLinksComponent,
        CdomainExpireComponent,
        CmoreOptionsComponent,
        FirstFreeComponent,
        FirstPayComponent,
        FreeTrialComponent,
        NoTrialComponent,
        OldFreeComponent,
        CgoogleConversionComponent,
        CgoogleVisitorsComponent,
        CgoogleAcquistionComponent,

        CamelCasePipe,
        SmallCasePipe,
        FloatonePipe,
        IntparsePipe,
        DatetimePipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        RoundProgressModule,
        // BrowserAnimationsModule,
        MatExpansionModule,
        CountoModule
    ],
    exports: [

        CamelCasePipe,
        SmallCasePipe,
        FloatonePipe,
        IntparsePipe,
        DatetimePipe,
        // componenets
        SdomainListComponent,
        SsecurityComponent,
        CblacklistComponent,
        CmalwareComponent,
        CsecurityComponent,
        CseoComponent,
        CspeedComponent,
        CbrokenLinksComponent,
        CdomainExpireComponent,
        CmoreOptionsComponent,
        FirstFreeComponent,
        FirstPayComponent,
        FreeTrialComponent,
        NoTrialComponent,
        OldFreeComponent,
        CgoogleConversionComponent,
        CgoogleVisitorsComponent,
        CgoogleAcquistionComponent
    ]
})
export class ComponentsModule {}
