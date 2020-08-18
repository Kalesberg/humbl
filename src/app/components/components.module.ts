import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { SelectOptionsComponent } from './select-options/select-options.component';
@NgModule({
	declarations: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		ChatDetailsComponent,
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
		ChatDetailsComponent,
		SelectOptionsComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		ChatDetailsComponent,
		SelectOptionsComponent
	]
})
export class ComponentsModule { }
