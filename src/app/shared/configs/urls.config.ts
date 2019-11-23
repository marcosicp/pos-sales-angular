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
  EMAIL_LOGIN: 'usuarios/login',
  MODIFY_PASS: 'usuarios/CambiarPass'
};
// API STOCK
const URL_STOCK = {
  HOME: 'productos',
  GET_ALL: 'productos/GetAllProductos',
  ADD_STOCK: 'productos/AddProducto',
  UPDATE_STOCK: 'productos/UpdateProducto',
  DELETE_STOCK: 'productos/DeleteProducto',
};
// API CAJA/ADMIN
const URL_ADMIN = {
  ULTIMA_APERTURA: 'movimientos/AperturaInicialCaja',
  CERRAR_CAJA: 'movimientos/cerrarCaja'
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
  GET_ALL_ENTREGAS: 'ventas/GetAllEntregas'
};
// API PROVEEDORES
const URL_PROVEEDORES = {
  GET_ALL: 'proveedores/GetAllProveedores',
  ADD_PROVEEDOR: 'proveedores/AddProveedor',
  UPDATE_PROVEEDOR: 'proveedores/UpdateProveedor',
  DELETE_PROVEEDOR: 'proveedores/DeleteProveedor'
};

export {
  URL_BASE,
  URL_USUARIOS,
  URL_STOCK,
  URL_ADMIN,
  URL_PEDIDOS,
  URL_PROVEEDORES,
  URL_CLIENTES,
  URL_VENTAS
};
