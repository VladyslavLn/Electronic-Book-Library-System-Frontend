import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";

const BASE_URL = ["http://localhost:8080/api/v1/"]
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(localStorage.getItem('token') != null);
  currentAuthStatus = this.authStatus.asObservable();
  private adminStatus = new BehaviorSubject<boolean>(false);
  currentAdminStatus = this.adminStatus.asObservable();


  constructor(private http: HttpClient,) {
  }

  register(registerRequest: any): Observable<any> {
    return this.http.post(
      BASE_URL + "auth/register", registerRequest
    )
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(
      BASE_URL + "auth/login", loginRequest
    )
  }

  checkTokenValidity(): Observable<boolean> {
    return this.http.get(BASE_URL + 'auth/check-token')
      .pipe(map(() => true),
        catchError(() => {
          return of(false);
        })
      );
  }

  changeAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  changeAdminStatus(status: boolean) {
    this.adminStatus.next(status);
  }
}
