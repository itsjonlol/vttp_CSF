import { Component, DoCheck, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cartcheckout',
  standalone: false,
  templateUrl: './cartcheckout.component.html',
  styleUrl: './cartcheckout.component.css'
})
export class CartcheckoutComponent implements OnInit,DoCheck{
  
  
  @Input({ required: true })
  cartItems!:CartItem[]

  @Output()
  formSubmitted = new Subject<boolean>();

  isCartEmpty:boolean=true;

  private fb = inject(FormBuilder)

  protected form!:FormGroup

  protected showDeliverySlots: boolean = true;

  totalPrice:number = 0;
  object!:any

  ngOnInit(): void {
    this.calculateTotalPrice();
    this.form=this.createForm();
  }
 
  ngDoCheck(): void {
    this.calculateTotalPrice();
  
  }

  

  processOrder() {
    
    const formDetails:any = this.form.value;

    this.object= {
      ...formDetails,
      items: this.cartItems,
      total: this.totalPrice
    }

    this.form = this.createForm()
    this.formSubmitted.next(true);
  }

  urgentEvent(event:any) {
    this.showDeliverySlots = !event.target.checked
  }

  private calculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i<this.cartItems.length;i++) {
      this.totalPrice += this.cartItems[i].invTotalPrice
    }
  }

  protected invalid():boolean {
    return this.form.invalid || this.cartItems.length <=0;
  }


  private createForm():FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('',[Validators.required]),
      address: this.fb.control<string>(''),
      urgent: this.fb.control<boolean>(false),
      am: this.fb.control<boolean>(false),
      pm: this.fb.control<boolean>(false)
    })
  }

 
  
  
}
