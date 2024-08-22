import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedInputSelectComponent } from './advanced-input-select.component';

describe('AdvancedInputSelectComponent', () => {
  let component: AdvancedInputSelectComponent;
  let fixture: ComponentFixture<AdvancedInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedInputSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
