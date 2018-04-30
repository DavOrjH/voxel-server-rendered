import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototipadoRapidoComponent } from './prototipado-rapido.component';

describe('PrototipadoRapidoComponent', () => {
  let component: PrototipadoRapidoComponent;
  let fixture: ComponentFixture<PrototipadoRapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrototipadoRapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototipadoRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
