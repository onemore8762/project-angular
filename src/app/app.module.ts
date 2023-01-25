import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CredentialsInterceptor } from './core/interseptors/credentials.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TodosModule, AuthModule, HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
