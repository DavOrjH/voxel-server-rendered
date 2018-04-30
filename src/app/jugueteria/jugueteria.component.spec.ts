import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugueteriaComponent } from './jugueteria.component';

describe('JugueteriaComponent', () => {
  let component: JugueteriaComponent;
  let fixture: ComponentFixture<JugueteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugueteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugueteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
