import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArraychangesComponent } from './arraychanges.component';

describe('ArraychangesComponent', () => {
  let component: ArraychangesComponent;
  let fixture: ComponentFixture<ArraychangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArraychangesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArraychangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
