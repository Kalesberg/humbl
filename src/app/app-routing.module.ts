import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard],},
  { path: 'home', loadChildren: ()=> import('./tab1/tab1.module').then(m => m.Tab1PageModule)},
  { path: 'pos', loadChildren: ()=>import('./tab2/tab2.module').then(m => m.Tab2PageModule), canActivate: [AuthGuard]},
  { path: 'settings', loadChildren: ()=>import('./tab3/tab3.module').then(m => m.Tab3PageModule), canActivate: [AuthGuard]},
  { path: 'messages', loadChildren: ()=>import('./messages/messages.module').then(m => m.MessagesPageModule), canActivate: [AuthGuard]},
  { path: 'reports', loadChildren: ()=>import('./tab4/tab4.module').then(m => m.Tab4PageModule), canActivate: [AuthGuard]},
  { path: 'signup', loadChildren: ()=>import('./signup/signup.module').then(m => m.SignupPageModule)},
  { path: 'login', loadChildren: ()=>import('./login/login.module').then(m => m.LoginPageModule)},
  { path: 'reset-password', loadChildren: ()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)},
  { path: 'success', loadChildren: ()=> import('./success/success.module').then(m => m.SuccessPageModule)},
  { path: 'account', loadChildren: ()=> import('./account/account.module').then(m => m.AccountPageModule), canActivate: [AuthGuard]},
  {path: 'qr/:qroptions', loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule), canActivate: [AuthGuard]},
  { path: 'charge-card', 
  loadChildren: ()=>import('./charge-card/charge-card.module').then(m => m.ChargeCardPageModule), canActivate: [AuthGuard]
  },
  { path: 'charge-cash', 
    loadChildren: ()=>import('./charge-cash/charge-cash.module').then(m => m.ChargeCashPageModule), canActivate: [AuthGuard]
  },
  // {
  //   path: 'bill-pay',
  //   loadChildren: () => import('./bill-pay/bill-pay.module').then( m => m.BillPayPageModule)
  // },
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
    loadChildren: () => import('./qr-dashboard/qr-dashboard.module').then( m => m.QrDashboardPageModule)
  },
  {
    path: 'qr-generate-info/:qroptions',
    loadChildren: () => import('./qr-generate-info/qr-generate-info.module').then( m => m.QrGenerateInfoPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}