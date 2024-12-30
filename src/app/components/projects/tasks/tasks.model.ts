import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from "ng-zorro-antd/table";

export interface ItemData {
  name: string;
  age: number;
  address: string;
}

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ItemData> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ItemData> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
// export const listOfColumns: ColumnItem[] = [
//   {
//     name: 'Name',
//     sortOrder: null,
//     sortFn: (a: ItemData, b: ItemData) => a.name.localeCompare(b.name),
//     sortDirections: ['ascend', 'descend', null],
//     filterMultiple: true,
//     listOfFilter: [
//       { text: 'Joe', value: 'Joe' },
//       { text: 'Jim', value: 'Jim', byDefault: true }
//     ],
//     filterFn: (list: string[], item: ItemData) => list.some(name => item.name.indexOf(name) !== -1)
//   },
//   {
//     name: 'Age',
//     sortOrder: 'descend',
//     sortFn: (a: ItemData, b: ItemData) => a.age - b.age,
//     sortDirections: ['descend', null],
//     listOfFilter: [],
//     filterFn: null,
//     filterMultiple: true
//   },
//   {
//     name: 'Address',
//     sortOrder: null,
//     sortDirections: ['ascend', 'descend', null],
//     sortFn: (a: ItemData, b: ItemData) => a.address.length - b.address.length,
//     filterMultiple: false,
//     listOfFilter: [
//       { text: 'London', value: 'London' },
//       { text: 'Sidney', value: 'Sidney' }
//     ],
//     filterFn: (address: string, item: ItemData) => item.address.indexOf(address) !== -1
//   }
// ];