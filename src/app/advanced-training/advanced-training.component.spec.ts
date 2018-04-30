import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTrainingComponent } from './advanced-training.component';

describe('AdvancedTrainingComponent', () => {
  let component: AdvancedTrainingComponent;
  let fixture: ComponentFixture<AdvancedTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
