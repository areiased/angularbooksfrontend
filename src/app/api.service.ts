import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCache, Book, AllBookIdsList } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  bookCache: BookCache = {};
  bookIdList: AllBookIdsList[];

  constructor(private http: HttpClient) { }

  // private _extractIdFromURL(url: string) {
  //   return url.substring(url.lastIndexOf('=') + 1);
  // }

  private _adaptBookFromServer(data: any, idcode: string): Book {

    if (data.details?.description?.value) {
      return {
        id: idcode || 'Not found.',
        title: data.details.title || 'No Title Found.',
        authors: data.details.publishers || 'No authors information given.',
        release_year: data.details.copyright_date || 'No release year given.',
        description: data.details.description.value || 'No description found for this book.',
        coverUrl: data.details.cover || 'Cover not found for this book.',
        genre: data.details.subjects || 'No genre given.',
        publishPlaces: data.details.publish_places || 'No publish places given.',
        numPages: data.details.pagination || 'Not given.',
        publishDate: data.details.publish_date || 'No publish date given.',
      };
    }
    return {
      id: idcode || 'Not found.',
      title: data.details.title || 'No Title Found.',
      authors: data.details.publishers || 'No authors information given.',
      release_year: data.details.copyright_date || 'No release year given.',
      description: data.details.description || 'No description found for this book.',
      coverUrl: data.details.cover || 'Cover not found for this book.',
      genre: data.details.subjects || 'No genre given.',
      publishPlaces: data.details.publish_places || 'No publish places given.',
      numPages: data.details.pagination || 'Not given.',
      publishDate: data.details.publish_date || 'No publish date given.',
    };
  }
  private _adaptBookListFromServer(data: any[]): AllBookIdsList[] {
    return data.map(
      books => { return {
          title: books.title_suggest,
          id: books.id
        };
      }
    );
  }

  getBookList(): Observable<AllBookIdsList[]> {
    return this.http.get('http://localhost:3000/search?author=tolkien').pipe(
        map<any, AllBookIdsList[]>( data => {
          const booksList = this._adaptBookListFromServer(data.docs);
          return booksList;
        }
      )
    );
  }

  getSingleBook(id: string): Observable<Book> {
    return this.http.get(`http://localhost:3000/books?id=${id}`).pipe(
      map<any, Book>(
        data => this._adaptBookFromServer(data, id),
        )
    );
  }

}
