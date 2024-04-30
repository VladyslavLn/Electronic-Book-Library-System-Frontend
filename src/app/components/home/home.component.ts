import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {BooksService} from "../../service/books.service";
import {Book} from "../../models/books";
import {ResponseWithPagination} from "../../models/pagination";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  books: Book[];
  displayedColumns: string[] = ['#', 'Author', 'Title', 'Language', 'Rating'];
  pageEvent: PageEvent;
  length: number;
  pageSize: number;
  pageIndex: number;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.getALlBooksWithPagination(0, 10)
      .subscribe((response: ResponseWithPagination<Book>) => {
      this.books = response.content;
      this.length = response.totalElements;
      this.pageSize = response.size;
      this.pageIndex = response.number;
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.bookService.getALlBooksWithPagination(e.pageIndex, e.pageSize)
      .subscribe((response: ResponseWithPagination<Book>) => {
        this.books = response.content;
    })
  }
}
