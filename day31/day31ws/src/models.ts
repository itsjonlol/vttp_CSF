export interface Fruit {
    id:number;
    name:string;
    image:string;
    price:number;
    qty:number;
   
    
}

export interface CartItem {
    name:string;
    qty:number;
    price:number;
    invTotalPrice:number;
}

export interface QuantityDelta {
    name:string;
    price:number;
    qty:number;
}

export interface PurchaseOrder {
    name: string;
    address: string;
    
}
