import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildComponent } from './components/view-child/view-child.component';

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

  
}
