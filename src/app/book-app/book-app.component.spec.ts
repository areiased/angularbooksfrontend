import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppComponent } from './book-app.component';

describe('BookAppComponent', () => {
  let component: BookAppComponent;
  let fixture: ComponentFixture<BookAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
