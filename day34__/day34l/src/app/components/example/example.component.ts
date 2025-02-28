import { Component } from '@angular/core';

import { from, map, Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: false,
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

  numbersArray:Observable<number> =  from([1,2,3,4,5,6,7,8,9,10]);

  foodArray:Observable<string> = from(["Pizza","Burger","Sandwich","Pasta","Biryani"]);

  nameArray:Observable<any>=from([
    {fname:"John",lname:"Smith"},
    {fname:"Dever",lname:"Joe"},
    {fname:"Smith",lname:"Will"}
  ])

  numberSeries = from([1,2,3,4,5,6,7,8,9,10])


  multiplyBy3() {
    this.numbersArray.pipe(
      map( data => {return data*3})
    ).subscribe(data => {console.log(data)})
  }

  toUpperCase() {
    this.foodArray.pipe(map(data=> {return data.toUpperCase()}))
      .subscribe(data => console.log(data))
  }

  concatFullName() {
    this.nameArray.pipe(map(data=> {return data.fname + ' ' +data.lname}))
      .subscribe(data =>console.log(data))
  }

  sumOfNumbers() {
    this.numberSeries 
      .pipe()
  }

  ngOnInit(): void {
    this.multiplyBy3();

    this.toUpperCase();

    this.concatFullName();
  }
}
