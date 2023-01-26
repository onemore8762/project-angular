import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { CommonResponse } from '../models/core.models'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from '../models/auth.models'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false

  resolveAuthRequest: any
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponse>(`${environment.baseUrl}auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logOut() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        }
      })
  }

  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
