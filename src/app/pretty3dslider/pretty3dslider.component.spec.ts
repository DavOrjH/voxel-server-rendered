import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pretty3dsliderComponent } from './pretty3dslider.component';

describe('Pretty3dsliderComponent', () => {
  let component: Pretty3dsliderComponent;
  let fixture: ComponentFixture<Pretty3dsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pretty3dsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pretty3dsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
