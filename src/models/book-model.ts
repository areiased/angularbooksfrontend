interface Book {
    id: string;
    title: string;
    authors: string[];
    release_year: number;
    description: string;
    coverUrl: string;
    genre: string[];
    publishDate: string;
    publishPlaces: string[];
    numPages: string;
}

interface BookCache {
    [id: string]: string;
}

interface AllBookIdsList {
    title: string;
    id: string;
}

interface BookTitleLink {
    title: string;
    url: string;
}

export { Book, BookCache, AllBookIdsList, BookTitleLink };
