import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: false,
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.css'
})
export class RxjsExamplesComponent implements OnInit,OnDestroy{

  obsSub!:Subscription 

  ngOnInit(): void {

    //promise -> promise is eager, will call even when no one is listening
    const promise = new Promise(resolve => {
      console.log("promise call")
      setTimeout(() => {
        resolve("promise is working1"); // only resolves once. have to do a promise chain
        resolve("promise is working2");
        resolve("promise is working3");
        
      }, 3000);
    })

    //need to listen to the promise
    // promise.then( result => console.log(result))
    promise
  .then(result => {
    console.log(result);
    return "promise is working2"; // Return new value to pass to next `.then()`
  })
  .then(result2 => {
    console.log(result2);
    return "promise is working3"; // Another return for the next `.then()`
  })
  .then(result3 => console.log(result3));

    //observable
    const observable = new Observable(sub => {
      console.log("observable call")
      setTimeout(() => {
        sub.next("observable is working1")
        sub.next("observable is working2")
        sub.next("observable is working3")
      }, 3000);
    })
    
    // will only make the call if someone is subscribed to it. it is lazy
    this.obsSub=observable.subscribe(result => console.log(result))
  }

  ngOnDestroy(): void {
    if (this.obsSub) {
      this.obsSub.unsubscribe();
    }
  }
  
}
