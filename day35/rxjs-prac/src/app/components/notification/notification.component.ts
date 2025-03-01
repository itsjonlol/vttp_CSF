import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  notification!:string

  notificationSubscription!:Subscription

  notificationService = inject(NotificationService)

  // ngOnChanges(changes: SimpleChanges): void {
    
  //   this.notificationService.notificationSubject.subscribe(data => this.notification=data)
    
  // }

  ngOnInit():void {
    this.notificationService.notificationSubject.subscribe(data => this.notification=data)
  }

}
