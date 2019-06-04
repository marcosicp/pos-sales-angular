// import { Item } from './item';

export class Clientes {
  _id: string;
  descripcion: String;
  cuit: String;
  razonsocial: String;
  nombre: String;
  apellido: String;
  email: String;
  telefono: String;
  activo: Boolean;
  created_at: { type: Date };
  updated_at: { type: Date };
}
