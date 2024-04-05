import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, BookResponseWithPagination} from "../models/books";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }


  createBook(): Observable<Book> {
    return null;
  }

  getALlBooksWithPagination(pageIndex: number, pageSize: number): Observable<BookResponseWithPagination<Book>> {
    return this.http
      .get<BookResponseWithPagination<Book>>(`http://localhost:8080/api/v1/books?page=${pageIndex}&size=${pageSize}`);
  }

  getBookById(): Observable<Book> {
    return null;
  }

  deleteBookById() {

  }

}
