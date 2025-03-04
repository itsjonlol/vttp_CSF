import { Component, OnInit } from '@angular/core';
import { FontSizeObject } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'My first app';

  fontSizeObject!:FontSizeObject
  date:Date = new Date();

  texts:string[] = [
    "big black bug bleeds black blood",
    "she sell sea shells on the sea shore"
  ]

  allClicks:number=0;

  cart:number[]=[1,2,3,4,5,6,7,8,9,10]

  users:any[] =[]

  ngOnInit(): void {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    for ( let i = 0;i<names.length;i++) {
      this.users.push({id:i,name:names[i]})
    }
  }


  //Event handler
  whenTotalClicks(idx:number,clicks:number) {
    console.info('>>>> got totalClicks event from '+ idx);
    this.allClicks += clicks;
  }

  whenNewText(newText:string) {
    this.texts.push(newText);
  }

  processFontSize(event:FontSizeObject) {
    this.fontSizeObject = event;
  }

  addToCart(value:string) {
    this.cart = [...this.cart,parseInt(value)]
  }
}
