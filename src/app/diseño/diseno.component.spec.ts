import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseñoComponent } from './diseno.component';

describe('DiseñoComponent', () => {
  let component: DiseñoComponent;
  let fixture: ComponentFixture<DiseñoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseñoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseñoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
