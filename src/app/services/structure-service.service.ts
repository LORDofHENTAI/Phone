import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StructureModel } from '../models/StructureModel';
import { Observable } from 'rxjs';
import { PhoneBookModel } from '../models/PhoneBookModel';
import { PhonesByStorelocModel } from '../models/PhonesByStorelocModel';
import { TreeModel } from '../models/TreeModel';
import { CRUDphoneModel } from '../models/CrudphoneModel';

@Injectable({
  providedIn: 'root'
})
export class StructureServiceService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://192.168.1.123:7260/'
  GetPhoneBookUrl = this.url + 'GetPhoneBook/'
  GetStructure = this.url + 'GetStructure/'
  GetPhonesByInputUrl = this.url + 'GetPhonesByInput/'
  GetPhonesByStoreUrl = this.url + 'GetPhonesByStore/'
  GetPhonesBySearchAndStorelocUrl = this.url + 'GetPhonesBySearchAndStoreloc/'
  GetTreeUrl = this.url + 'GetTree/'
  CreateContactUrl = this.url + 'CreatePhone/'
  DeleteContactUrl = this.url + 'DeletePhone/'
  updateContactUrl = this.url + 'UpdatePhone/'
  getStructure(): Observable<StructureModel[]> {
    return this.http.get<StructureModel[]>(this.GetStructure);
  }
  getTree(): Observable<TreeModel> {
    return this.http.get<TreeModel>(this.GetTreeUrl);
  }
  getPhones(): Observable<PhoneBookModel[]> {
    return this.http.get<PhoneBookModel[]>(this.GetPhoneBookUrl);
  }
  GetPhonesByInput(data: PhonesByStorelocModel): Observable<PhoneBookModel[]> {
    return this.http.post<PhoneBookModel[]>(this.GetPhonesByInputUrl, data);
  }
  GetPhonesByStore(data: PhonesByStorelocModel): Observable<PhoneBookModel[]> {
    return this.http.post<PhoneBookModel[]>(this.GetPhonesByStoreUrl, data);
  }
  GetPhonesBySearchAndStoreloc(data: PhonesByStorelocModel): Observable<PhoneBookModel[]> {
    return this.http.post<PhoneBookModel[]>(this.GetPhonesBySearchAndStorelocUrl, data);
  }
  CreateContact(data: PhoneBookModel): Observable<string> {
    return this.http.post<string>(this.CreateContactUrl, data)
  }
  DeleteContact(data: PhoneBookModel): Observable<string> {
    return this.http.post<string>(this.DeleteContactUrl, data)
  }
  UpdateContact(data: PhoneBookModel): Observable<string> {
    return this.http.post<string>(this.updateContactUrl, data)
  }
}
