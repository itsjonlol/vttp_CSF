import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public notificationSubject = new BehaviorSubject<string>("default")

  sendNotification(data:string) {
    this.notificationSubject.next(data);
  }

}
