import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { Pedido } from '../../shared/models/pedido.model';
import { Clientes } from './clientes.model';

export class Venta {
    id: string;
    codigo: string;
    productosVenta: ProductoPedido[];
    pedido: Pedido;
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
