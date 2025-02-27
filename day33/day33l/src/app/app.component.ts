import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildComponent } from './components/view-child/view-child.component';
import { Vc2Component } from './components/vc2/vc2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit,OnInit,DoCheck {
  
 

  title = 'day33l';

  isShow:boolean=false;

  @ViewChild(ViewChildComponent)
  childComponent!:ViewChildComponent

  @ViewChild("myImg") myImageElement:ElementRef | undefined;

  //?avoid null - if have show or do something
  //! non assertion null (disallow null or undefined by default)

  @ViewChild('childView') childComp2!:Vc2Component

  changeChildText() {
    this.childComponent.changeText();

  }

  ngOnInit(): void {
    this.isShow=true;
  }

  ngAfterViewInit(): void {
    console.log("After view init....")
  }

  ngDoCheck(): void {
    console.log("do check before..?")
  }

  inc() {
    this.childComp2.increment(); // can now access the child componenets
  }

  dec() {
    this.childComp2.decrement();

  }

  
}
