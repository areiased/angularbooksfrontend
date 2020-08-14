import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from 'src/models/book-model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-app',
    templateUrl: './book-app.component.html',
    styleUrls: ['./book-app.component.scss'],
})
export class BookAppComponent implements OnInit {
    @Output() hasCurrentRoute: EventEmitter<boolean> = new EventEmitter<boolean>();
    bookInfo: Book;
    id: string;
    title: string;
    authors: string[];
    description: string;
    publishDate: string;
    releaseYear: number;
    coverUrl: string;
    genre: string[];
    publishPlaces: string[];
    numPages: string;

    constructor(private route: ActivatedRoute, private api: ApiService) {}

    ngOnInit(): void {
            // retirar o id value da route / link atual do browser
            // fica subscribed, sempre que a route mudar ele executa tudo o que está dentro do subscribe
            this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.hasCurrentRoute.emit(true);


            // pegar no id e pedir à service o Book com este id, enviando o id para a service
            this.api.getSingleBook(id).subscribe(book => {
                this.id = book.id;
                this.title = book.title ?? 'Loading...';
                this.description = book.description;
                this.authors = book.authors;
                this.releaseYear = book.release_year;
                this.coverUrl = book.coverUrl;
                this.genre = book.genre;
                this.publishPlaces = book.publishPlaces;
                this.numPages = book.numPages;
                this.publishDate = book.publishDate;
            });
        });
    }
}
