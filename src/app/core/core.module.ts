import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CoreRoutingModule } from './core-routing.module'
import { AuthService } from './services/auth.service'
import { NotificationService } from './services/notification.service'

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [AuthService, NotificationService],
})
export class CoreModule {}
