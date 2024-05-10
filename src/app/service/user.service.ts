import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseWithPagination} from "../models/pagination";
import {UpdateUser, User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  deleteUserById(id: number) {
    this.httpClient.delete(`http://localhost:8080/api/v1/users/${id}`);
  }
}
