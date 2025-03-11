import { Component, OnInit } from '@angular/core';
import { Cart, cartDB, MyCartDB } from '../shared/cartapp.db';

@Component({
  selector: 'app-cartdb',
  standalone: false,
  templateUrl: './cartdb.component.html',
  styleUrl: './cartdb.component.css'
})
export class CartdbComponent implements OnInit{


  carts: Cart[] = [
    {
      cartId: 1,
      username: 'fred',
      date: new Date().getTime(),
      contents: [
        { description: 'Item 1', price: 10 },
        { description: 'Item 2', price: 20 }
      ]
    },
    {
      cartId: 2,
      username: 'alice',
      date: new Date().getTime(),
      contents: [
        { description: 'Laptop', price: 1200 },
        { description: 'Mouse', price: 25 }
      ]
    },
    {
      cartId: 3,
      username: 'bob',
      date: new Date().getTime(),
      contents: [
        { description: 'Book', price: 15 },
        { description: 'Pen', price: 5 },
        { description: 'Notebook', price: 8 }
      ]
    },
    {
      cartId: 4,
      username: 'charlie',
      date: new Date().getTime(),
      contents: [
        { description: 'Phone', price: 800 },
        { description: 'Charger', price: 40 }
      ]
    },
    {
      cartId: 5,
      username: 'dave',
      date: new Date().getTime(),
      contents: [
        { description: 'Headphones', price: 100 },
        { description: 'Speaker', price: 150 }
      ]
    }
  ];
  /*
  	•	async makes the function return a Promise automatically.
	•	await ensures this.cart.bulkAdd(carts); finishes before continuing.
  */

  async ngOnInit(): Promise<void> {
    const existingCart = await cartDB.getAllCarts();
    if ( existingCart.length > 0) {
      console.log("Alr have cart existing in indexeddb")
    } else {
      console.log("No cart existing")
      await cartDB.bulkAddCart(this.carts);

    }
    // await cartDB.bulkAddCart(this.carts)
    // await cartDB.bulkPutCart(this.carts)

    setTimeout( async ()=> await cartDB.deleteCart(1),3000)

    // cartDB.cart.get(2).then((cart)=>console.log(cart))
    // await cartDB.deleteCart(1)

    console.log(await cartDB.cart.get(2))

    await cartDB.cart.where('username').anyOf('bob').delete();
    
    
  }
}
