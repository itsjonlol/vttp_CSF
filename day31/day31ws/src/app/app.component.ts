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

  testVar:number[] = [];

  ngOnInit(): void {
    this.fruitService.getFruits().subscribe({
      next: (response: Fruit[]) => {
        this.fruits = response;

        // if want to map directly to a new list of cartitems
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
        // this.cartItems.push(cartItem);
        this.cartItems = [...this.cartItems,cartItem];
      }
      
    } else {
      this.cartItems[index].qty += event.qty
      this.cartItems[index].invTotalPrice = this.cartItems[index].qty*this.cartItems[index].price
      if (this.cartItems[index].qty <=0) {
        this.cartItems.splice(index, 1);
      }
    }
    
  
  }
  
  //to reset cart when form submitted
  resetCart(event:boolean) {
    if (event) {
      this.cartItems = []
    }
  }
  
  testCounter() {
    // this.testVar.push(1);

    // this works for onchanges()
    this.testVar=[...this.testVar,1]
  }

}
