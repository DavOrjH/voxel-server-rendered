import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosDeExitoComponent } from './casos-de-exito.component';

describe('CasosDeExitoComponent', () => {
  let component: CasosDeExitoComponent;
  let fixture: ComponentFixture<CasosDeExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasosDeExitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasosDeExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
