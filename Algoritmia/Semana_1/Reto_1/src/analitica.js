function mostrarTabla(ventas){
    if (ventas === undefined) {
        //Borde: Posición que no existe, devuelve undefined.
        return console.log("No es halló el registro.")
    }
    //Muestra la tabla completa.
    return console.table(ventas)
}

function valorVenta(venta){
    let cantidadXprecio = venta.cantidad * venta.precio
    return cantidadXprecio
}

function totalVendido (ventas){
    let sumaTotal= 0; 
    for (let i = 0; i < ventas.length; i++){
        sumaTotal += valorVenta(ventas[i])
    }
    return sumaTotal
}

function ventaMayor(ventas) {
  let mayor = ventas[0];
  // console.log(mayor);
  for (let i = 1; i < ventas.length; i++) {
    if (valorVenta(ventas[i]) > (valorVenta(mayor))) {
      mayor = ventas[i];
      // console.log(mayor);
    }
  }
  console.table(mayor);
  return console.table({"Total vendido": valorVenta(mayor)})
}
    
function ticketPromedio(ventas) {
  let total = totalVendido(ventas)
  let contador = 0;
  let promedio;
  for (let i = 0; i < ventas.length; i++) {
    if (ventas[i].cantidad > 0) {
      contador = contador + 1
    }
  }
  promedio = Math.round(total/contador)
  return console.table({"Promedio general" : promedio})
}

function ventasPorciudad(){


}

module.exports = {
    mostrarTabla, 
    valorVenta,
    totalVendido,
    ventaMayor,
    ticketPromedio,
    ventasPorciudad
}