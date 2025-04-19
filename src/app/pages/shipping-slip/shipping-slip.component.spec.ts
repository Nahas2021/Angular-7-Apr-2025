import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingSlipComponent } from './shipping-slip.component';

describe('ShippingSlipComponent', () => {
  let component: ShippingSlipComponent;
  let fixture: ComponentFixture<ShippingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
