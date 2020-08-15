import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentMenuPage } from './agent-menu.page';

const routes: Routes = [
  {
    path: '',
    component: AgentMenuPage,
    children: [
      { path: 'send-money', loadChildren: () => import('../send-money/send-money.module').then( m => m.SendMoneyPageModule)},
      { path: 'receive-money', loadChildren: () => import('../receive-money/receive-money.module').then( m => m.ReceiveMoneyPageModule)},
      { path: 'exchange-money', loadChildren: () => import('../exchange-money/exchange-money.module').then( m => m.ExchangeMoneyPageModule)},
      { path: 'pay-bills', loadChildren: () => import('../pay-bills/pay-bills.module').then( m => m.PayBillsPageModule)},
      { path: 'loan-products', loadChildren: () => import('../loan-products/loan-products.module').then( m => m.LoanProductsPageModule)},
      { path: 'agent-settings', loadChildren: () => import('../agent-settings/agent-settings.module').then( m => m.AgentSettingsPageModule)},
      { path: 'pending-pickups', loadChildren: () => import('../pending-pickups/pending-pickups.module').then( m => m.PendingPickupsPageModule)},
      { path: 'payable-bills', loadChildren: () => import('../payable-bills/payable-bills.module').then( m => m.PayableBillsPageModule)},
      { path: 'pay-bills-detail', loadChildren: () => import('../pay-bills-detail/pay-bills-detail.module').then( m => m.PayBillsDetailPageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentMenuPageRoutingModule {}
