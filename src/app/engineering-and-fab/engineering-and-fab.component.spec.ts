import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginneringAndFabComponent } from './enginnering-and-fab.component';

describe('EnginneringAndFabComponent', () => {
  let component: EnginneringAndFabComponent;
  let fixture: ComponentFixture<EnginneringAndFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginneringAndFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginneringAndFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
