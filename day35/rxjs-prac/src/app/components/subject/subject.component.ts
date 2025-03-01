import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: false,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{

    //observables are unicast

    ngOnInit(): void {
      const observable$ = new Observable(obj => obj.next(Math.random()))

      const observer1 = observable$.subscribe(d=>console.log(d))
      const observer2 = observable$.subscribe(d=>console.log(d))
      

      const subject = new Subject<number>();
      // subject subscribers get the same value
      const sobserver1 = subject.subscribe(d=>console.log(d))
      const sobserver2 = subject.subscribe(d=>console.log(d))

      subject.next(Math.random())
    }
    
}
