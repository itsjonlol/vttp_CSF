import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arraychanges',
  standalone: false,
  templateUrl: './arraychanges.component.html',
  styleUrl: './arraychanges.component.css'
})
export class ArraychangesComponent implements OnInit {


  numbers:number[] = [1,2,3,4,5]
  numbers2:number[] =[1,2,3,4,5]
  counter=0;

  addToArray(numberToAdd:number) {
    this.numbers.push(numberToAdd);
    this.numbers2 = [...this.numbers2,numberToAdd]
    // this.numbers2.push(numberToAdd)
    console.log(this.numbers)
    // this.numbers= [...this.numbers,numberToAdd]
  }
  addCounter() {
    this.counter++
  }

  ngOnInit(): void {
      // this.numbers2=[1,2,3]
  }

}
