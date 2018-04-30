import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhinocerosComponent } from './rhinoceros.component';

describe('RhinocerosComponent', () => {
  let component: RhinocerosComponent;
  let fixture: ComponentFixture<RhinocerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhinocerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhinocerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
