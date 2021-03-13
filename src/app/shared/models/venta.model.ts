import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { Pedido } from '../../shared/models/pedido.model';
import { Clientes } from './clientes.model';
import { CalendarEvent } from 'angular-calendar';

export class Venta {
    id: string;
    codigo: string;
    productosVenta: ProductoPedido[];
    total: number;
    pagoCon: number;
    descuento: number;
    usuario: string;
    clienteId: string;
    cliente: Clientes;
    direccion: string;
    observacion: string;
    imprimioTicket: boolean;
    creado: Date;
    editado: Date;
    tipoTransaccion: string;
    imagenUrl: string;
}
