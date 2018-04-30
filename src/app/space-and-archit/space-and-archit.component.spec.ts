import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceAndArchitComponent } from './space-and-archit.component';

describe('SpaceAndArchitComponent', () => {
  let component: SpaceAndArchitComponent;
  let fixture: ComponentFixture<SpaceAndArchitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceAndArchitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceAndArchitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
