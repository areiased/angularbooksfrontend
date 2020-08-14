import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-main-app',
    templateUrl: './main-app.component.html',
    styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
    currentRouteBookApp: string;
    sidebarLoaded = false;
    sidebarOpened: boolean;
    // message to be sent to err on sidebar loading error (server failed to sent data on time)
    sidebarErrorMsg =
        `Oh no! :(
        It was taking too long to fetch the book list, so we gave up. Please try again. If it keeps failing, try again later.`;
    err = ''; // default error message is empty (SHOULD ALWAYS BE EMPTY HERE)
    sidebarToggle = true; // by default the sidebar will be true = open (for mobile this state is changed via CSS media-queries)
    currentRoute: boolean;
    constructor(
        // private router: Router,
        // private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // this.router.events
        //     .pipe(
        //         filter(event => event instanceof NavigationEnd),
        //         map(() => this.activatedRoute),
        //         map(route => route.firstChild)
        //     )
        //     .subscribe(route => {
        //         route.paramMap.subscribe(params => {
        //             const routeID = params.get('id');
        //             console.log('Active book ID at wesbite load time: ' + routeID);
        //             this.currentRouteBookApp = routeID;
        //         });
        //     });
    }

    _sidebarLoaded(success: boolean) {
        if (success) {
            // no error, success
            this.sidebarLoaded = true;
            this.err = ''; // enforce the empty string, just in case :3
            console.log(
                'Sidebar built. Server successfully sent the data on time.'
            );
        }
        if (!success) {
            // if error loading sidebar, return error message
            this.sidebarLoaded = true; // so the loading animation disappears anyway
            this.err = this.sidebarErrorMsg; // send the error message to the err variable
            console.log(this.err);
        }
    }

    _toggleSideBar() {
        this.sidebarToggle = !this.sidebarToggle;
    }
}
