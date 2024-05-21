import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseWithPagination} from "../models/pagination";
import {UpdateUser, User, UserJwt} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  helper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllUsers(page: number, size: number): Observable<ResponseWithPagination<User>> {
    return this.httpClient.get<ResponseWithPagination<User>>(`http://localhost:8080/api/v1/users?page=${page}&size=${size}`);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/api/v1/users/${id}`);
  }

  updateUser(userId: number, user: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:8080/api/v1/users/${userId}`, user);
  }

  deleteUserById(id: number):Observable<object> {
    return this.httpClient.delete(`http://localhost:8080/api/v1/users/${id}`);
  }

  getUserInfoFromToken(): UserJwt {
    let token = localStorage.getItem("token")
    let decodedToken = this.helper.decodeToken(token);
    return {
      userId: decodedToken.userId,
      email: decodedToken.sub,
      roles: decodedToken.roles
    };
  }
}
