import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliadosComponent } from './aliados.component';

describe('AliadosComponent', () => {
  let component: AliadosComponent;
  let fixture: ComponentFixture<AliadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
