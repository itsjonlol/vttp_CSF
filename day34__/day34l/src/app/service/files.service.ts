import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  httpClient = inject(HttpClient)
  constructor() { }

  private api_url = "http://localhost:3000/"

  uploadFile(file:File): Observable<any> {
    const formData = new FormData();
    formData.append('file',file);
    return this.httpClient.post(this.api_url + 'uploadFile',formData);
  }
}
