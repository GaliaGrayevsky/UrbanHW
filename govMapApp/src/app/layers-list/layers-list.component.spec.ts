import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerslistComponent } from './layers-list.component';

describe('LayerslistComponent', () => {
  let component: LayerslistComponent;
  let fixture: ComponentFixture<LayerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
