import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookAppComponent } from './book-app/book-app.component';


const routes: Routes = [
  { path: 'books/:id', component: BookAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
