import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
@NgModule({
	declarations: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		ChatDetailsComponent
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
		ChatDetailsComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		VerifyEmailComponent,
		ChatDetailsComponent
	]
})
export class ComponentsModule { }
