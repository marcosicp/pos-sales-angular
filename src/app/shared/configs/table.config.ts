const TABLA_STOCK = {
  title: 'Stock',
  headers: {
    codigo: 'Código',
    categoria: 'Categoría',
    nombre: 'Nombre',
    proveedor: 'Proveedor',
    precioVenta: 'Precio de venta',
    precioCompra: 'Precio de compra',
    cantidad: 'Unidades disponibles',
    peso: 'Peso en Kg',
    opciones: 'Opciones'
  },
  cells: {
    codigo: 'codigo',
    categoria: 'categoria',
    nombre: 'nombre',
    proveedor: 'proveedor',
    precioVenta: 'precioVenta',
    precioCompra: 'precioCompra',
    cantidad: 'cantidad',
    peso: 'peso',
    opciones: null
  },
  format: {
    codigo: null,
    categoria: null,
    nombre: null,
    proveedor: null,
    precioVenta: 'currency',
    precioCompra: 'currency',
    cantidad: null,
    peso: 'number',
    opciones: null
  }
};

const TABLA_USUARIOS = {
  title: 'Usuarios',
  headers: {
    nombre: 'Nombre',
    apellido: 'Apellido',
    usuario: 'Usuario',
    email: 'E-mail',
    rol: 'Tipo de usuario',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    apellido: 'apellido',
    usuario: 'usuario',
    email: 'email',
    rol: 'rol',
    opciones: null
  },
  format: {
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
    rol: 'role',
    opciones: null
  }
};

const TABLA_CLIENTES = {
  title: 'Clientes',
  headers: {
    nombre: 'Nombre',
    razonSocial: 'Razón Social',
    cuil: 'CUIL',
    telefono: 'Teléfono',
    email: 'Email',
    direccion: 'Dirección',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    razonSocial: 'razonSocial',
    cuil: 'cuil',
    telefono: 'telefono',
    email: 'email',
    direccion: 'direccion',
    opciones: null
  },
  format: {
    nombre: null,
    razonSocial: null,
    cuil: 'cuil',
    telefono: 'phone',
    email: null,
    direccion: null,
    opciones: null
  }
};

const TABLA_PROVEEDORES = {
  title: 'Proveedores',
  headers: {
    nombre: 'Nombre',
    razonSocial: 'Razón Social',
    cuil: 'CUIL',
    telefono: 'Teléfono',
    email: 'Email',
    direccion: 'Dirección',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    razonSocial: 'razonSocial',
    cuil: 'cuil',
    telefono: 'telefono',
    email: 'email',
    direccion: 'direccion',
    opciones: null
  },
  format: {
    nombre: null,
    razonSocial: null,
    cuil: 'cuil',
    telefono: 'phone',
    email: null,
    direccion: null,
    opciones: null
  }
};

const TABLA_VENTAS = {
  title: 'Ventas',
  headers: {
    creado: 'Fecha de venta',
    cliente: 'Cliente',
    responsable: 'Responsable',
    estado: 'Estado',
    imprimioTicket: 'Se imprimio ticket',
    total: 'Monto total',
    opciones: 'Opciones'
  },
  cells: {
    creado: 'creado',
    cliente: 'pedido.cliente',
    responsable: 'pedido.usuario',
    estado: 'pedido.estado',
    imprimioTicket: 'imprimioTicket',
    total: 'pedido.total',
    opciones: null,
  },
  format: {
    creado: 'date',
    cliente: null,
    responsable: null,
    estado: null,
    imprimioTicket: 'boolean',
    total: 'currency',
    opciones: null
  }
};

const TABLA_PEDIDOS = {
  title: 'Pedidos',
  headers: {
    creado: 'Fecha de pedido',
    imprimioTicket: 'Se imprimio ticket',
    responsable: 'Responsable',
    cliente: 'Cliente',
    total: 'Monto total',
    estado: 'Estado',
    opciones: 'Opciones'
  },
  cells: {
    creado: 'creado',
    imprimioTicket: 'imprimioTicket',
    responsable: 'usuario',
    cliente: 'cliente',
    total: 'total',
    estado: 'estado',
    opciones: null
  },
  format: {
    creado: 'date',
    imprimioTicket: 'boolean',
    responsable: null,
    cliente: null,
    total: 'currency',
    estado: null,
    opciones: null
  }
};

export  {
  TABLA_STOCK,
  TABLA_USUARIOS,
  TABLA_CLIENTES,
  TABLA_PROVEEDORES,
  TABLA_VENTAS,
  TABLA_PEDIDOS
};
