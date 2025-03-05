import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  standalone: false,
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.css'
})
export class RoutingComponent {

  router = inject(Router)
  params():void {

    this.router.navigate(['/routing',2])
  }

  queryparams():void {
    this.router.navigate(['/route2'],{queryParams: {id:2,name:'saddd'}})
  }
}
