import { Component, inject } from '@angular/core';
import { FilesService } from '../../service/files.service';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  selectedFile!: File

  filesService = inject(FilesService);

  responseString:string = ""

  handleFileUpload(event:any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.filesService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          console.log(response);
          this.responseString =response.message

        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
