import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantMenuPage } from './merchant-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantMenuPage,
    children: [
      { path: 'pos', loadChildren: ()=>import('../tab2/tab2.module').then(m => m.Tab2PageModule)},
      { path: 'settings', loadChildren: ()=>import('../tab3/tab3.module').then(m => m.Tab3PageModule)},
      { path: 'messages', loadChildren: ()=>import('../userlist/userlist.module').then(m => m.UserlistPageModule)},
      { path: 'reports', loadChildren: ()=>import('../tab4/tab4.module').then(m => m.Tab4PageModule)},
      { path: 'account', loadChildren: ()=> import('../account/account.module').then(m => m.AccountPageModule)},
      { path: 'qr', loadChildren: () => import('../qr/qr.module').then( m => m.QrPageModule)},
      { path: 'charge-card', loadChildren: ()=>import('../charge-card/charge-card.module').then(m => m.ChargeCardPageModule)},
      { path: 'charge-cash', loadChildren: ()=>import('../charge-cash/charge-cash.module').then(m => m.ChargeCashPageModule)},
      { path: 'bill-pay', loadChildren: () => import('../bill-pay/bill-pay.module').then( m => m.BillPayPageModule)},
      { path: 'reviews', loadChildren: () => import('../reviews/reviews.module').then( m => m.ReviewsPageModule)},
      { path: 'tx-detail/:id/:ext', loadChildren: () => import('../tx-detail/tx-detail.module').then( m => m.TxDetailPageModule) },
      { path: 'qr-dashboard', loadChildren: () => import('../qr-dashboard/qr-dashboard.module').then( m => m.QrDashboardPageModule)},
      { path: 'qr-generate-info/:qroptions', loadChildren: () => import('../qr-generate-info/qr-generate-info.module').then( m => m.QrGenerateInfoPageModule)},
      { path: 'qr-standee', loadChildren: () => import('../qr-standee/qr-standee.module').then( m => m.QrStandeePageModule)},
      { path: 'qr-payment/:totalamount', loadChildren: () => import('../qr-payment/qr-payment.module').then( m => m.QrPaymentPageModule)},
      { path: 'chat', loadChildren: () => import('../message/message.module').then( m => m.MessagePageModule)},
      { path: 'grid', loadChildren: () => import('../grid/grid.module').then( m => m.GridPageModule)},
      { path: 'agent-inquiry', loadChildren: () => import('../agent-inquiry/agent-inquiry.module').then( m => m.AgentInquiryPageModule)},
      { path: 'agents', loadChildren: () => import('../agents/agents.module').then( m => m.AgentsPageModule)},
      { path: 'offers', loadChildren: () => import('../offers/offers.module').then( m => m.OffersPageModule)},
      { path: 'payment-detail', loadChildren: () => import('../payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)},
      { path: 'scan-and-pay', loadChildren: () => import('../scan-and-pay/scan-and-pay.module').then( m => m.ScanAndPayPageModule)},
      { path: 'text-order', loadChildren: () => import('../text-order/text-order.module').then( m => m.TextOrderPageModule)},
      { path: 'order-chat', loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)},
      { path: 'transaction-summary', loadChildren: () => import('../transaction-summary/transaction-summary.module').then( m => m.TransactionSummaryPageModule)},
      { path: 'merchant-profile', loadChildren: () => import('../merchant-profile/merchant-profile.module').then( m => m.MerchantProfilePageModule)},
      { path: 'transaction-details', loadChildren: () => import('../transaction-details/transaction-details.module').then( m => m.TransactionDetailsPageModule)},
      { path: 'text-order-details', loadChildren: () => import('../text-order-details/text-order-details.module').then( m => m.TextOrderDetailsPageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantMenuPageRoutingModule {}
