import { Component, OnInit } from '@angular/core';
import { FileListModel } from 'src/app/models/FileListModel';
import { FileService } from 'src/app/services/file.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-file-service',
  templateUrl: './file-service.component.html',
  styleUrls: ['./file-service.component.scss']
})
export class FileServiceComponent implements OnInit {

  constructor(private fileService: FileService) { }
  ngOnInit(): void {
    this.getFileList()
  }
  selectedFiles: File;
  selectedFile: File;
  selectedFileName: string = 'Выберите файл';


  fileList: FileListModel[]
  selectFile(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles[0].name;
    this.selectedFile = this.selectedFiles[0];
    console.log(this.selectedFile);
  }
  Upload() {
    this.fileService.UploadFile(this.selectedFile).subscribe({
      next: result => {
        this.getFileList()
      },
      error: error => {
        console.log(error)
      }
    })
  }
  getFileList() {
    this.fileService.GetFileList().subscribe({
      next: result => {
        this.fileList = result
      },
      error: error => {
        console.log(error)
      }
    })
  }
  deleteFile(name: string) {
    this.fileService.DeleteFile(name).subscribe({
      next: result => {
        this.getFileList()
      },
      error: error => {
        console.log(error)
      }
    })
  }
  getFile(name: string) {
    this.fileService.GetFile(name).subscribe({
      next: result => {
        saveAs(result, name)
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
