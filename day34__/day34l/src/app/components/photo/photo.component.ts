import { Component, inject, OnInit } from '@angular/core';
import { FakeryService } from '../../service/fakery.service';
import { Photo } from '../../model/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo',
  standalone: false,
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent implements OnInit{


  fakeryService = inject(FakeryService)

  photos:Photo[] = []

  ngOnInit(): void {

    
    this.fakeryService.getFakeryPhotos().subscribe({
      next: (response:Photo[]) => {
        console.log(response)
        this.photos = response
      },
      error: (error:HttpErrorResponse) => {
        console.log(error)
      }
    })
  }
}
