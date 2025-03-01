import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: false,
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css'
})
export class ObservablesComponent implements OnInit {


  users: User[] = [
    { id: '1', name: 'John', isActive: true },
    { id: '2', name: 'Jack', isActive: true },
    { id: '3', name: 'Mike', isActive: false } 
  ];

  users$ = of(this.users)
  
  mappedUsers$ = this.users$
    .pipe(map(
      (users:User[]) => users.map((user)=> user.name)
    ))

  filteredUsers$ = this.users$
    .pipe(map(
      (users:User[]) => users.filter((user)=> user.isActive)
    ))

  usersFromObservable:User[] =[]

  usernamesFromObservable:string[] =[];

  filteredUsersFromObservable:User[] =[];

  ngOnInit(): void {
    
    this.users$.subscribe(d=>this.usersFromObservable=d) // similar to api call

    this.mappedUsers$.subscribe(d=>this.usernamesFromObservable=d);

    this.filteredUsers$.subscribe(d=>this.filteredUsersFromObservable=d);
  }


}
