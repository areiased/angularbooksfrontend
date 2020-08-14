import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainAppComponent } from './main-app/main-app.component';
import { BookAppComponent } from './book-app/book-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarAppComponent } from './sidebar-app/sidebar-app.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        MainAppComponent,
        BookAppComponent,
        SidebarAppComponent,
        FilterPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatListModule,
        MatDividerModule,
        MatToolbarModule,
        MatTabsModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatRippleModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
