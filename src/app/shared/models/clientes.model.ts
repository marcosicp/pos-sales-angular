// import { Item } from './item';

export class Clientes {
  _id: string;
  descripcion: String;
  cuit: String;
  razonsocial: String;
  cuil: String;
  dni: String;
  nombre: String;
  apellido: String;
  email: String;
  telefono: String;
  activo: Boolean;
  creado: { type: Date };
  editado: { type: Date };
}
