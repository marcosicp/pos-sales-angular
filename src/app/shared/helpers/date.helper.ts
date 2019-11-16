export default () => {
  const fecha = new Date();
  fecha.setHours(fecha.getHours() - 3);
  return fecha;
}
