import BaseConfig from './base.config';

const isProd = true,
      BaseUrl = isProd ? BaseConfig.prodUrl : BaseConfig.localUrl,
      UserUrl = {
        home: 'usuarios',
        emailLogin: `usuarios/login`
      },
      ProductosUrl = {
        home: 'productos',
        getAll: 'productos/GetAllProductos'
      },
      AdminUrl = {
        ultimaApertura: 'administracion/ultimaApertura',
        cerrarCaja: 'administracion/cerrarCaja'
      },
      PedidosUrl = {
        getAll: 'pedidos/GetAllPedidos'
      },
      ClientesUrl = {
        getAll: 'clientes/GetAllClientes'
      },
      ProveedoresUrl = {
        getAll: 'proveedores/GetAllProveedores'
      };

export {
  BaseUrl,
  UserUrl,
  ProductosUrl,
  AdminUrl,
  PedidosUrl,
  ProveedoresUrl,
  ClientesUrl
};
