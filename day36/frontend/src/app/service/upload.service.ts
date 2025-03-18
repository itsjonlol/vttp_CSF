import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UploadResult } from '../components/models/upload-result';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  httpClient = inject(HttpClient)
  constructor() { }
  
  //returns a promise -> only one time
  upload(form:any,image:Blob) {
    const formData = new FormData();
    formData.set('comments',form['comments']);
    formData.set('file',image)
    return lastValueFrom(this.httpClient.post<UploadResult>('http://localhost:8080/api/upload',formData));
    // return lastValueFrom(this.httpClient.post<UploadResult>('/api/upload',formData));

  }

  upload2(form:any,image:File) {
    const formData = new FormData();
    formData.set('comments',form['comments'])
    formData.set('file',image);
    return lastValueFrom(this.httpClient.post<UploadResult>('http://localhost:8080/api/upload2',formData));
  }

  getImage(postId:string) {
    return lastValueFrom(this.httpClient.get<UploadResult>(`http://localhost:8080/api/posts/${postId}`))
    // return lastValueFrom(this.httpClient.get<UploadResult>(`/api/posts/${postId}`))
  }


}
