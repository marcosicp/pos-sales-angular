const TABLA_PRODUCTOS = {
  headers: {
    nombre: 'Nombre',
    codigo: 'Código',
    imagenUrl: 'Imagen',
    precioVenta: 'Precio de venta',
    precioCompra: 'Precio de Compra',
    cantidad: 'Disponible',
    peso: 'Peso en Kg',
    creado: 'Fecha creado',
    editado: 'Fecha modificado'
  },
  cells: {
    nombre: null,
    codigo: null,
    imagenUrl: null,
    precioVenta: 'currency',
    precioCompra: 'currency',
    cantidad: null,
    peso: null,
    creado: 'date',
    editado: 'date'
  }
};

export  {
  TABLA_PRODUCTOS
};
