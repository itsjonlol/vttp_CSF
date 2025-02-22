import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text',
  standalone: false,
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

  // Define a member and annotate it with @Input

  @Input()
  text:string = '';


  // Define an event with number as the event payload
  @Output()
  totalClicks = new Subject<number>()

  protected counter:number = 0;
  
  protected textClicked() {
    // this.totalClicks.next(this.counter); //this is how to fire the event
    this.counter++;
  }

  protected clearCounter() {
    this.counter=0;
  }

  protected firedClicks() {
    this.totalClicks.next(this.counter);
  }
}
