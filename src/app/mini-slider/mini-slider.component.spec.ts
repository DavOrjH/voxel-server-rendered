import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSliderComponent } from './mini-slider.component';

describe('MiniSliderComponent', () => {
  let component: MiniSliderComponent;
  let fixture: ComponentFixture<MiniSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
