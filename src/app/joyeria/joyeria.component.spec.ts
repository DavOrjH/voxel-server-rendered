import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyeriaComponent } from './joyeria.component';

describe('JoyeriaComponent', () => {
  let component: JoyeriaComponent;
  let fixture: ComponentFixture<JoyeriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyeriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
