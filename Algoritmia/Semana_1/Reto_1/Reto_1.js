const ventas = [
  { id: 1, fecha: "2026-09-01", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Medellín", cantidad: 2, precio: 42000 },
  { id: 2, fecha: "2026-09-01", cliente: "C02", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 1, precio: 26000 },
  { id: 3, fecha: "2026-09-02", cliente: "C03", producto: "Prensa francesa", ciudad: "Cali", cantidad: 1, precio: 95000 },
  { id: 4, fecha: "2026-09-02", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Medellín", cantidad: 1, precio: 42000 },
  { id: 5, fecha: "2026-09-03", cliente: "C04", producto: "Origen Sierra 500 g", ciudad: "medellín", cantidad: 3, precio: 45000 },
  { id: 6, fecha: "2026-09-03", cliente: "C05", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 2, precio: 26000 },
  { id: 7, fecha: "2026-09-04", cliente: "C02", producto: "Molino manual", ciudad: "Bogotá", cantidad: 1, precio: 120000 },
  { id: 8, fecha: "2026-09-04", cliente: "C06", producto: "Origen Huila 500 g", ciudad: "Cali", cantidad: 0, precio: 42000 },
  { id: 9, fecha: "2026-09-05", cliente: "C03", producto: "Origen Sierra 500 g", ciudad: "Cali", cantidad: 2, precio: 45000 },
  { id: 10, fecha: "2026-09-05", cliente: "C07", producto: "Origen Huila 500 g", ciudad: "Pereira", cantidad: 4, precio: 42000 },
  { id: 11, fecha: "2026-09-06", cliente: "C01", producto: "Prensa francesa", ciudad: "Medellín", cantidad: 1, precio: 95000 },
  { id: 12, fecha: "2026-09-06", cliente: "C08", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 3, precio: 26000 },
];

const valorVenta = (venta) => venta.cantidad * venta.precio;
function totalVendido(ventas) {
  let total= 0
  for (let i = 0; i < ventas.length; i++){
    //console.log(ventas[i].precio);
    total = total + (ventas[i].precio * ventas[i].cantidad);
  }
  return total;
}
function unidadesVendidas(ventas) {
  let total_unidades = 0
  for (let i = 0; i < ventas.length; i++){
    //console.log(ventas[i].precio);
    total_unidades = total_unidades + ventas[i].cantidad;
  }
  return `Total de unidades vendidas: ${total_unidades} unidades.`;
}

// Devuelve el registro completo, no solo el valor
function ventaMayor(ventas) {
  let mayor = ventas[0];
  // console.log(mayor);
  for (let i = 1; i < ventas.length; i++) {
    if ((ventas[i].cantidad * ventas[i].precio) > (mayor.cantidad * mayor.precio )) {
      mayor = ventas[i];
      // console.log(mayor);
    }
  }
  return `Venta mayor: ${mayor.cliente} - ${mayor.producto} - $${mayor.cantidad * mayor.precio}`;
}

// Total ÷ cantidad de ventas válidas (cantidad > 0)
function ticketPromedio(ventas) {
  let total = totalVendido(ventas)
  let contador = 0;
  for (let i = 0; i < ventas.length; i++ ){
    if (ventas[i].cantidad > 0){
      contador = contador+1
    }
  }
  return total/contador
}

// Ignora mayúsculas y espacios sobrantes
function ventasPorCiudad(ventas, ciudad) {
  
}

console.log(`Total vendido: $${totalVendido(ventas)}.`);
console.log(unidadesVendidas(ventas));
console.log(ventaMayor(ventas));
console.log(`Promedio: $${ticketPromedio(ventas).toFixed(0)}.`);