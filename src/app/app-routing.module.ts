import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginRestrictGuard } from './guards/login-restrict.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [LoginRestrictGuard]
  },
  {
    path: 'subscription-welcome',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./pages/subscription/subscription-welcome/subscription-welcome.module').then( m => m.SubscriptionWelcomePageModule)
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/subscription/plans/plans.module').then( m => m.PlansPageModule)
  },
  {
    path: 'detailed-plan',
    loadChildren: () => import('./pages/subscription/detailed-plan/detailed-plan.module').then( m => m.DetailedPlanPageModule)
  },
  {
    path: 'add-site',
    loadChildren: () => import('./pages/subscription/add-site/add-site.module').then( m => m.AddSitePageModule)
  },
  {
    path: 'notification-setting',
    loadChildren: () => import('./pages/notification-setting/notification-setting.module').then( m => m.NotificationSettingPageModule)
  },
  {
    path: 'cancel-membership',
    loadChildren: () => import('./pages/membership/cancel-membership/cancel-membership.module').then( m => m.CancelMembershipPageModule)
  },
  {
    path: 'view-membership',
    loadChildren: () => import('./pages/membership/view-membership/view-membership.module').then( m => m.ViewMembershipPageModule)
  },
  {
    path: 'domain-scan',
    loadChildren: () => import('./pages/domain/domain-scan/domain-scan.module').then( m => m.DomainScanPageModule)
  },
  {
    path: 'domain-list',
    loadChildren: () => import('./pages/domain/domain-list/domain-list.module').then( m => m.DomainListPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'verifyemail',
    loadChildren: () => import('./pages/auth/verifyemail/verifyemail.module').then( m => m.VerifyemailPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/details/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
