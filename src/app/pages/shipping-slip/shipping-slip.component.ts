import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-shipping-slip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-slip.component.html',
  styleUrls: ['./shipping-slip.component.css']
})
export class ShippingSlipComponent {
  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = this.basketService.getOrderById(id);
  }

  get physicalItems() {
    return this.order?.items?.filter((item: any) => item.isPhysical);
  }
}
