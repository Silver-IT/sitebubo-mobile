import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/auth/signup/signup.module#SignupPageModule' },
  { path: 'verifymail', loadChildren: './pages/auth/verifymail/verifymail.module#VerifymailPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'feedback', loadChildren: './pages/modals/feedback/feedback.module#FeedbackPageModule' },
  { path: 'subscription', loadChildren: './pages/subscription/subscription/subscription.module#SubscriptionPageModule' },
  { path: 'detailed-plan', loadChildren: './pages/subscription/detailed-plan/detailed-plan.module#DetailedPlanPageModule' },
  { path: 'terms', loadChildren: './pages/modals/terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './pages/modals/privacy/privacy.module#PrivacyPageModule' },
  { path: 'domain-list', loadChildren: './pages/domain/domain-list/domain-list.module#DomainListPageModule' },
  { path: 'ex-domains', loadChildren: './pages/modals/ex-domains/ex-domains.module#ExDomainsPageModule' },
  { path: 'add-domain', loadChildren: './pages/modals/add-domain/add-domain.module#AddDomainPageModule' },
  { path: 'domain-scan', loadChildren: './pages/domain/domain-scan/domain-scan.module#DomainScanPageModule' },
  { path: 'feeback-success', loadChildren: './pages/modals/feeback-success/feeback-success.module#FeebackSuccessPageModule' },
  { path: 'forgotpassword', loadChildren: './pages/modals/forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'check-email', loadChildren: './pages/modals/check-email/check-email.module#CheckEmailPageModule' },
  { path: 'myprofile', loadChildren: './pages/modals/userManagement/myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'membership', loadChildren: './pages/membership/membership.module#MembershipPageModule' },
  { path: 'add-site', loadChildren: './pages/subscription/add-site/add-site.module#AddSitePageModule' },
  { path: 'subscription-welcome', loadChildren: './pages/subscription/subscription-welcome/subscription-welcome.module#SubscriptionWelcomePageModule' },
  { path: 'cancel-membership', loadChildren: './pages/membershipManagement/cancel-membership/cancel-membership.module#CancelMembershipPageModule' },
  { path: 'all-done', loadChildren: './pages/modals/all-done/all-done.module#AllDonePageModule' },
  { path: 'invite-user', loadChildren: './pages/modals/invite-user/invite-user.module#InviteUserPageModule' },
  {
    path: '',
    loadChildren: './pages/details/tabs/tabs.module#TabsPageModule'
    // loadChildren: () => import('./pages/details/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'notification-list', loadChildren: './pages/modals/notification-list/notification-list.module#NotificationListPageModule' },
  { path: 'google-analytics', loadChildren: './pages/modals/plugins/google-analytics/google-analytics.module#GoogleAnalyticsPageModule' },  { path: 'monitor-issues', loadChildren: './pages/modals/monitor-issues/monitor-issues.module#MonitorIssuesPageModule' },
  { path: 'notification-setting', loadChildren: './pages/notification-setting/notification-setting.module#NotificationSettingPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
