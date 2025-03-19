import Dexie,{Table} from 'dexie';

export interface Item {
    description:string,
    price:number
}

export interface Cart {
    cartId:number;
    username: string;
    date:number;
    contents:Item[];
}

export class MyCartDB extends Dexie {

    cart: Dexie.Table<Cart,number>


    constructor() {
        super('MyStoreDb')
        this.version(1).stores({
            cart: '++cartId,username'
        })
        this.cart  = this.table('cart')
    }

  async addCart(cart:Cart):Promise <void> {
      await this.cart.add(cart);
  }

  async bulkAddCart(newCarts:Cart[]):Promise <void> {
      await this.cart.bulkAdd(newCarts);
  }

  async bulkPutCart(newCarts:Cart[]):Promise <void> {
    await this.cart.bulkPut(newCarts);
}
  async clearCart():Promise<void> {
    await this.cart.clear();
  }
    
    // Read (Get a Cart by ID)
  async getCartById(cartId: number): Promise<Cart | undefined> {
    const cart = await this.cart.get(cartId);

    return cart;
  }

  // Read (Get All Carts). Returns the entire collection as an array
  async getAllCarts(): Promise<Cart[]> {
    const carts = await this.cart.toArray();

    // return 50 documents starting from the 50th document
//     const carts: Cart[] = await this.cart
//   .offset(50)
//   .limit(50)
//   .toArray();
   
    return carts;
  }

  // Update (Modify a Cart)
  async updateCart(cartId: number, updatedCart: Partial<Cart>): Promise<void> {
    await this.cart.update(cartId, updatedCart);
    // await this.cart.put(updatedCart);
    console.log('Cart updated:', updatedCart);
  }

  // Delete (Remove a Cart by ID)
  async deleteCart(cartId: number): Promise<void> {
    await this.cart.delete(cartId);
    console.log('Cart deleted:', cartId);
  }

  // Filter carts by date
  async filterCartsByDate(yesterday: number): Promise<Cart[]> {
    const carts: Cart[] = await this.cart
      .filter(c => c.date > yesterday)
      .toArray();
    return carts;
  }

  // Filter carts by username
  async filterCartsByUsername(username: string): Promise<Cart[]> {
    const carts: Cart[] = await this.cart
      .where('username')
      .equals(username)
      .toArray();
    return carts;
  }

  // Filter carts by username AND date
  async filterCartsByUsernameAndDate(username: string, yesterday: number): Promise<Cart[]> {
    const carts: Cart[] = await this.cart
      .where('username')
      .equals(username)
      .and(c => c.date > yesterday)
      .toArray();
    return carts;
  }

  // Process carts by username AND date (one at a time)
  async processCartsByUsernameAndDate(username: string, yesterday: number, callback: (cart: Cart) => void): Promise<void> {
    await this.cart
      .where('username')
      .equals(username)
      .and(c => c.date > yesterday)
      .each(cart => {
        callback(cart); // Process each matching cart
      });
  }


}

export const cartDB = new MyCartDB();


// // ✅ Add a cart (Returns Observable)
// addCart(cart: Cart): Observable<void> {
//   return from(this.cart.add(cart));
// }

// // ✅ Bulk Add carts (Returns Observable)
// bulkAddCart(newCarts: Cart[]): Observable<void> {
//   return from(this.cart.bulkAdd(newCarts));
// }

// // ✅ Bulk Put carts (Returns Observable)
// bulkPutCart(newCarts: Cart[]): Observable<void> {
//   return from(this.cart.bulkPut(newCarts));
// }

// // ✅ Clear all carts (Returns Observable)
// clearCart(): Observable<void> {
//   return from(this.cart.clear());
// }

// // ✅ Get a Cart by ID (Returns Observable<Cart | undefined>)
// getCartById(cartId: number): Observable<Cart | undefined> {
//   return from(this.cart.get(cartId));
// }

// // ✅ Get all carts (Returns an Observable that updates when the DB changes)
// getAllCarts(): Observable<Cart[]> {
//   return new Observable(subscriber => {
//     const query = liveQuery(() => this.cart.toArray());
//     const subscription = query.subscribe({
//       next: carts => subscriber.next(carts),
//       error: err => subscriber.error(err),
//     });
//     return () => subscription.unsubscribe(); // Cleanup
//   });
// }

// // ✅ Update a cart (Returns Observable)
// updateCart(cartId: number, updatedCart: Partial<Cart>): Observable<void> {
//   return from(this.cart.update(cartId, updatedCart));
// }

// // ✅ Delete a cart by ID (Returns Observable)
// deleteCart(cartId: number): Observable<void> {
//   return from(this.cart.delete(cartId));
// }

// // ✅ Filter carts by date (Returns Observable)
// filterCartsByDate(yesterday: number): Observable<Cart[]> {
//   return from(this.cart.filter(c => c.date > yesterday).toArray());
// }

// // ✅ Filter carts by username (Returns Observable)
// filterCartsByUsername(username: string): Observable<Cart[]> {
//   return from(this.cart.where('username').equals(username).toArray());
// }

// // ✅ Filter carts by username AND date (Returns Observable)
// filterCartsByUsernameAndDate(username: string, yesterday: number): Observable<Cart[]> {
//   return from(
//     this.cart
//       .where('username')
//       .equals(username)
//       .and(c => c.date > yesterday)
//       .toArray()
//   );
// }

// // ✅ Process carts by username AND date (Returns Observable<void>)
// processCartsByUsernameAndDate(username: string, yesterday: number, callback: (cart: Cart) => void): Observable<void> {
//   return from(
//     this.cart
//       .where('username')
//       .equals(username)
//       .and(c => c.date > yesterday)
//       .each(cart => {
//         callback(cart);
//       })
//   );
// }