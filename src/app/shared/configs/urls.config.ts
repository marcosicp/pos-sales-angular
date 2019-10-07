import BaseConfig from './base.config';

const isProd = true,
      URL_BASE = isProd ? BaseConfig.URL_PROD : BaseConfig.URL_LOCAL,
      URL_USER = {
        HOME: 'usuarios',
        EMAIL_LOGIN: 'usuarios/login',
        ADD_USER: 'usuarios/agregar',
        MODIFY_USER: 'usuarios/modificar',
        DELETE_USER: 'usuarios/eliminar',
        MODIFY_PASS: 'usuarios/cambiarPass'
      },
      URL_PRODUCTOS = {
        HOME: 'productos',
        GET_ALL: 'productos/GetAllProductos'
      },
      URL_ADMIN = {
        ULTIMA_APERTURA: 'movimientos/AperturaInicialCaja',
        CERRAR_CAJA: 'movimientos/cerrarCaja'
      },
      URL_PEDIDOS = {
        GET_ALL: 'pedidos/GetAllPedidos',
        CONFIRMAR: 'pedidos/ConfirmarPedido'
      },
      URL_CLIENTES = {
        GET_ALL: 'clientes/GetAllClientes',
        DELETE_CLIENTE: 'clientes/DeleteCliente',
      },
      URL_VENTAS = {
        GET_ALL: 'ventas/GetAllVentas',
        GET_ALL_ENTREGAS: 'ventas/GetAllEntregas'
      },
      URL_PROVEEDORES = {
        GET_ALL: 'proveedores/GetAllProveedores',
        DELETE_PROVEEDOR: 'proveedores/DeleteProveedor'
      };

export {
  URL_BASE,
  URL_USER,
  URL_PRODUCTOS,
  URL_ADMIN,
  URL_PEDIDOS,
  URL_PROVEEDORES,
  URL_CLIENTES,
  URL_VENTAS
};
