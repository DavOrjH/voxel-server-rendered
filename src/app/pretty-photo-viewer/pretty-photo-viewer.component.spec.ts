import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyPhotoViewerComponent } from './pretty-photo-viewer.component';

describe('PrettyPhotoViewerComponent', () => {
  let component: PrettyPhotoViewerComponent;
  let fixture: ComponentFixture<PrettyPhotoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettyPhotoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyPhotoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
