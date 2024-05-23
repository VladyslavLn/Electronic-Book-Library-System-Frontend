import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ResponseWithPagination} from "../../models/pagination";
import {Book} from "../../models/books";
import {BooksService} from "../../service/books.service";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  books: Book[] = [];
  pageEvent: PageEvent;
  length: number;
  pageSize: number;
  pageIndex: number;
  showModal = false;
  selectedBookId: number;

  constructor(private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.loadMyBooks();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.bookService.getALlBooksWithPagination(e.pageIndex, e.pageSize)
      .subscribe((response: ResponseWithPagination<Book>) => {
        this.books = response.content;
      });
  }

  getBookCover(book: Book): string {
    if (book.cover) {
      return 'data:image/jpg;base64,' + book.cover;
    }
    return 'https://via.placeholder.com/150';
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBookById(bookId).subscribe((resp) => {
      this.showModal = false;
      this.loadMyBooks();
    });
  }

  openModal(id: number): void {
    this.selectedBookId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  private loadMyBooks() {
    this.bookService.getMyBooksWithPagination(0, 16)
      .subscribe((response: ResponseWithPagination<Book>) => {
        this.books = response.content;
        this.length = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      });
  }
}
