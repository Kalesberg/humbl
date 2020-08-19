import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SelectOptionsComponent } from './select-options/select-options.component';
@NgModule({
	declarations: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		SelectOptionsComponent
	],
	imports: [
		IonicModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule
	],
	exports: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		SelectOptionsComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		SelectOptionsComponent
	]
})
export class ComponentsModule { }
