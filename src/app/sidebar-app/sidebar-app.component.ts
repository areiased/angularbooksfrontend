import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { BookTitleLink, AllBookIdsList } from 'src/models/book-model';

@Component({
    selector: 'app-sidebar-app',
    templateUrl: './sidebar-app.component.html',
    styleUrls: ['./sidebar-app.component.scss'],
})
export class SidebarAppComponent implements OnInit, OnDestroy {
    @Output() sidebarLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
    bookLinks: BookTitleLink[];
    bookLinksSub$: Subscription;
    public searchString: string; // valor do que o utilizador inseriu no campo da pesquisa, public para ficar acessivel pelo pipe
    searchbarEnable: boolean;
    // alguns titulos sao demasiado compridos e estragam o layout, definir aqui o comprimento maximo admitido, a partir do qual
    // os titles irao ser automaticamente truncados pelo substring()
    maxTitleLenght = 90;

    constructor(private api: ApiService) {}

    private _buildBookLinkList(books: AllBookIdsList[]): BookTitleLink[] {
        return books.map<BookTitleLink>(book => {
            return {
                title: book.title.substring(0, this.maxTitleLenght), // truncar titles com lenghts maiores que as esperadas
                url: `/books/${book.id}`,
            };
        });
    }

    ngOnInit(): void {
        console.log('bookList sidebar container was initialized');
        this.bookLinksSub$ = this.api.getBookList().subscribe(data => {
            this.bookLinks = this._buildBookLinkList(data);
            this.sidebarLoaded.emit(true); // true = success while fetching data from server
            this.searchbarEnable = true;
        });
        // error handling:
        setTimeout( () => { // using ()=> sintax so "this" context is preserved on setTimeout function
            if (!this.bookLinks) { // if BookLinks[] is still empty after X miliseconds
                this.sidebarLoaded.emit(false); // false = error
                console.log('Error loading sidebar. Server problem?');
                this.searchbarEnable = false;
            }
        }, 6000);
    }

    // ngOnDestroy provavelmente não necessário para este projeto dado o objetivo do site, mas still
    ngOnDestroy(): void {
        console.log('bookList sidebar container was destroyed');
        this.bookLinksSub$.unsubscribe();
    }
}
