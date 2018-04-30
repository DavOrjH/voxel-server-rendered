import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeVoxelComponent } from './acerca-de-voxel.component';

describe('AcercaDeVoxelComponent', () => {
  let component: AcercaDeVoxelComponent;
  let fixture: ComponentFixture<AcercaDeVoxelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercaDeVoxelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaDeVoxelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
