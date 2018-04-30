import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BongoComponent } from './bongo.component';

describe('BongoComponent', () => {
  let component: BongoComponent;
  let fixture: ComponentFixture<BongoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BongoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
