import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route2',
  standalone: false,
  templateUrl: './route2.component.html',
  styleUrl: './route2.component.css'
})
export class Route2Component implements OnInit{


  activatedRoute = inject(ActivatedRoute)

  paramsId!:number;

  queryId!:number;
  queryName!:number;

  querySubscription!: Subscription
  ngOnInit(): void {
    this.paramsId = this.activatedRoute.snapshot.params['id']

    this.queryId = this.activatedRoute.snapshot.queryParams['id']
    this.queryName=this.activatedRoute.snapshot.queryParams['name']

    //OR

   this.querySubscription= this.activatedRoute.queryParams.subscribe(res=> {
      this.queryId = res['id']
      this.queryName =res['name']

    })
  }
  ngOnDestroy():void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
  
}
