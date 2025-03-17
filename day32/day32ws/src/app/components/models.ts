export interface LineItem {
    item: string
    unitPrice: number
    quantity: number
  }
  
  export interface PurchaseOrder {
    name: string
    address: string
    email: string
    deliveryDate: string
    urgent: boolean
    lineItems: LineItem[]
  }