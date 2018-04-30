import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirebaseComponent } from './login-firebase.component';

describe('LoginFirebaseComponent', () => {
  let component: LoginFirebaseComponent;
  let fixture: ComponentFixture<LoginFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
