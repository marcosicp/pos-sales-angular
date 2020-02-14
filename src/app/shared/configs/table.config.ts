// ARCHIVO DE CONFIGURACION DE LAS TABLAS DINAMICAS.
// EN CADA CONFIGURACION (MANEJADAS COMO OBJETOS), LAS PROPIEDADES CORRESPONDEN A LAS PROPIEDADES DEL OBJETO QUE SE MOSTRARAN AL USUARIO
// CADA CONFIGURACION CONSTA DE LOS SIGUIENTES PUNTOS:
// - TITLE: EL TITULO DE LA TABLA QUE SE MUESTRA AL USUARIO
// - HEADERS: EL NOMBRE DE LOS ENCABEZADOS DE ACUERDO A LA PROPIEDAD QUE SE VA A VER
// - CELLS: LA RELACION DE CADA PROPIEDAD QUE IRA EN LA CELDA
// - FORMAT: SI LA CELDA EN CUESTION TENDRA UN FORMATO, SE LO DEBE DECLARAR EN BASE A LAS PIPES MANEJADAS EN EL COMPONENTE DYNAMICTABLE

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
    codigo: 'codigoProv',
    categoria: 'categoria',
    nombre: 'nombre',
    proveedor: 'proveedorNombre',
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
    peso: 'weight',
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
    telefono: 'Teléfono',
    rol: 'Tipo de usuario',
    opciones: 'Opciones'
  },
  cells: {
    nombre: 'nombre',
    apellido: 'apellido',
    usuario: 'usuario',
    email: 'email',
    telefono: 'telefono',
    rol: 'rol',
    opciones: null
  },
  format: {
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
    telefono: null,
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
    agendado: 'Entrega pactada',
    total: 'Monto total',
    opciones: 'Opciones'
  },
  cells: {
    creado: 'creado',
    cliente: 'cliente.razonSocial',
    responsable: 'pedido.usuario',
    estado: 'pedido.estado',
    agendado: 'agenda',
    total: 'pedido.total',
    opciones: null,
  },
  format: {
    creado: 'date',
    cliente: null,
    responsable: null,
    estado: null,
    agendado: 'boolean',
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
    cliente: 'cliente.razonSocial',
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

const TABLA_MOVIMIENTOS = {
  title: 'Movimientos',
  headers: {
    fechaMovimiento: 'Fecha movimiento',
    tipo: 'Tipo',
    monto: 'Monto',
    usuario: 'Usuario',
    descripcion: 'Descripción'
  },
  cells: {
    fechaMovimiento: 'fechaMovimiento',
    tipo: 'tipo',
    monto: 'monto',
    usuario: 'usuario.usuario',
    descripcion: 'descripcion'
  },
  format: {
    fechaMovimiento: 'date',
    tipo: null,
    monto: 'currency',
    usuario: null,
    descripcion: null
  }
};

export  {
  TABLA_STOCK,
  TABLA_USUARIOS,
  TABLA_CLIENTES,
  TABLA_PROVEEDORES,
  TABLA_VENTAS,
  TABLA_PEDIDOS,
  TABLA_MOVIMIENTOS
};
