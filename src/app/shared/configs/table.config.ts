const TABLA_PRODUCTOS = {
  title: 'Productos',
  headers: {
    nombre: 'Nombre',
    codigo: 'Código',
    precioVenta: 'Precio de venta',
    precioCompra: 'Precio de compra',
    cantidad: 'Unidades disponibles',
    peso: 'Peso en Kg',
    creado: 'Fecha de creación',
    editado: 'Fecha de modificación'
  },
  cells: {
    nombre: 'nombre',
    codigo: 'codigo',
    precioVenta: 'precioVenta',
    precioCompra: 'precioCompra',
    cantidad: 'cantidad',
    peso: 'peso',
    creado: 'creado',
    editado: 'editado'
  },
  format: {
    nombre: null,
    codigo: null,
    precioVenta: 'currency',
    precioCompra: 'currency',
    cantidad: null,
    peso: 'number',
    creado: 'date',
    editado: 'date'
  }
};

const TABLA_USUARIOS = {
  title: 'Usuarios',
  headers: {
    nombre: 'Nombre',
    apellido: 'Apellido',
    usuario: 'Usuario',
    email: 'E-mail',
    fechaNacimiento: 'Fecha de nacimiento',
    creado: 'Fecha de creación',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    apellido: 'apellido',
    usuario: 'usuario',
    email: 'email',
    fechaNacimiento: 'fechaNacimiento',
    creado: 'creado',
    opciones: null
  },
  format: {
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
    fechaNacimiento: 'date',
    creado: 'date',
    opciones: null
  }
};

const TABLA_CLIENTES = {
  title: 'Clientes',
  headers: {
    nombre: 'Nombre',
    activo: 'Activo',
    telefono: 'Teléfono',
    email: 'Email',
    creado: 'Fecha creado',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    activo: 'activo',
    telefono: 'telefono',
    email: 'email',
    creado: 'creado',
    opciones: null
  },
  format: {
    nombre: null,
    activo: 'boolean',
    telefono: null,
    email: null,
    creado: 'date',
    opciones: null
  }
};

const TABLA_PROVEEDORES = {
  title: 'Proveedores',
  headers: {
    nombre: 'Nombre',
    cuil: 'CUIL',
    telefono: 'Teléfono',
    email: 'Email',
    razonSocial: 'Razón Social',
    direccion: 'Dirección',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    cuil: 'cuil',
    telefono: 'telefono',
    email: 'email',
    razonSocial: 'razonSocial',
    direccion: 'direccion',
    opciones: null
  },
  format: {
    nombre: null,
    cuil: null,
    telefono: null,
    email: null,
    razonSocial: null,
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
    total: null,
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
}

export  {
  TABLA_PRODUCTOS,
  TABLA_USUARIOS,
  TABLA_CLIENTES,
  TABLA_PROVEEDORES,
  TABLA_VENTAS,
  TABLA_PEDIDOS
};
