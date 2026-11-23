const ventas = require("./src/datos.js")
let ventas_ciudad = new Map([
  ["medellin", 0],
  ["bogota", 0],
  ["cali", 0],
  ["pereira", 0]
]
);

const valorVenta = (venta) => venta.cantidad * venta.precio;
function totalVendido(ventas) {
  let total = 0
  for (let i = 0; i < ventas.length; i++) {
    //console.log(ventas[i].precio);
    total = total + (ventas[i].precio * ventas[i].cantidad);
  }
  return total;
}
function unidadesVendidas(ventas) {
  let total_unidades = 0
  for (let i = 0; i < ventas.length; i++) {
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
    if ((ventas[i].cantidad * ventas[i].precio) > (mayor.cantidad * mayor.precio)) {
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
  for (let i = 0; i < ventas.length; i++) {
    if (ventas[i].cantidad > 0) {
      contador = contador + 1
    }
  }
  return total / contador
}

// Ignora mayúsculas y espacios sobrantes
function ventasPorCiudad(ventas, ciudad) {
  let ciudades = new Map(
    [
      ["medellín",],
      ["",],
      [,],
      [,]
    ]
  )
  for (const venta of ventas) {
    
  }
  console.log(ventas_ciudad);

}


console.log(`Total vendido: $${totalVendido(ventas)}.`);
console.log(unidadesVendidas(ventas));
console.log(ventaMayor(ventas));
console.log(`Promedio: $${Math.round(ticketPromedio(ventas))}.`);
console.log(ventasPorCiudad(ventas, ventasPorCiudad[0]))