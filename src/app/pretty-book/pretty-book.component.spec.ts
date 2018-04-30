import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyBookComponent } from './pretty-book.component';

describe('PrettyBookComponent', () => {
  let component: PrettyBookComponent;
  let fixture: ComponentFixture<PrettyBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettyBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
