import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)

  cartStore = inject(CartStore);

  itemCount!: number

  itemCountSubscription!:Subscription

  isEmpty:boolean=true;

  ngOnInit(): void {

    this.itemCountSubscription = this.cartStore.itemsCount$.subscribe(count => this.itemCount=count)
    this.checkIfCartEmpty();
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  ngDoCheck():void {
    this.checkIfCartEmpty();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.checkIfCartEmpty();
  // }
  

  ngOnDestroy() {
    this.itemCountSubscription.unsubscribe();
  }

  private checkIfCartEmpty(): void {
    if (this.itemCount>0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
   
  }
}
