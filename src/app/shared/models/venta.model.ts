import { ProductoVenta } from './producto-venta.model';

export class Venta {
    id: string;
    productosVenta: ProductoVenta[];
    total: number;
    pagoCon: number;
    fechaVenta: Date;
    vuelto: number;
    fechaModificacion: Date;
    usuarioVendio: string;
    imprimioTicket: boolean;
}
