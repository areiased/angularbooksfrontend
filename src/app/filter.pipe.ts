import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBookList', // nome pelo qual este pipe ira ser chamado no html da sidebar app
})
export class FilterPipe implements PipeTransform {
    transform(bookList: any, searchText: any) {
        if (!searchText) {
            return bookList; // se nao houver nada no search field, retorna a book list inteira
        }
        return bookList.filter(data => this.matchValue(data, searchText)); // retorna a lista ja filtrada
    }

    matchValue(data: any, searchedText: any) { // funcao para filtrar a lista pelo input da search field
        return Object.keys(data) // retorna o/os numeros/posicao no array dos livros, dos resultados encontrados
            .map(key => {
                return new RegExp(searchedText, 'gi').test(data[key]); // retorna as correspondencias
            }).some(result => result); // testa se os resultados obtidos "obedecem" às expectativas da funcao principal que os chamou
    }
}
