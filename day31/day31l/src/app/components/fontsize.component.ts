import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FontSizeObject} from '../models/models';

@Component({
  selector: 'app-fontsize',
  standalone: false,
  templateUrl: './fontsize.component.html',
  styleUrl: './fontsize.component.css'
})
export class FontsizeComponent {

  name!:string
  fontSize!:number

  

  @Output() 
  fontSizeEmitter = new Subject<FontSizeObject>()

  fontSizeChanged(event:any) {
    this.fontSize = parseInt(event.target.value);

    const data:FontSizeObject = {
      name:"lol",
      fontSize: this.fontSize

    }
    this.fontSizeEmitter.next(data)

  }
}
