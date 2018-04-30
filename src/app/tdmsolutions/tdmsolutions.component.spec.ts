import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdmsolutionsComponent } from './tdmsolutions.component';

describe('TdmsolutionsComponent', () => {
  let component: TdmsolutionsComponent;
  let fixture: ComponentFixture<TdmsolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdmsolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdmsolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
