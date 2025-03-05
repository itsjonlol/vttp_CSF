import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-contentprojectionchild',
  standalone: false,
  templateUrl: './contentprojectionchild.component.html',
  styleUrl: './contentprojectionchild.component.css'
})
export class ContentprojectionchildComponent implements AfterContentInit {

  @Input( {required:true})
  products!:any[]

  // @ContentChild('head') contentHeader!:ElementRef
  //query list
  @ContentChildren('head')contentHeader!:ElementRef

  ngAfterContentInit(): void {
      this.contentHeader.nativeElement.setAttribute('style','color:red')
  }


}
