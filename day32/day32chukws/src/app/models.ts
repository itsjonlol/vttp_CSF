export interface PurchaseOrder {
    name:string;
    address: string;
    email: string;
    deliveryDate:string;
    availability?:string;
    urgent:boolean;
    lineItems: Array<lineItem>

}

interface lineItem {
    itemName:string;
    qty:number;
    unitPrice:number;
}