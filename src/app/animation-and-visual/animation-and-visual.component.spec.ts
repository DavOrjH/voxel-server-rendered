import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationAndVisualComponent } from './animation-and-visual.component';

describe('AnimationAndVisualComponent', () => {
  let component: AnimationAndVisualComponent;
  let fixture: ComponentFixture<AnimationAndVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationAndVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationAndVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
