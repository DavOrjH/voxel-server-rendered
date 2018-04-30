import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasDeTransporteComponent } from './sistemas-de-transporte.component';

describe('SistemasDeTransporteComponent', () => {
  let component: SistemasDeTransporteComponent;
  let fixture: ComponentFixture<SistemasDeTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemasDeTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemasDeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
