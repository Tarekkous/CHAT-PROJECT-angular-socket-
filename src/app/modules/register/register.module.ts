import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { ShareModule } from '../share/share.module';
import { RegisterComponent } from 'src/app/components/register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, ShareModule],
  exports: [CommonModule, RegisterRoutingModule, ShareModule],
})
export class RegisterModule {}
