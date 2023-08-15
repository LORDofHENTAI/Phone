import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileListModel } from '../models/FileListModel';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://192.168.1.21:7260/'
  UploadFileURL = this.url + 'UploadFile/'
  GetFileURL = this.url + 'GetFile/'
  DeleteFileURL = this.url + 'DeleteFile/'
  GetFileListURL = this.url + 'GetFileList'

  UploadFile(data: File): Observable<string> {
    let input = new FormData();
    input.append("file", data);
    return this.http.post<string>(this.UploadFileURL, input)
  }
  GetFile(data: string) {
    return this.http.post(this.GetFileURL + `?fileName=${data}`, null, { responseType: 'blob' })
  }
  GetFileList(): Observable<FileListModel[]> {
    return this.http.post<FileListModel[]>(this.GetFileListURL, null)
  }
  DeleteFile(data: string): Observable<string> {
    return this.http.post<string>(this.DeleteFileURL + `?fileName=${data}`, null,)
  }
}
