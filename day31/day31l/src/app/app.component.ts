import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My first app';

  texts:string[] = [
    "big black bug bleeds black blood",
    "she sell sea shells on the sea shore"
  ]

  allClicks:number=0;


  //Event handler
  whenTotalClicks(idx:number,clicks:number) {
    console.info('>>>> got totalClicks event from '+ idx);
    this.allClicks += clicks;
  }

  whenNewText(newText:string) {
    this.texts.push(newText);
  }
}
