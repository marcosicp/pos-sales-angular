import { ProductoPedido } from './producto-venta.model';
import { Proveedores } from './proveedores.model';

export class Compra {
    id: string;
    productosPedidos: ProductoPedido[];
    total: number;
    fechaPedido: Date;
    pesoTotal: number;
    proveedorId: string;
    usuario: string;
}
