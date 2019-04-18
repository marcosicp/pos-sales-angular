// import { Item } from './item';

export class Productos {
  _id: string;
  nombre: String;
  cantidad: number;
  precioCompra: number;
  precioVenta: number;
  peso: number;
  created_at: { type: Date };
  updated_at: { type: Date }
}
