import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaosgroupComponent } from './chaosgroup.component';

describe('ChaosgroupComponent', () => {
  let component: ChaosgroupComponent;
  let fixture: ComponentFixture<ChaosgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaosgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaosgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
