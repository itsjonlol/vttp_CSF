import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  notificationService = inject(NotificationService)

  currentMessage!:string

  outsideOnInitMessage!:string
  notificationSubject$ = this.notificationService.notificationSubject
  ngOnInit():void {
    // this.notificationService.notificationSubject.subscribe( d => {this.currentMessage = d})
  }

  sendMessage(value:string) {
 
    this.notificationService.sendNotification(value);
    this.outsideOnInitMessage=value
  }
}
