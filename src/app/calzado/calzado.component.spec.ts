import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalzadoComponent } from './calzado.component';

describe('CalzadoComponent', () => {
  let component: CalzadoComponent;
  let fixture: ComponentFixture<CalzadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalzadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
