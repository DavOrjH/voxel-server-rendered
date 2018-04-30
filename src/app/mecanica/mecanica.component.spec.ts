import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicaComponent } from './mecanica.component';

describe('MecanicaComponent', () => {
  let component: MecanicaComponent;
  let fixture: ComponentFixture<MecanicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
