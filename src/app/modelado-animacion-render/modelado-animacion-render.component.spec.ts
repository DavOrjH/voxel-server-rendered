import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeladoAnimacionRenderComponent } from './modelado-animacion-render.component';

describe('ModeladoAnimacionRenderComponent', () => {
  let component: ModeladoAnimacionRenderComponent;
  let fixture: ComponentFixture<ModeladoAnimacionRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeladoAnimacionRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeladoAnimacionRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
