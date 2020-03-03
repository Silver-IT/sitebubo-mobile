import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'uptime',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../uptime/uptime.module').then(m => m.UptimePageModule)
          }
        ]
      },
      {
        path: 'security',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../security/security.module').then(m => m.SecurityPageModule)
          }
        ]
      },
      {
        path: 'speed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../speed/speed.module').then(m => m.SpeedPageModule)
          }
        ]
      },
      {
        path: 'seo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../seo/seo.module').then(m => m.SeoPageModule)
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../more/more.module').then(m => m.MorePageModule)
          },
          {
            path: 'domain',
            loadChildren: () =>
              import('../../domain/domain-list/domain-list.module').then(m => m.DomainListPageModule)
          }
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/uptime',
      //   pathMatch: 'full'
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
