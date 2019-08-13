import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { Clientes } from './clientes.model';

export class Venta {
    id: string;
    productosVenta: ProductoPedido[];
    total: number;
    pagoCon: number;
    pesoTotal: number;
    fechaVenta: Date;
    vuelto: number;
    fechaModificacion: Date;
    usuario: string;
    clienteId: string;
    cliente: Clientes;
    imprimioTicket: boolean;
    creado: Date;
    estado: string;
    imagenUrl: string;
}
