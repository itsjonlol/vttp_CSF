import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behaviorsubject',
  standalone: false,
  templateUrl: './behaviorsubject.component.html',
  styleUrl: './behaviorsubject.component.css'
})
export class BehaviorsubjectComponent implements OnInit {


    ngOnInit(): void {
      const subject = new Subject<number>();

      subject.subscribe(d=>console.log(`subject subscriber getting value of ${d}`))
      subject.next(1020) // needs to be called for the first value to be received

      //second subscriber wont get the second value -> it returns nothing
      subject.subscribe(d=>console.log(`subscriber 2 getting a value of ${d}`)) 


      const behaviorSubject = new BehaviorSubject<number>(12)

      //gets the initial value when subscribed ( didnt have to do next)
      behaviorSubject.subscribe(d=>console.log(`Behavior subscriber getting value of ${d}`))

      behaviorSubject.next(2020)
      behaviorSubject.subscribe(d=> console.log(`BSubscriber 2 receives a value of ${d}`))
    }
}
