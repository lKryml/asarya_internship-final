import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(
      'http://195.234.122.131:8220/Controller/all_books'
    );
  }

  // create(book: Book): Observable<Book> {
  //   delete book.id;
  //   return this.http.post<Book>(`${this.api}/books/`, book);
  // }
  create(book: any) {
    // delete book.bookId;
    return this.http.post(
      'http://195.234.122.131:8220/Controller/add_book',
      null,
      {
        params: {
          Name: book.bookName,
          Quantity: book.quantity,
          Author: book.authorName,
        },
      }
    );
  }

  update(book: any): Observable<Book> {
    // return this.http.put<Book>(`${this.api}/books/${book.bookId}`, book);
    return this.http.put<Book>(
      'http://195.234.122.131:8220/Controller/update_book',
      null,
      {
        params: {
          id: book.bookId,
          BookName: book.bookName,
          Quantity: book.quantity,
          AuthorName: book.authorName,
        },
      }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `http://195.234.122.131:8220/Controller/delete_book/${id}`
    );
  }
}
