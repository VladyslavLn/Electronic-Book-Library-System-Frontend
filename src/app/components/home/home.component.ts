import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";
import {BooksService} from "../../service/books.service";
import {Book, BookResponseWithPagination} from "../../models/books";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  books: Book[];
  displayedColumns: string[] = ['#', 'Author', 'Name', 'Language'];
  pageEvent: PageEvent;
  length: number;
  pageSize: number;
  pageIndex: number;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.getALlBooksWithPagination(0, 10)
      .subscribe((response: BookResponseWithPagination<Book>) => {
      debugger;
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
      .subscribe((response: BookResponseWithPagination<Book>) => {
        this.books = response.content;
    })
  }
}
