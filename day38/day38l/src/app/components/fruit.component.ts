import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fruit, FruitStore } from '../store/fruit.store';
import { Observable } from 'rxjs';
import { FruitDb } from '../shared/fruits.db';

@Component({
  selector: 'app-fruit',
  standalone: false,
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.css'
})
export class FruitComponent implements OnInit{

  protected form!:FormGroup
  private fb = inject(FormBuilder)

  fruitStore = inject(FruitStore)
  fruitDb = inject(FruitDb)
  fruits$:Observable<Fruit[]> = this.fruitStore.getFruits
 
  fruits!:Fruit[]

  ngOnInit(): void {
      this.form=this.createForm();
      // if using promises
      // this.fruitDb.getAllFruits().then((fruits)=>this.fruits=fruits)
      // if using observables
      this.fruitDb.getAllFruits3().subscribe((fruits)=>this.fruits=fruits)
  }

  createForm():FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('')
    })
  }

  processForm():void {
   
   
    const fruit:Fruit = {
      ...this.form.value
    }

    // const fruit:Fruit = {
    //   name:this.form.value.name
    // }
    
    this.fruitStore.addFruit2(fruit)

    // this.fruitDb.saveFruit(fruit)
    this.fruitDb.saveFruit2(fruit)

    this.form =this.createForm();
  }
  
  delete():void {
    this.fruitStore.deleteFruit2('apple');
    // this.fruitDb.removeFruit('apple')
    // this.fruitDb.removeFruit2('apple')

    // observable way
    this.fruitDb.removeFruit3('apple');
    this.fruitDb.fruits.clear()
  }
}
