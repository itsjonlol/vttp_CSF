import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-child',
  standalone: false,
  templateUrl: './test-child.component.html',
  styleUrl: './test-child.component.css'
})
export class TestChildComponent implements OnInit,OnChanges{
  

  @Input({ required: true })
  testVarChild:number[]  = []
  total:number=0;

  ngOnInit(): void {
    this.getTotal()
  }

  ngOnChanges():void {
    this.getTotal();
  }

  // ngDoCheck():void {
  //   this.getTotal();
  // }

  private getTotal() {
    this.total=0;
    for (let i = 0;i<this.testVarChild.length;i++) {
      this.total += this.testVarChild[i]
    }
  }
}
