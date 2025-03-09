import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboPageComponent } from './combo-page.component';

describe('ComboPageComponent', () => {
  let component: ComboPageComponent;
  let fixture: ComponentFixture<ComboPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
