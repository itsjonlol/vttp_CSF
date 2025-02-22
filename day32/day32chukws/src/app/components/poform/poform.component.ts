import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { PurchaseOrder } from '../../models';

@Component({
  selector: 'app-poform',
  standalone: false,
  templateUrl: './poform.component.html',
  styleUrl: './poform.component.css'
})
export class PoformComponent implements OnInit {
    

    private fb = inject(FormBuilder);

    protected form!: FormGroup;

    protected lineItems!: FormArray

    isAvailableDisabled:boolean = false;

    firstSlot:string = '0900 - 1200'
    secondSlot:string = '1200 - 1600'

    values!:PurchaseOrder


    onProcessForm() {
      console.log(this.form.value)
      this.values = this.form.value;
      // if (this.values.urgent) {
      //   this.values.availability=''
      // }
      // console.log(this.values)
    }


    ngOnInit(): void {
      this.form=this.createForm();
    }

    private createForm():FormGroup {
      this.lineItems = this.fb.array([])
      return this.fb.group({
        name: this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
        address: this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
        email:this.fb.control<string>('',[Validators.required,Validators.email]),
        deliveryDate: this.fb.control<string>('',[Validators.required]),
        availability: this.fb.control<string>(''),
        urgent: this.fb.control<boolean>(false),
        lineItems: this.lineItems

      })
      
  
    }

    protected isCtrlValid(ctrlName:string): boolean {
      return !!this.form.get(ctrlName)?.valid
    }

    protected isCtrlInvalid(ctrlName:string): boolean {
      return !!this.form.get(ctrlName)?.invalid
    }

    private createLineitem():FormGroup {
      return this.fb.group({
        itemName: this.fb.control<string>(''),
        qty: this.fb.control<number>(0),
        unitPrice:this.fb.control<number>(0)
      })
    }

    protected addLineItem() {
      const lineItemFG = this.createLineitem()
      this.lineItems.push(lineItemFG);
    }

    protected removeLineItem(idx:number) {
      this.lineItems.removeAt(idx)
    }

    protected isInvalid():boolean {
      return this.form.invalid || this.lineItems.controls.length <1
    }

    protected checkIfTrue(event:any) {
      console.log(event.target.checked)
      this.toggleAvailability()
      
      
      
    }

    protected toggleAvailability() {
      this.isAvailableDisabled = !this.isAvailableDisabled;
      const ctrl = this.form.get('availability')
      if (this.isAvailableDisabled===true) {
        
        ctrl?.disable();
      } else {
        ctrl?.enable()
      }
      
    }



}
