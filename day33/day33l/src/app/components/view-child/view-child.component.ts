import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-child',
  standalone: false,
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.css'
})
export class ViewChildComponent implements OnInit{

  childText:string = "Default String";

  form!:FormGroup;

  private fb = inject(FormBuilder);
  rows!:FormArray

  ngOnInit(): void {
    this.form= this.fb.group({
      items:[null,Validators.required],
      items_value: ['no',Validators.required]
    });
    this.rows=this.fb.array([])
  }
  
  get dynamicRows() {
    return this.form.get('rows') as FormArray;
  }

  onAddRow() {
    this.rows.push(this.createFormItem());
  }

  createFormItem():FormGroup {
    return this.fb.group({
      name:null,
      description:null,
      qty:null
    })
  }


  changeText() {
    this.childText= "Updated by ViewChild";
  }
}
