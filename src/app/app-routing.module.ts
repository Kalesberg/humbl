import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/grid', pathMatch: 'full', canActivate: [AuthGuard],},
  { path: 'home', loadChildren: ()=> import('./tab1/tab1.module').then(m => m.Tab1PageModule)},
  { path: 'signup', loadChildren: ()=>import('./signup/signup.module').then(m => m.SignupPageModule)},
  { path: 'login', loadChildren: ()=>import('./login/login.module').then(m => m.LoginPageModule)},
  { path: 'reset-password', loadChildren: ()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)},
  { path: 'success', loadChildren: ()=> import('./success/success.module').then(m => m.SuccessPageModule)},
  { path: 'verify_email', loadChildren: ()=> import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)},
  { path: 'grid', loadChildren: () => import('./grid/grid.module').then( m => m.GridPageModule), canActivate: [AuthGuard]},
  { path: 'agents', loadChildren: () => import('./agents/agents.module').then( m => m.AgentsPageModule), canActivate: [AuthGuard]},
  { path: 'auth/email/:action', loadChildren: () => import('./email-customization/email-customization.module').then( m => m.EmailCustomizationPageModule)},
  { path: 'merchant', loadChildren: () => import('./merchant-menu/merchant-menu.module').then( m => m.MerchantMenuPageModule), canActivate: [AuthGuard]},
  { path: 'agent-terms', loadChildren: () => import('./agent-terms/agent-terms.module').then( m => m.AgentTermsPageModule)},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
