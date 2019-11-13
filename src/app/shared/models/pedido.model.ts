import { ProductoPedido } from './producto-venta.model';
import { Clientes } from './clientes.model';

export class Pedido {
    id: string;
    productosPedidos: ProductoPedido[];
    total: number;
    pagoCon: number;
    fechaPedido: Date;
    pesoTotal: number;
    clienteId: string;
    cliente: Clientes;
    fechaModificacion: Date;
    usuario: string;
    estado: string;
    imprimioTicket: boolean;
}
