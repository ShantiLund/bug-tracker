import { Component, inject, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ColumnItem } from './tasks.model';
import { ItemData } from './tasks.model';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-tasks',
  imports: [NzTableModule, NzModalModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzButtonModule, NzSpinModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.less'
})
export class TasksComponent implements OnInit {
  private modalSvc = inject(NzModalService);
  isLoading: boolean = false;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: ItemData) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Description',
      sortOrder: 'descend',
      sortFn: (a: ItemData, b: ItemData) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Category',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Type',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Reported By',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Reported On,',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Assigned To',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Pirority',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Status',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Last Updated By',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    },
    {
      name: 'Last Updated On',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
    }
  ];
  listOfData: ItemData[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];

  ngOnInit(): void {
  }

  createNewBug() {
    this.modalSvc.create<TasksDetailComponent>({
      nzTitle: "Create Bug",
      nzWidth: '1200px',
      nzContent: TasksDetailComponent,
      nzFooter: null
    });
  }
}
