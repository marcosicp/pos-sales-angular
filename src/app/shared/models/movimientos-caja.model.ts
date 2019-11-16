import { Usuarios } from './usuarios.model';

export class MovimientosCaja {
    id: string;
    monto: number;
    descripcion: string;
    tipo: string;
    fechaMovimiento: Date;
    usuario: Usuarios;
    creado: { type: Date };
    editado: { type: Date };
}
