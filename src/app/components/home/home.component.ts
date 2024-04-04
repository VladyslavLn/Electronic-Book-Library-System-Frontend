import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  books: any
  displayedColumns: string[] = ['#', 'Author', 'Name', 'Language'];
  pageEvent: PageEvent;
  length: number
  pageSize: number
  pageIndex: number

  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client.get("http://localhost:8080/api/v1/books").subscribe((response: any) => {
      this.books = response
      this.length = response.totalElements
      this.pageSize = response.size
      this.pageIndex = response.number
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.client.get(`http://localhost:8080/api/v1/books?page=${this.pageIndex}&size=${this.pageSize}`)
      .subscribe((response: any) => {
      this.books = response
    })
  }
}
