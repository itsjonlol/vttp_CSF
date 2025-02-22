import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnChanges{
 


  @Input()
  displayNumber:number = 0;
  
  imageUrl:string = '/numbers/number' + this.displayNumber+'.jpg';

  // getImageUrl(no :number):string {
  //   return this.imageUrl = '/numbers/number' + this.displayNumber+'.jpg';
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.imageUrl = '/numbers/number' + this.displayNumber+'.jpg';
  }

    





}
