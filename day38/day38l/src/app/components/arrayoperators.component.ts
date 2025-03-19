import { Component, OnInit } from '@angular/core';


export interface Product {
  id: number;
  name: string;
  price: number;
}
@Component({
  selector: 'app-arrayoperators',
  standalone: false,
  templateUrl: './arrayoperators.component.html',
  styleUrl: './arrayoperators.component.css'
})


export class ArrayoperatorsComponent implements OnInit {

  myAngularxQrCode = 'https://frontend-itsjonlol-jonathan-suhermans-projects.vercel.app'

  info = {
    name:'jon',
    youtube:'lame'
  }

  fullInfo = {
    
   
    race:'indo',
    ...this.info,
    name:'overwritten name',
    language:'EN'

  }


  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Smartphone', price: 800 },
    { id: 3, name: 'Tablet', price: 500 },
    { id: 4, name: 'Smartwatch', price: 200 },
    { id: 5, name: 'Headphones', price: 150 },
    { id: 6, name: 'Wireless Mouse', price: 50 },
    { id: 7, name: 'Mechanical Keyboard', price: 100 },
    { id: 8, name: 'Gaming Monitor', price: 400 },
    { id: 9, name: 'Bluetooth Speaker', price: 120 },
    { id: 10, name: 'External Hard Drive', price: 250 }
  ];

  mappedProducts!: any
  filteredProducts!:Product[]
  foundProduct!:Product | undefined
  foundProductIndex!:number
  sum!:number;
  slicedProducts!:Product[]

  ngOnInit(): void {
    this.mapProducts()
    this.filterProducts(401)
    this.findProduct('Bluetooth Speaker')
    this.findSumOfProducts()
    this.sliceProducts(1,3)
    this.spliceProducts();

  }

  

  mapProducts() {
   this.mappedProducts =  this.products.map((product:Product)=>product.name)
  }

  filterProducts(price:number) {
    this.filteredProducts = this.products.filter((product:Product)=> product.price >= price)
  }

  findProduct(name:string) {
    this.foundProduct = this.products.find((product)=>product.name === name)
    this.foundProductIndex = this.products.findIndex((product)=>product.name === name)
  }

  findSumOfProducts() {
    this.sum = this.products.reduce((sum,p)=>sum+p.price,0)
  }

  //returns a new array ( 1 to 3; exclusive of endNumber)
  sliceProducts(startNumber:number,endNumber:number) {
    this.slicedProducts = this.products.slice(startNumber,endNumber)
  }

  spliceProducts() {
   // ✅ Removes 1 item at index 2
   this.products.splice(2, 1); // Removes the product at index 2

   // ✅ Replaces the product at index 2 (removes 1 item, then inserts a new one)
   this.products.splice(2, 1, { id: 3, name: 'NEW 3', price: 600 });

   // ✅ Inserts a new product at index 5 (shifts existing elements to the right)
   this.products.splice(5, 0, { id: 100, name: 'INSERTED', price: 50 });
  }



}
