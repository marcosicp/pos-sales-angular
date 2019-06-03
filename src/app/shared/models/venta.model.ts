import { ProductoPedido } from '../../shared/models/producto-venta.model';

export class Venta {
    id: string;
    productosVenta: ProductoPedido[];
    total: number;
    pagoCon: number;
    fechaVenta: Date;
    vuelto: number;
    fechaModificacion: Date;
    usuario: string;
    imprimioTicket: boolean;
}
