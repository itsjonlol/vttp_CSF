import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../service/upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-image',
  standalone: false,
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css'
})
export class ViewImageComponent implements OnInit,OnDestroy {

  postId:string = ''
  param$!:Subscription
  imageData: any;
  comments!:string;

  private activatedRoute = inject(ActivatedRoute);
  private fileUploadService = inject(UploadService);

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(async(params)=> {
      this.postId = params['postId'];
      let r = await this.fileUploadService.getImage(this.postId);
      this.imageData = r.image;
      this.comments = r.comments;
  
    })
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
  }

}
