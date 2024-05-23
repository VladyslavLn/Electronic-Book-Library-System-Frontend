import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {BooksService} from "../../service/books.service";
import {Book} from "../../models/books";
import {ResponseWithPagination} from "../../models/pagination";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  books: Book[] = [];
  pageEvent: PageEvent;
  length: number;
  pageSize: number;
  pageIndex: number;
  isAdmin: boolean;
  showModal = false;
  selectedBookId: number;

  constructor(private bookService: BooksService,
              private authService: AuthService,
              private userService: UserService) {
    this.authService.currentAdminStatus.subscribe(status => this.isAdmin = status);
  }

  ngOnInit(): void {
    this.loadBooks();
    let userInfoFromToken = this.userService.getUserInfoFromToken();
    if (userInfoFromToken != null) {
      this.isAdmin = this.userService.getUserInfoFromToken().roles.includes('ADMIN');
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.bookService.getALlBooksWithPagination(e.pageIndex, e.pageSize)
      .subscribe((response: ResponseWithPagination<Book>) => {
        this.books = response.content;
    })
  }

  getBookCover(book: Book): string {
    if (book.cover) {
      return 'data:image/jpg;base64,' + book.cover;
    }
    return 'https://via.placeholder.com/150';
  }

  openModal(id: number): void {
    this.selectedBookId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBookById(bookId).subscribe((resp) => {
      this.showModal = false;
      this.loadBooks();
    });
  }

  private loadBooks() {
    this.bookService.getALlBooksWithPagination(0, 16)
      .subscribe((response: ResponseWithPagination<Book>) => {
        this.books = response.content;
        this.length = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      });
  }
}
