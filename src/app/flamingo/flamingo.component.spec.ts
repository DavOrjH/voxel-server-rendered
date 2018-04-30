import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlamingoComponent } from './flamingo.component';

describe('FlamingoComponent', () => {
  let component: FlamingoComponent;
  let fixture: ComponentFixture<FlamingoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlamingoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlamingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
