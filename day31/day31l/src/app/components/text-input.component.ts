import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

  private text = '';

  @Output()
  onNewText = new Subject<string>()

  handleKeyPressed(event:any) {
    console.log('>>>> event ' + event.target.value);
    this.text= event.target.value
  }

  handleClick() {
    this.onNewText.next(this.text);
  }

  processValue(text:string) {
    console.log(text)
  }
  fontSizeChanged(event:any) {
    console.log(event.target.value)
  }
}
