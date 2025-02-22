import { Component, Input, Output } from '@angular/core';
import { CartItem, Fruit, QuantityDelta } from '../../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-displayfruit',
  standalone: false,
  templateUrl: './displayfruit.component.html',
  styleUrl: './displayfruit.component.css'
})
export class DisplayfruitComponent {
  @Input({ required: true })
  invFruit: Fruit = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    qty:0
  }

  @Output() 
  changeQty = new Subject<QuantityDelta>();
  
  quantity:number=0;

  cartItem!:CartItem 
  
  quantityDelta!:QuantityDelta

  // object:any = {
  //   name:this.invFruit.name,
  //   qty:this.quantity,
  //   invPrice:this.invFruit.qty * this.invFruit.price
  // }

  increaseQty() {
    this.quantityDelta = {
      name:this.invFruit.name,
      price:this.invFruit.price,
      qty: 1
    }
    // this.quantity++;
    // this.cartItem = {
    //   name:this.invFruit.name,
    //   qty:this.quantity,
    //   invTotalPrice:this.invFruit.price
    // }
    this.changeQty.next(this.quantityDelta)
    
  }
  decreaseQty() {
    // this.quantity--;

    // if (this.quantity < 0) {
    //   this.quantity = 0
    // }
    // this.cartItem = {
    //   name:this.invFruit.name,
    //   qty:this.quantity,
    //   invTotalPrice:this.invFruit.price
    // }

    this.quantityDelta = {
      name:this.invFruit.name,
      price:this.invFruit.price,
      qty: -1
    }
    this.changeQty.next(this.quantityDelta)
  }

}
