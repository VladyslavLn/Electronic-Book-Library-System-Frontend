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
  bookCover: string | undefined;
  reviewValue: string;
  ratingValue: number;

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
        this.bookCover = this.getBookCover()
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

  getBookCover(): string | undefined {
    if (this.book.cover) {
      return 'data:image/jpg;base64,' + this.book.cover
    }
    return 'https://via.placeholder.com/150';
  }

  addReviewAndRating(reviewValue: string, ratingValue: number) {
    if (reviewValue) {
      if (ratingValue) {
        this.addReview(reviewValue);
        this.addRating(ratingValue);
      } else {
        alert('Please add a rating');
      }
    }
  }

  downloadBookFile() {
    this.bookService.downloadBookFile(this.book.id)
      .subscribe((response: any) => {
        console.log(response.headers);
        let filename = 'unknown';
        let contentDisposition = response.headers.get('content-disposition');
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        console.log(contentDisposition);
        let blob = new Blob([response.body], { type: response.type });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
