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
    creado: 'Fecha de creación'
  },
  cells: {
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
    fechaNacimiento: 'date',
    creado: 'date'
  }
};

export  {
  TABLA_PRODUCTOS,
  TABLA_USUARIOS
};
