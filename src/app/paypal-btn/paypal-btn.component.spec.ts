import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalBtnComponent } from './paypal-btn.component';

describe('PaypalBtnComponent', () => {
  let component: PaypalBtnComponent;
  let fixture: ComponentFixture<PaypalBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
