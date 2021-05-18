// USARNDO LA CONFIGURACION BASE DE LA API, SE COMBINA LA URL BASE (SI SE QUIERE APUNTAR A PRODUCCION O LOCAL) CON LA API A DESEAR
// PARA FACILIAR EL ORDEN, SE AGRUPARON TODAS LAS URL DE UN MODULO EN UN MISMO OBJETO, TENIENDO LA FORMA DE URL_MODULO.METODO_API
// TAMBIEN SE PUEDE LLAMAR CADA API POR SEPARADO
import BaseConfig from './base.config';

const isProd = false;
const URL_BASE = isProd ?
  BaseConfig.URL_PROD : BaseConfig.URL_LOCAL;

// API USUARIOS
const URL_USUARIOS = {
  GET_ALL: 'usuarios/GetAllUsuarios',
  ADD_USUARIO: 'usuarios/AddUsuario',
  UPDATE_USUARIO: 'usuarios/UpdateUsuario',
  DELETE_USUARIO: 'usuarios/DeleteUsuario',
  EMAIL_LOGIN: 'login/Login',
  MODIFY_PASS: 'usuarios/CambiarPass',
  RESET_PASS: 'usuarios/ResetPass'
};
// API STOCK
const URL_STOCK = {
  HOME: 'productos',
  GET_ALL: 'productos/GetAllProductos',
  GET_ALL_CATEGORIAS: 'productos/GetAllCategorias',
  ADD_STOCK: 'productos/AddProducto',
  UPDATE_STOCK: 'productos/UpdateProducto',
  DELETE_STOCK: 'productos/DeleteProducto',
  ADD_COMPRA: 'productos/AddCompra',
  UPDATE_GANANCIAS: 'productos/UpdateGanancias'
};
// API CLIENTES
const URL_CLIENTES = {
  GET_ALL: 'clientes/GetAllClientes',
  ADD_CLIENTE: 'clientes/AddCliente',
  UPDATE_CLIENTE: 'clientes/UpdateCliente',
  DELETE_CLIENTE: 'clientes/DeleteCliente',
};
// API VENTAS
const URL_VENTAS = {
  GET_ALL: 'ventas/GetAllVentas',

  GET_VENTAS_MES: 'ventas/GetTotalVentasMes',
  GET_VENTAS_MERCADOPAGO_MES: 'ventas/GetTotalVentasMercadoPagoMes',
  GET_VENTAS_TRANSFERENCIA_MES: 'ventas/GetTotalVentasTransferenciaMes',
  GET_VENTAS_PY_MES: 'ventas/GetTotalVentasPedidosYaMes',
  GET_VENTAS_EFECTIVO_MES: 'ventas/GetTotalVentasEfectivoMes',
  GET_VENTAS_UNACUOTA_MES: 'ventas/GetTotalVentasUnaCuotaMes',
  GET_VENTAS_TRESCUOTAS_MES: 'ventas/GetTotalVentasTresCuotasMes',
  GET_VENTAS_DEBITO_MES: 'ventas/GetTotalVentasDebitoMes',
  GET_VENTAS_CUENTACORRIENTE_MES: 'ventas/GetTotalVentasCuentaCorrienteMes',

  GET_VENTAS_HOY: 'ventas/GetTotalVentasHoy',
  GET_VENTAS_PY_HOY: 'ventas/GetTotalVentasPedidosYaHoy',
  GET_VENTAS_MERCADOPAGO_HOY: 'ventas/GetTotalVentasMercadoPagoHoy',
  GET_VENTAS_TRANSFERENCIA_HOY: 'ventas/GetTotalVentasTransferenciaHoy',
  GET_VENTAS_UNACUOTA_DIA: 'ventas/GetTotalVentasUnaCuotaHoy',
  GET_VENTAS_TRESCUOTAS_DIA: 'ventas/GetTotalVentasTresCuotasHoy',
  GET_VENTAS_DEBITO_HOY: 'ventas/GetTotalVentasDebitoHoy',
  GET_VENTAS_EFECTIVO_HOY: 'ventas/GetTotalVentasEfectivoHoy',
  GET_VENTAS_CUENTACORRIENTE_HOY: 'ventas/GetTotalVentasCuentaCorrienteHoy',

  UPDATE_VENTAS: 'ventas/UpdateVenta'
};
// API CONFIGURACION
const URL_CONFIGURACION = {
  GET_ALL: 'configuracion/GetAllConfiguracion',
  UPDATE_CONFIGURACION: 'configuracion/UpdateConfiguracion'
};
// API PROVEEDORES
const URL_PROVEEDORES = {
  GET_ALL: 'proveedores/GetAllProveedores',
  GET_ALL_COMPRAS_PROVEEDORES: 'proveedores/GetAllComprasProveedores',
  ADD_PROVEEDOR: 'proveedores/AddProveedor',
  UPDATE_PROVEEDOR: 'proveedores/UpdateProveedor',
  DELETE_PROVEEDOR: 'proveedores/DeleteProveedor'
};
// API MOVIMIENTOS
const URL_MOVIMIENTOS = {
  GET_ESTADO: 'movimientos/EstadoCaja',
  GET_ALL: 'movimientos/GetAllMovimientos',
  ADD_MOVIMIENTO: 'movimientos/AddMovimiento',
  GET_ULTIMA_APERTURA: 'movimientos/AperturaInicialCaja',
  GET_CIERRE_CAJA_CALCULO: 'movimientos/CierreCajaCalculo',
  GET_CIERRE_CAJA_CONFIRMADO: 'movimientos/CierreCajaConfirmado'
};

export {
  URL_BASE,
  URL_USUARIOS,
  URL_STOCK,
  URL_PROVEEDORES,
  URL_CLIENTES,
  URL_VENTAS,
  URL_CONFIGURACION,
  URL_MOVIMIENTOS
};
