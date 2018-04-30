import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencialComponent } from './presencial.component';

describe('PresencialComponent', () => {
  let component: PresencialComponent;
  let fixture: ComponentFixture<PresencialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresencialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
