import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhinonestComponent } from './rhinonest.component';

describe('RhinonestComponent', () => {
  let component: RhinonestComponent;
  let fixture: ComponentFixture<RhinonestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhinonestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhinonestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
