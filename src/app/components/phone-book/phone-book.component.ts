import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl, CdkTreeModule, FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StructureServiceService } from 'src/app/services/structure-service.service';
import { StructureModel } from 'src/app/models/StructureModel';
import { TreeModel } from 'src/app/models/TreeModel';
import { PhoneBookModel } from 'src/app/models/PhoneBookModel';
import { PhonesByStorelocModel } from 'src/app/models/PhonesByStorelocModel';



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  storeloc?: number;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent implements OnInit {


  treeControl = new FlatTreeControl<TreeModel>(
    node => node.level,
    node => node.expandable,
  );
  TREE_DATA: TreeModel[] = [
    {
      Id: 1,
      name: 'Все',
      expandable: false,
      level: 0,
      Storeloc: 0,
    },
    {
      Id: 1,
      name: 'Mile',
      expandable: true,
      level: 0,
      Storeloc: 90,
    },
    {
      Id: 1,
      name: 'Долгиновский',
      expandable: false,
      level: 1,
      Storeloc: 8,
    },
    {
      Id: 1,
      name: 'Брест',
      expandable: false,
      level: 1,
      Storeloc: 11,
    },
    {
      Id: 1,
      name: 'МОМО',
      expandable: false,
      level: 1,
      Storeloc: 18,
    },
    {
      Id: 1,
      name: 'Тимирязева',
      expandable: false,
      level: 1,
      Storeloc: 21,
    },
    {
      Id: 1,
      name: 'Каменогорская',
      expandable: false,
      level: 1,
      Storeloc: 22,
    },
    {
      Id: 1,
      name: 'Независимости',
      expandable: false,
      level: 1,
      Storeloc: 24,
    },
    {
      Id: 1,
      name: 'Молодечно',
      expandable: false,
      level: 1,
      Storeloc: 25,
    },
    {
      Id: 1,
      name: 'Diamond',
      expandable: false,
      level: 1,
      Storeloc: 31,
    },
    {
      Id: 1,
      name: 'Outleto',
      expandable: false,
      level: 1,
      Storeloc: 32,
    },
    {
      Id: 1,
      name: 'Гродно',
      expandable: false,
      level: 1,
      Storeloc: 33,
    },
    {
      Id: 1,
      name: 'Expobel',
      expandable: false,
      level: 1,
      Storeloc: 34,
    },
    {
      Id: 1,
      name: 'Горецкого',
      expandable: false,
      level: 1,
      Storeloc: 35,
    },
    {
      Id: 1,
      name: 'York',
      expandable: true,
      level: 0,
      Storeloc: 91,
    },
    {
      Id: 1,
      name: 'Никифорово',
      expandable: false,
      level: 1,
      Storeloc: 23,
    },
    {
      Id: 1,
      name: 'DanaMoll',
      expandable: false,
      level: 1,
      Storeloc: 27,
    },
    {
      Id: 1,
      name: 'Офис',
      expandable: false,
      level: 0,
      Storeloc: 1,
    },
    {
      Id: 1,
      name: 'Склад',
      expandable: false,
      level: 0,
      Storeloc: 19,
    }];
  contactdata: PhoneBookModel[] = []
  dataSource = new ArrayDataSource(this.TREE_DATA);

  hasChild = (_: number, node: TreeModel) => node.expandable;

  getParentNode(node: TreeModel) {
    const nodeIndex = this.TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.TREE_DATA[i].level === node.level - 1) {
        return this.TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: TreeModel) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  constructor(private service: StructureServiceService) { }

  Structure: StructureModel[] = [];

  selectedRowTree: string = '';
  selectedStoreLoc: number = 0;
  input: string = '';
  ngOnInit(): void {

  }
  selectNode(node: TreeModel) {
    this.selectedRowTree = node.name;
    this.selectedStoreLoc = node.Storeloc;
    switch (node.Storeloc) {
      case 0:
        this.service.getPhones().subscribe(result => {
          this.contactdata = result;
          console.log(this.contactdata)
        })
        break;
      default:
        this.service.GetPhonesByStore(new PhonesByStorelocModel(node.Storeloc)).subscribe({
          next: result => {
            this.contactdata = result;
          },
          error: error => {
            console.log(error);
          }
        })
        break;
    }
  }

  search() {
    if (this.selectedStoreLoc === 0 || this.selectedStoreLoc === 90 || this.selectedStoreLoc === 91) {
      this.service.GetPhonesByInput(new PhonesByStorelocModel(0, 0, this.input)).subscribe({
        next: result => {
          this.contactdata = result
        },
        error: error => {
          console.log(error)
        }
      })
    } else {
      this.service.GetPhonesBySearchAndStoreloc(new PhonesByStorelocModel(this.selectedStoreLoc, 0, this.input)).subscribe({
        next: result => {
          this.contactdata = result
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }
}
