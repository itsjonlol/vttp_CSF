import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  canExit():boolean {
    if (confirm("Do you want to leave this apge?")) {
      return true;
    } else {
      return false;
    }
  }
}
