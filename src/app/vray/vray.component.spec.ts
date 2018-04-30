import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrayComponent } from './vray.component';

describe('VrayComponent', () => {
  let component: VrayComponent;
  let fixture: ComponentFixture<VrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
