export class Usuarios {
  id: string;
  usuario: String;
  password: String;
  nombre: String;
  apellido: String;
  email: String;
  telefono: String;
  admin: Boolean;
  creado: { type: Date };
  editado: { type: Date };
}
