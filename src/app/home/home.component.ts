import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable, take } from 'rxjs';
import { Book } from '../book';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  bookGroup = new FormGroup({
    bookId: new FormControl('-1', { nonNullable: true }),
    bookName: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    authorName: new FormControl('', Validators.required),
  });

  // book: Book = {
  //   id: 1,
  //   name: 'krymaapi',
  //   quantity: 1,
  //   author: 'awadwdawd',
  // };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => {
        this.books = books;
        console.log(books);
        console.log(this.books);
      });
  }

  createOrUpdateBook(): void {
    this.bookGroup.value.bookId === '-1'
      ? this.createBook()
      : this.updateBook();
  }

  createBook(): void {
    this.bookService
      .create(this.bookGroup.value)
      .pipe(take(1))
      .subscribe((createdBook) => {
        // this.books.push(createdBook as Book);
        // console.log(createdBook);
        // the above 2 lines are the optimal ones but the api changed for somereason now it dosent return the author name with the creation?
        this.ngOnInit();
        this.bookGroup.reset();
      });
  }

  updateBook(): void {
    this.bookService
      .update(this.bookGroup.value)
      .pipe(take(1))
      .subscribe((updatedBook) => {
        // console.log(this.bookGroup.value);
        const index = this.books.findIndex(
          (b) => b.bookId == updatedBook.bookId
        );
        // console.log(updatedBook);
        this.books[index] = updatedBook;
        this.bookGroup.reset();
      });
  }

  startEdit(index: number): void {
    this.bookGroup.patchValue(this.books[index]);
  }

  deleteBook(index: number): void {
    // console.log(this.books[index].bookId as string);
    this.bookService
      .delete(this.books[index].bookId as string)
      .subscribe(() => {
        this.books = this.books.filter(
          (b) => b.bookId !== this.books[index].bookId
        );
      });
  }
}
