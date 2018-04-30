import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Digitalizacion3dComponent } from './digitalizacion-3d.component';

describe('Digitalizacion3dComponent', () => {
  let component: Digitalizacion3dComponent;
  let fixture: ComponentFixture<Digitalizacion3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Digitalizacion3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Digitalizacion3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
