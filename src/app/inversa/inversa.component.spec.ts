import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InversaComponent } from './inversa.component';

describe('InversaComponent', () => {
  let component: InversaComponent;
  let fixture: ComponentFixture<InversaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InversaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InversaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
