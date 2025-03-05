import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-arraychild',
  standalone: false,
  templateUrl: './arraychild.component.html',
  styleUrl: './arraychild.component.css'
})
export class ArraychildComponent implements OnChanges {


  @Input()
  numbersc!:number[]

  @Input()
  numbers2c!:number[]

  totaln:number = 0;

  totaln2:number=0;

  ngOnChanges(changes: SimpleChanges): void {
    this.getTotal()
  }

  getTotal():void {
    this.totaln = 0;
    this.totaln2 = 0;
    for (let i = 0; i<this.numbersc.length;i++) {
      this.totaln+=this.numbersc[i];
      this.totaln2+=this.numbersc[i];
    }
  }
}
