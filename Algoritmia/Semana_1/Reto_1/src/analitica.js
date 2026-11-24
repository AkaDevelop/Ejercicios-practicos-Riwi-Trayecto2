const prompts = require('prompt-sync')();

function mostrarTabla(ventas) {
  if (ventas === undefined) {
    //Borde: Posición que no existe, devuelve undefined.
    return console.log("No es halló el registro.")
  }
  for (const venta of ventas) {
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
  return console.table({ "Total vendido": valorVenta(mayor).toLocaleString("es-CO") })
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
  return console.table({ "Promedio general": promedio.toLocaleString("es-CO") })
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
  let ciudadinput;
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
  return console.table(new Map([
    [ciudadinput, ciudades.get(ciudadinput)]
  ]));
}


// _______________ Funciones con métodos de arrays ____________
function totalVendidoM(ventas) {
  let totalSum = 0
  ventas.filter(venta => totalSum += valorVenta(venta))
  return console.table({ "Total general": totalSum.toLocaleString("es-CO") })
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

function topProductosPorValor(ventas, k) {
  //Copio el array completo en un nuevo espacio en la memoria. Listo
  //Organizo el array de mayor a menor ventas segun total, Listo
  //Uso una funcion ya creada para factorizar código Listo (Valorventa)
  //Esta funcion necesita que K sea un número de longitud. Construccion
  //Tengo que limitar los bordes, por ejemplo array.longitud es 12.
  //Entonces, si K > 12 o K < 0, devuelve un mensaje de error o 
  //Pido un valor válido, hasta que se cumpla.
  //Luego de saber la longitud que quiero filtrar
  //Solo es crear un array nuevo, puede ser con un for. 
  //O mirare un metodo existe para contruirlo con los primeros K registros.


  //Con esto mapeamos una array nuevo en otra posicion en la memoria
  //Con una columna o clave nueva llamada total en cada fila
  const ventasCopia = ventas.map(venta => ({ ...venta, total: valorVenta(venta).toLocaleString("es-CO") }));

  //Ordenamos con sort de manera descendente, para poder tener el mayor de primero siempre.
  ventasCopia.sort((ventaMayor, ventaMenor) => ventaMenor.total - ventaMayor.total);

  //Con el if estamos diciendo practicamente si no tienes 
  //Un valor en la funcion definido con anterioridad pide un input al usuario.
  if (k === null || k === undefined) {
    //Controlamos K con while para que cumpla una longitud valida
    //Y coherente con el array que estamos validando
    while (true) {
      k = Number(prompts("Ingrese la cantidad de registros que desea ver: "))


      if (k < 0 || k > ventas.length || !Number.isInteger(k)) {

        //si k registros no existe entonces k = ventas.longitud y melo.
        //Se mostrará el total de registros hallados
        //Total de registros 
        k = ventas.length
        break;
      }
      break;
    }

  }


  //Como ya confirmamos que K es válido, ahora si hacemos un slice,
  //Para imprimir desde la posicion 0 hasta k.
  return console.table(ventasCopia.slice(0, k))
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