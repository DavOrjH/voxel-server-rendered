import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayuApiComponent } from './payu-api.component';

describe('PayuApiComponent', () => {
  let component: PayuApiComponent;
  let fixture: ComponentFixture<PayuApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayuApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayuApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
