import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, BookRating, BookReview, CreateBook, CreateBookRating, CreateBookReview} from "../models/books";
import {ResponseWithPagination} from "../models/pagination";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  createBook(book: CreateBook, file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('book', new Blob([JSON.stringify(book)], {
      type: "application/json"
    }));
    formData.append('file', file);

    return this.http.post('http://localhost:8080/api/v1/books', formData);
  }

  getALlBooksWithPagination(pageIndex: number, pageSize: number): Observable<ResponseWithPagination<Book>> {
    return this.http
      .get<ResponseWithPagination<Book>>(`http://localhost:8080/api/v1/books?page=${pageIndex}&size=${pageSize}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:8080/api/v1/books/${id}`);
  }

  deleteBookById(id: number) {
    this.http.delete(`http://localhost:8080/api/v1/books/${id}`);
  }

  addReviewToBook(bookReview: CreateBookReview, id: number): Observable<BookReview> {
    return this.http.post<BookReview>(`http://localhost:8080/api/v1/books/${id}/review`, bookReview )
  }

  addRatingToBook(bookRating: CreateBookRating, id: number): Observable<BookRating> {
    return this.http.post<BookRating>(`http://localhost:8080/api/v1/books/${id}/rating`, bookRating)
  }

  downloadBookFile(bookId: number) {
    return this.http.get(`http://localhost:8080/api/v1/books/${bookId}/file/download`, { observe: 'response', responseType: 'blob' });
  }
}
