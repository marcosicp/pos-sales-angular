// SE CREO PARA CALCULAR LA FECHA CON FORMATO UTC -3 HORAS (AL SER LA HORA STANDAR DE ARGENTINA)
export default () => {
  const fecha = new Date();
  fecha.setHours(fecha.getHours() - 3);
  return fecha;
};
