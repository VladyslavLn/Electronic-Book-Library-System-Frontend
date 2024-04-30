import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../service/books.service";
import {Book, CreateBookRating, CreateBookReview} from "../../models/books";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  book: Book;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadBookData()
  }

  loadBookData(): void {
    let bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(bookId).subscribe(
      value => {
        this.book = value;
        console.log(value);
      }
    );
  }

  addReview(content: string) {
    const bookReview: CreateBookReview = {
      content: content
    };
    this.bookService.addReviewToBook(bookReview, this.book.id).subscribe(() => {
      this.loadBookData();
    });
  }

  addRating(newRating: number) {
    const bookRating: CreateBookRating = {
      ratingValue: newRating
    };
    this.bookService.addRatingToBook(bookRating, this.book.id).subscribe(() => {
      this.loadBookData();
    });
  }

}
