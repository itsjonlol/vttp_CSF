import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-vc2',
  standalone: false,
  templateUrl: './vc2.component.html',
  styleUrl: './vc2.component.css'
})
export class Vc2Component implements OnInit, AfterViewInit{
  
  counter:number=0
  
  ngOnInit() {

  }

  // @ViewChild("highlight")marker!:ElementRef

  @ViewChildren("highlight")marker!:QueryList<any>

  ngAfterViewInit(): void {
    console.log("after view...")
    console.log(this.marker) // returns a query list
    // this.marker.nativeElement.style.color="red" // for view child example
    this.marker.first.nativeElement.style.color="red"
    this.marker.last.nativeElement.style.color="blue"
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
