import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClayooComponent } from './clayoo.component';

describe('ClayooComponent', () => {
  let component: ClayooComponent;
  let fixture: ComponentFixture<ClayooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClayooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
