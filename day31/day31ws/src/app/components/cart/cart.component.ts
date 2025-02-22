import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem, Fruit } from '../../../models';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  

  @Input({ required: true })
  invCartItem!: CartItem

  

 
  
 


}
