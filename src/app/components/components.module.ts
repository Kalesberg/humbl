import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
	declarations: [
		ChangePasswordComponent,
		VerifyEmailComponent
	],
	imports: [
		IonicModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule
	],
	exports: [
		ChangePasswordComponent,
		VerifyEmailComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		VerifyEmailComponent
	]
})
export class ComponentsModule { }
