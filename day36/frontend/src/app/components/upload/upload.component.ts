import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../../service/upload.service';
import { CityStore } from '../store/city.store';
import { City } from '../models/upload-result';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit{

  form!:FormGroup

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private fileUploadService = inject(UploadService)
  private cityStore = inject(CityStore); // comes from indexdb

  citiesList$!: Observable<City[]>

  selectedCity!: string;
  selectedCityName?:string;

  dataUri!:string;
  blob!:Blob;
  
  file!:File;

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadCities();
  }

  loadCities() {
    //calls the store
    this.citiesList$! = this.cityStore.cities$;
    this.cityStore.loadCities();

  }

  upload(){

    this.citiesList$.subscribe((cities)=>{
      const city = cities.find((city)=> city.code === this.selectedCity);
      console.log(city?.city_name)
      this.selectedCityName = city?.city_name;
    })



    if (!this.dataUri) {
      console.log("no datauri")
      return;
    }

    // Convert the base64 Data URI to a Blob
    this.blob = this.dataURItoBlob(this.dataUri);
    console.log(this.blob);
    const formVal = this.form.value;
    // this.fileUploadService.upload(formVal, this.blob)
    //   .then((result)=>{
    //     this.router.navigate(['/image',result.postId]);
    //   }).catch(error=> console.log(error))

    //OR CAN USE UPLOAD2
    //JUST ENSURE THAT ITS FINAL FILE NAME IN THE S3SERVICE IS CONFIGURED PROPERLY

    this.fileUploadService.upload(formVal, this.file)
      .then((result)=>{
        this.router.navigate(['/image',result.postId]);
      }).catch(error=> console.log(error))
  }

  onFileChange(event: Event){
    console.log("onFileChange");
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];

      this.file = file;

      console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.dataUri = reader.result as string;
      };
      reader.readAsDataURL(file);


      
    }

  }

  protected createForm():FormGroup {
    return this.fb.group({
      comments: this.fb.control<string>('')
    });
  }

  dataURItoBlob(dataURI: string): Blob{
    const [meta, base64Data] = dataURI.split(',');
    const mimeMatch = meta.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i++){
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeType});
  }

}
