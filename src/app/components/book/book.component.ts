import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../service/books.service";
import {Book, CreateBookRating, CreateBookReview, UpdateBook} from "../../models/books";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {EditBookComponent} from "../edit-book/edit-book.component";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";

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
  isAdmin: boolean;

  constructor(
    private bookService: BooksService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.authService.currentAdminStatus.subscribe(status => this.isAdmin = status);
  }

  ngOnInit(): void {
    this.loadBookData();
    let userInfoFromToken = this.userService.getUserInfoFromToken();
    if (userInfoFromToken != null) {
      this.isAdmin = this.userService.getUserInfoFromToken().roles.includes('ADMIN');
    }
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
    if (reviewValue && ratingValue) {
      this.addReview(reviewValue);
      this.addRating(ratingValue);
      this.dialog.open(WarningDialogComponent, {
        data: 'Review and rating successfully added !',
      });
    }
    if (reviewValue && !ratingValue) {
      this.dialog.open(WarningDialogComponent, {
        data: 'Please add a rating',
      });
    }
    if (ratingValue && !reviewValue) {
      this.dialog.open(WarningDialogComponent, {
        data: 'Please add a review',
      });
    }
  }

  downloadBookFile() {
    this.bookService.downloadBookFile(this.book.id)
      .subscribe((response: any) => {
        let filename = 'unknown';
        let contentDisposition = response.headers.get('content-disposition');
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let blob = new Blob([response.body], {type: response.type});
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  openEditBookDialog(): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: {
        book: this.book,
        dialogTitle: 'Edit Book',
        dialogText: 'Please edit the book information and press submit to save changes.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBook(result);
      }
    });
  }

  updateBook(updatedBook: UpdateBook): void {
    this.bookService.updateBook(this.book.id, updatedBook).subscribe(() => {
      this.loadBookData();
    });
  }

  isBookRelativeToUser(book: Book): boolean {
    let userInfo = this.userService.getUserInfoFromToken();
    if (userInfo) {
      return userInfo.userId === book.user.id;
    }
    return false;
  }
}
