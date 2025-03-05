import { Component } from '@angular/core';

@Component({
  selector: 'app-contentprojection',
  standalone: false,
  templateUrl: './contentprojection.component.html',
  styleUrl: './contentprojection.component.css'
})
export class ContentprojectionComponent {

  public salesProducts = [
    {id:1,name:'ACS',price:'100'},
    {id:2,name:'Phones',price:'2000'},
    {id:3,name:'Fashion',price:'5000'}
  ]

  public topProducts=[
    {id:1,name:'ACS',price:'100'},
    {id:2,name:'Phones',price:'2000'},
    {id:3,name:'Fashion',price:'5000'}
  ]
}
