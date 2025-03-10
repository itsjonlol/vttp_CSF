import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { ApiResponse, LineItem, Order } from '../models';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{

  // TODO Task 3
  
  private fb = inject(FormBuilder);
  protected form!:FormGroup

  cartStore = inject(CartStore)
  
  cartItems$:Observable<LineItem[]> = this.cartStore.cartItems$
  cartItems!:LineItem[]

  totalPrice$:Observable<number> = this.cartStore.getTotalPrice;

  productService = inject(ProductService)

  order:Order= {
    name: '',
    address: '',
    priority: false,
    comments: '',
    cart: {
      lineItems: [] 
  }
  }
  orderId!:string;
  errorMessage!:string;

  cartItemSub!: Subscription

  router = inject(Router)


  ngOnInit(): void {
    this.form = this.createForm();

    this.cartItemSub = this.cartItems$.subscribe(items => this.cartItems =items )
  }

  processForm():void {
    this.order = {
      ...this.form.value,
      cart: {
        lineItems:this.cartItems
      }
    }

    this.productService.checkout(this.order).subscribe({
      next: (response:ApiResponse) => {
      
       this.orderId= response.orderId;
       alert("Your order id is successfully processed with an id of-> " + this.orderId)
       this.router.navigate(['/'])
       
      },
      error: (error:HttpErrorResponse) => {
        console.log(error);
        this.errorMessage = error.error.message;
        alert("Error status: "+ error.status+ ". Message: " +  this.errorMessage)
      }
    })

    this.form.reset()
  }

  private createForm():FormGroup {
    return this.fb.group({
        name: this.fb.control<string>('',[Validators.required]),
        address: this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
        priority: this.fb.control<boolean>(false),
        comments: this.fb.control<string>('')
    })
  }

  ngOnDestroy():void {
    this.cartItemSub.unsubscribe();
  }


  

}
