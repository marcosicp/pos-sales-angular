import { ProductoPedido } from './producto-venta.model';

export class Pedido {
    id: string;
    ProductosPedidos: ProductoPedido[];
    Total: number;
    PagoCon: number;
    FechaPedido: Date;
    Vuelto: number;
    FechaModificacion: Date;
    UsuarioVendio: string;
    ImprimioTicket: boolean;
}
