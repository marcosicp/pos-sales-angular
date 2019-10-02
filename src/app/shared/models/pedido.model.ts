import { ProductoPedido } from './producto-venta.model';

export class Pedido {
    id: string;
    productosPedidos: ProductoPedido[];
    total: number;
    pagoCon: number;
    fechaPedido: Date;
    pesoTotal: number;
    clienteId: string;
    fechaModificacion: Date;
    usuario: string;
    estado: string;
    imprimioTicket: boolean;
}
