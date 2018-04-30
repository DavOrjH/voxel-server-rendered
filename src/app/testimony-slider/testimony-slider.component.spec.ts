import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonySliderComponent } from './testimony-slider.component';

describe('TestimonySliderComponent', () => {
  let component: TestimonySliderComponent;
  let fixture: ComponentFixture<TestimonySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
