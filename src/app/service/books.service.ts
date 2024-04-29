import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/books";
import {ResponseWithPagination} from "../models/pagination";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }


  createBook(): Observable<Book> {
    return null;
  }

  getALlBooksWithPagination(pageIndex: number, pageSize: number): Observable<ResponseWithPagination<Book>> {
    return this.http
      .get<ResponseWithPagination<Book>>(`http://localhost:8080/api/v1/books?page=${pageIndex}&size=${pageSize}`);
  }

  getBookById(): Observable<Book> {
    return null;
  }

  deleteBookById() {
    return null;
  }

}
