import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesisOrtesisComponent } from './protesis-ortesis.component';

describe('ProtesisOrtesisComponent', () => {
  let component: ProtesisOrtesisComponent;
  let fixture: ComponentFixture<ProtesisOrtesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtesisOrtesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesisOrtesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
