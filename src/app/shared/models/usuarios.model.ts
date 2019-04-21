// import { Item } from './item';

export class Usuarios {
  _id: string;
  usuario: String;
  password: String;
  nombre: String;
  apellido: String;
  email: String;
  telefono: String;
  admin: Boolean;
  created_at: { type: Date };
  updated_at: { type: Date };
}
