import { ProductoPedido } from './producto-venta.model';

export class Pedido {
    id: string;
    ProductosPedidos: ProductoPedido[];
    Total: number;
    PagoCon: number;
    FechaPedido: Date;
    PesoTotal: number;
    ClienteId: string;
    FechaModificacion: Date;
    Usuario: string;
    ImprimioTicket: boolean;
}
