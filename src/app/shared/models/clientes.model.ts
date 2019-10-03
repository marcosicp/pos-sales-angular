// import { Item } from './item';

export class Clientes {
  id: string;

  //ESTA PROPERTY ES SOLO PARA EL SELECT DE CLIENTES
  displayName: String;

  descripcion: String;
  cuit: String;
  razonSocial: String;
  cuil: String;
  dni: String;
  nombre: String;
  apellido: String;
  email: String;
  tipoFactura: String;
  direccion: String;
  telefono: String;
  activo: Boolean;
  creado: { type: Date };
  editado: { type: Date };
}
