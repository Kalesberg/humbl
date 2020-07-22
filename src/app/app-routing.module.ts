import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'pos', pathMatch: 'full', canActivate: [AuthGuard],},
  { path: 'home', loadChildren: ()=> import('./tab1/tab1.module').then(m => m.Tab1PageModule)},
  { path: 'pos', loadChildren: ()=>import('./tab2/tab2.module').then(m => m.Tab2PageModule), canActivate: [AuthGuard]},
  { path: 'settings', loadChildren: ()=>import('./tab3/tab3.module').then(m => m.Tab3PageModule), canActivate: [AuthGuard]},
  { path: 'messages', loadChildren: ()=>import('./userlist/userlist.module').then(m => m.UserlistPageModule), canActivate: [AuthGuard]},
  { path: 'reports', loadChildren: ()=>import('./tab4/tab4.module').then(m => m.Tab4PageModule), canActivate: [AuthGuard]},
  { path: 'signup', loadChildren: ()=>import('./signup/signup.module').then(m => m.SignupPageModule)},
  { path: 'login', loadChildren: ()=>import('./login/login.module').then(m => m.LoginPageModule)},
  { path: 'reset-password', loadChildren: ()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)},
  { path: 'success', loadChildren: ()=> import('./success/success.module').then(m => m.SuccessPageModule)},
  { path: 'account', loadChildren: ()=> import('./account/account.module').then(m => m.AccountPageModule), canActivate: [AuthGuard]},
  { path: 'verify_email', loadChildren: ()=> import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)},
  {path: 'qr', loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule), canActivate: [AuthGuard]},
  { path: 'charge-card', 
  loadChildren: ()=>import('./charge-card/charge-card.module').then(m => m.ChargeCardPageModule), canActivate: [AuthGuard]
  },
  { path: 'charge-cash', 
    loadChildren: ()=>import('./charge-cash/charge-cash.module').then(m => m.ChargeCashPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'bill-pay',
    loadChildren: () => import('./bill-pay/bill-pay.module').then( m => m.BillPayPageModule)
  },
  // {
  //   path: 'payroll',
  //   loadChildren: () => import('./payroll/payroll.module').then( m => m.PayrollPageModule)
  // },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'tx-detail/:id/:ext',
    loadChildren: () => import('./tx-detail/tx-detail.module').then( m => m.TxDetailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'qr-dashboard',
    loadChildren: () => import('./qr-dashboard/qr-dashboard.module').then( m => m.QrDashboardPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'qr-generate-info/:qroptions',
    loadChildren: () => import('./qr-generate-info/qr-generate-info.module').then( m => m.QrGenerateInfoPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'qr-standee',
    loadChildren: () => import('./qr-standee/qr-standee.module').then( m => m.QrStandeePageModule), canActivate: [AuthGuard],
  },
  {
    path: 'qr-payment/:totalamount',
    loadChildren: () => import('./qr-payment/qr-payment.module').then( m => m.QrPaymentPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule), canActivate: [AuthGuard],
  },
  {
    path: 'grid',
    loadChildren: () => import('./grid/grid.module').then( m => m.GridPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'agent-inquiry',
    loadChildren: () => import('./agent-inquiry/agent-inquiry.module').then( m => m.AgentInquiryPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'agents',
    loadChildren: () => import('./agents/agents.module').then( m => m.AgentsPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule), canActivate: [AuthGuard],
  },
  {  
    path: 'auth/email/:action',
    loadChildren: () => import('./email-customization/email-customization.module').then( m => m.EmailCustomizationPageModule), canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
