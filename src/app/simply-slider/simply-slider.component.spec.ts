import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplySliderComponent } from './simply-slider.component';

describe('SimplySliderComponent', () => {
  let component: SimplySliderComponent;
  let fixture: ComponentFixture<SimplySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
