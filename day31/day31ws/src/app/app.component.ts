import { Component, inject, OnInit } from '@angular/core';
import { FruitService } from './services/fruit.service';
import { CartItem, Fruit, QuantityDelta } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  fruitService = inject(FruitService);

  fruits:Fruit[] = []
  cartItems: CartItem[] = []

  ngOnInit(): void {
    this.fruitService.getFruits().subscribe({
      next: (response: Fruit[]) => {
        this.fruits = response;
        // this.cartItems = this.fruits.map(fruit => ({
        //   name: fruit.name,
        //   qty: fruit.qty,
        //   price:0,
        //   invTotalPrice: fruit.price * fruit.qty
        // }));
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
}

  handleDeltaQty(event: QuantityDelta) {
    
    // for ( let i = 0; i<this.fruits.length;i++) {

    //   if (this.fruits[i].name === event.name) {
    //     console.log(this.fruits[i].name)
    //     this.fruits[i].qty += event.qty;
    //     if (this.fruits[i].qty <=0) {
    //       this.fruits[i].qty = 0
    //     }
    //     console.log(this.fruits[i].qty)
    //   }
    // }

    //update cart
    const cartItem:CartItem = {
      name: event.name,
      qty: event.qty,
      price: event.price,
      invTotalPrice: event.qty * event.price
    }

    const index = this.cartItems.findIndex(item => {
      return item.name === event.name
       
    })

    if (index === -1) {
      if (event.qty>0) {
        this.cartItems.push(cartItem);
      }
      
    } else {
      this.cartItems[index].qty += event.qty
      this.cartItems[index].invTotalPrice = this.cartItems[index].qty*this.cartItems[index].price
      if (this.cartItems[index].qty <=0) {
        this.cartItems.splice(index, 1);
      }
    }
    
    // this.cartItems.push(cartItem);
    
    

    // for ( let i = 0; i<this.cartItems.length;i++) {

    //   if (this.cartItems[i].name === event.name) {
    //     console.log(this.cartItems[i].name)
    //     this.cartItems[i].qty += event.qty;
    //     if (this.cartItems[i].qty <=0) {
    //       this.cartItems[i].qty = 0
    //     }
    //     this.cartItems[i].invTotalPrice = this.cartItems[i].qty* this.fruits[i].price
    //     console.log(this.cartItems[i].qty)
    //   }
    // }

  }
  
  resetCart(event:boolean) {
    if (event) {
      this.cartItems = []
    }
  }
  
}
