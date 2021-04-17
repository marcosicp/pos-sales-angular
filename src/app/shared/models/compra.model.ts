import { ProductoPedido } from './producto-venta.model';
import { Proveedores } from './proveedores.model';

export class Compra {
    id: string;
    productosCompra: ProductoPedido[];
    total: number;
    cuil: string;
    nombreProveedor: string;
    fechaCompra: Date;
    pesoTotal: number;
    proveedorId: string;
    razonSocial: string;
    usuario: string;
}
