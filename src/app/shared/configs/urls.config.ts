import BaseConfig from './base.config';

const isProd = true;
const URL_BASE = isProd ?
  BaseConfig.URL_PROD : BaseConfig.URL_LOCAL;

// API USUARIOS
const URL_USUARIOS = {
  GET_ALL: 'usuarios/GetAllUsuarios',
  ADD_USUARIO: 'usuarios/AddUsuario',
  UPDATE_USUARIO: 'usuarios/UpdateUsuario',
  DELETE_USUARIO: 'usuarios/DeleteUsuario',
  EMAIL_LOGIN: 'usuarios/login',
  MODIFY_PASS: 'usuarios/CambiarPass',
  RESET_PASS: 'usuarios/ResetPass'
};
// API STOCK
const URL_STOCK = {
  HOME: 'productos',
  GET_ALL: 'productos/GetAllProductos',
  ADD_STOCK: 'productos/AddProducto',
  UPDATE_STOCK: 'productos/UpdateProducto',
  DELETE_STOCK: 'productos/DeleteProducto',
};
// API PEDIDOS
const URL_PEDIDOS = {
  GET_ALL: 'pedidos/GetAllPedidos',
  CONFIRMAR: 'pedidos/ConfirmarPedido'
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
  GET_ALL_ENTREGAS: 'ventas/GetAllEntregas',
  UPDATE_VENTAS: 'ventas/UpdateVenta'
};
// API PROVEEDORES
const URL_PROVEEDORES = {
  GET_ALL: 'proveedores/GetAllProveedores',
  ADD_PROVEEDOR: 'proveedores/AddProveedor',
  UPDATE_PROVEEDOR: 'proveedores/UpdateProveedor',
  DELETE_PROVEEDOR: 'proveedores/DeleteProveedor'
};
// API MOVIMIENTOS
const URL_MOVIMIENTOS = {
  GET_ESTADO: 'movimientos/EstadoCaja',
  GET_ALL: 'movimientos/GetAllMovimientos',
  ADD_MOVIMIENTO: 'movimientos/AddMovimiento',
  GET_ULTIMA_APERTURA: 'movimientos/AperturaInicialCaja'
};

export {
  URL_BASE,
  URL_USUARIOS,
  URL_STOCK,
  URL_PEDIDOS,
  URL_PROVEEDORES,
  URL_CLIENTES,
  URL_VENTAS,
  URL_MOVIMIENTOS
};
