// export interface Item {
//   id: string;
//   title: string;
//   addedDate: string;
//   order: number;
// }
//
// export interface Data {
//   item: Item;
// }

export interface CommonResponse<T = object> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}
