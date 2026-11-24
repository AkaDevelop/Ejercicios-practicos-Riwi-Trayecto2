function mostrarTabla(ventas) {
  if (ventas === undefined) {
    //Borde: Posición que no existe, devuelve undefined.
    return console.log("No es halló el registro.")
  }
  for (const venta of ventas){
    venta.precioCOP = venta.precio.toLocaleString("es-CO")
  }
  //Muestra la tabla completa.
  return console.table(ventas)
}

function valorVenta(venta) {
  let cantidadXprecio = venta.cantidad * venta.precio
  return cantidadXprecio
}

function totalVendido(ventas) {
  let sumaTotal = 0;
  for (let i = 0; i < ventas.length; i++) {
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
  return console.table({ "Total vendido": valorVenta(mayor) })
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
  promedio = Math.round(total / contador)
  return console.table({ "Promedio general": promedio })
}

function ventasPorCiudad(ventas, ciudad) {

  let ciudades = new Map(
    [
      ["medellín", 0],
      ["bogotá", 0],
      ["pereira", 0],
      ["cali", 0]
    ]
  )
  let ciudadtrim;
  let contador = 0;
  for (const venta of ventas) {
    ciudadtrim = venta.ciudad.trim().toLowerCase()
    ciudadinput = ciudad.trim().toLowerCase()
    //console.log(venta.ciudad)
    if (ciudadtrim === ciudadinput) {
      contador += venta.cantidad
      //console.log(contador, venta.cantidad, venta.ciudad)
    }

  }
  try {
    ciudades.set(ciudadinput, contador)
  } catch (error) {
    console.log(error.message)
    console.log("Como ingresó una lista vacía no se puede validar la ciudad.")
  }
  return console.table(ciudades);
}


// _______________ Funciones con métodos de arrays ____________
function totalVendidoM(ventas) {
  let totalSum = 0
  ventas.filter(venta => totalSum += valorVenta(venta))
  return console.table({ "Total general": totalSum })
}

function unidadesVendidasM(ventas) {
  let unidadesVendidas = 0
  ventas.filter(venta => unidadesVendidas += venta.cantidad)
  return console.table({ "Total de unidades vendidas": unidadesVendidas })
}

function ventasPorCiudadM(ventas, ciudad) {
  let ciudadTrim = ciudad.trim().toLowerCase();

  let ventasPorCiudad = ventas.filter(venta => venta.ciudad.trim().toLowerCase() === ciudadTrim)
    .reduce((total, venta) => venta.cantidad + total, 0);
  return console.table(new Map(
    [
      [ciudadTrim, ventasPorCiudad]
    ]
  )
  );
}

function unidadesPorProducto(ventas) {
  let unidadesPorProducto =
    ventas.filter(venta => venta.cantidad > 0)
      .reduce((newMap, venta) => {
        newMap.set(venta.producto, (newMap.get(venta.producto) || 0) + venta.cantidad)
        return newMap
      }, new Map())    
  return console.table([...unidadesPorProducto])
}

function topProductosPorValor(ventas, k){

}

module.exports = {
  mostrarTabla,
  valorVenta,
  totalVendido,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  unidadesPorProducto,
  topProductosPorValor
}