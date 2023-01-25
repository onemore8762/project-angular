import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TodosModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
