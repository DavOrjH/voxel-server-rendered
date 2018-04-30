import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McneelComponent } from './mcneel.component';

describe('McneelComponent', () => {
  let component: McneelComponent;
  let fixture: ComponentFixture<McneelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McneelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McneelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
