import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  title = 'day31chukws';

  currentIndex:number=0;
  
  handleNext(next:number) {
    this.currentIndex = next;
  }
  


}
