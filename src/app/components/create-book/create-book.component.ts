import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../service/books.service";
import {CreateBook} from "../../models/books";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  bookForm: FormGroup;
  @ViewChild('bookCreatedDialog') bookCreatedDialog: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router,
              private dialog: MatDialog) {
    this.bookForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      language: ['', Validators.required],
      file: new FormControl(null, Validators.required)
    });
  }

  handleFileInput(fileInput: any) {
    const file = fileInput.files[0];
    this.bookForm.get('file').setValue(file);
  }

  onSubmit() {
    const book: CreateBook = {
      author: this.bookForm.get('author').value,
      title: this.bookForm.get('title').value,
      language: this.bookForm.get('language').value
    };

    this.booksService.createBook(book, this.bookForm.get('file').value)
      .subscribe(data => {
        this.openDialog()

        this.dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/']);
        });
      });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.bookCreatedDialog);
  }
}
