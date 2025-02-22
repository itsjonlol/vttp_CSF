import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigate',
  standalone: false,
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent {


@Input()
currentNumber:number =0; 

@Output()
onNextNumber =  new Subject<number>(); 

count:number = 0;

offset:number[] =[1,2,3,4,5]

offsetnumber:number = 1;

prev() {
  this.count-=this.offsetnumber;
  if (this.count <0) {
    this.count = 30;
  }
  this.onNextNumber.next(this.count);
  
}
next() {
  this.count += this.offsetnumber;
  

  if(this.count >30) {
    this.count = (this.count%30)
  }

  this.onNextNumber.next(this.count);
}

myFunction(event: any) {
  console.log(event.target.value);
  this.offsetnumber = parseInt(event.target.value);
  }

}
