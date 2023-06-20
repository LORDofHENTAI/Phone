import { Component, OnInit } from '@angular/core';
import { CRUDphoneModel } from 'src/app/models/CrudphoneModel';
import { PhoneBookModel } from 'src/app/models/PhoneBookModel';
import { PhonesByStorelocModel } from 'src/app/models/PhonesByStorelocModel';
import { StructureModel } from 'src/app/models/StructureModel';
import { StructureServiceService } from 'src/app/services/structure-service.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contact: PhoneBookModel[] = []

  switchButton: boolean = true;
  contactId: number
  contactFio: string
  contactDolj: string
  contactPhone: string
  contactStoreLoc: number
  contactPlace: string
  selected: StructureModel
  contactComment: string
  structure: StructureModel[]
  input: string

  constructor(private service: StructureServiceService) { }

  ngOnInit(): void {
    this.getContacts()
    this.getStructure()
  }
  getContacts() {
    this.service.getPhones().subscribe({
      next: result => {
        this.contact = result
        this.input = '';
      },
      error: error => {
        console.log(error)
      }
    })
  }
  getStructure() {
    this.service.getStructure().subscribe({
      next: result => {
        this.structure = result
      },
      error: error => {
        console.log(error)
      }
    })
  }

  switchUpdate(element: PhoneBookModel) {
    this.switchButton = !this.switchButton
    this.contactId = element.id
    this.contactFio = element.fio
    this.contactDolj = element.dolj
    this.contactPhone = element.phoneNumber
    this.contactStoreLoc = element.storeLoc
    this.contactComment = element.comment
    this.contactPlace = element.place
  }

  deleteContact(element: number) {
    var model = new PhoneBookModel(element, '', '', 0, '', '', '')
    this.service.DeleteContact(model).subscribe({
      next: result => {
        this.getContacts();
      },
      error: error => {
        console.log(error)
      }
    })
  }
  createContact() {
    var create = new PhoneBookModel(0, this.contactFio, this.contactPhone, this.selected.storeLoc, this.contactDolj, this.contactComment, this.selected.name)
    this.service.CreateContact(create).subscribe({
      next: result => {
        this.contactId = 0
        this.contactFio = ''
        this.contactPhone = ''
        this.contactStoreLoc = 0
        this.contactComment = ''
        this.contactDolj = ''
        this.contactPlace = ''
        this.selected.name = ''
        this.getContacts;
      },
      error: error => {
        console.log(error)
      }
    })
  }
  updateContact() {
    var create = new PhoneBookModel(this.contactId, this.contactFio, this.contactPhone, this.selected.storeLoc, this.contactDolj, this.contactComment, this.selected.name)
    this.service.UpdateContact(create).subscribe({
      next: result => {
        this.contactId = 0
        this.contactFio = ''
        this.contactPhone = ''
        this.contactStoreLoc = 0
        this.contactComment = ''
        this.contactDolj = ''
        this.contactPlace = ''
        this.selected.name = ''
        this.switchButton = !this.switchButton
        this.getContacts()
      },
      error: error => {
        console.log(error)
      }
    })
  }
  search() {
    this.service.GetPhonesByInput(new PhonesByStorelocModel(0, 0, this.input)).subscribe({
      next: result => {
        this.contact = result
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
