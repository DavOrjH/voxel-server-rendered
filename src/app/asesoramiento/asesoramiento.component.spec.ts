import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoramientoComponent } from './asesoramiento.component';

describe('AsesoramientoComponent', () => {
  let component: AsesoramientoComponent;
  let fixture: ComponentFixture<AsesoramientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesoramientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoramientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
