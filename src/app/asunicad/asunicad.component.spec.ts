import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsunicadComponent } from './asunicad.component';

describe('AsunicadComponent', () => {
  let component: AsunicadComponent;
  let fixture: ComponentFixture<AsunicadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsunicadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsunicadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
