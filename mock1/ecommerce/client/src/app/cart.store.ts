
// TODO Task 2

import { ComponentStore } from "@ngrx/component-store";

import { Injectable } from "@angular/core";
import { Product } from "./models";
import { Observable } from "rxjs";

// same as model, just using it here
// export interface Product {
//     prodId: string
//     name: string
//     brand: string
//     price: number
//     discountPrice: number
//     image: string
//     quantity: string
//   }
// same as model, just using it here
export interface LineItem {
    prodId: string
    quantity: number
    name: string
    price: number
  }
 
export interface LineItemState {
    lineItems:LineItem[]
}

const INIT_STATE = {
    lineItems:[]
}

@Injectable({
    providedIn: 'root'
})

// Use the following class to implement your store
export class CartStore extends ComponentStore<LineItemState>{

    constructor() {
        super(INIT_STATE)
    }

    readonly addProductToCart = this.updater((state,lineItem:LineItem) => ({
        ...state,
        lineItems: [...state.lineItems,lineItem]
    }))

    readonly itemsCount$:Observable<number> = this.select((state)=>{
        
        const uniqueCategories = new Set(state.lineItems.map(item => item.prodId));

        return uniqueCategories.size

    })

    readonly cartItems$:Observable<LineItem[]> = this.select((state) => state.lineItems)

    readonly getTotalPrice:Observable<number> = this.select((state) => {
        let price = 0;
        
        state.lineItems.forEach((item) => price+= item.price*item.quantity)
        return price;

    })




}
