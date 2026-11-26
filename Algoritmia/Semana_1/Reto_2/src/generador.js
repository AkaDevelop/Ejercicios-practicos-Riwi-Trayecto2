
function generarVentas(n) {
  //Primero se deben crear los registros para jugar con la aleatoriedad
  //Creamos una funcion con math.random Scada de 3wschool para valores aleatorios.
  const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Molino manual", precio: 120000 },
  ];
  const cantidadClientes = aleatorio(1, Math.max(1, Math.floor(n / 3)));
  const ciudades = ["Medellín", "Pereira", "Bogotá", "Cali"];
  let bigDataVentas = [];

  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Asi vamos a generar el tipo cliente aleatorio: `C0${aleatorio(1, 8)}`
  //Así la cantidad aleatoria: aleatorio(1, 5)
  //console.log(cantidadClientes)
  //console.log(tipoCliente)
  //console.log(cantidadProducto)
  //console.log(ciudades[aleatorio(0, 3)])
  //console.log(productos[aleatorio(0, 4)]) //Selecciona e imprime un producto:valor aleatorio

  for (let i = 0; i < n; i++) {
    let aleatorioNum = aleatorio(0, 4); //Necesario para pasar el mismo aleatorio a valor y producto.
    bigDataVentas.push({
      id: i + 1,
      cliente: `C0${aleatorio(1, cantidadClientes)}`,
      producto: productos[aleatorioNum].nombre,
      ciudad: ciudades[aleatorio(0, 3)],
      cantidad: aleatorio(1, 5),
      precio: productos[aleatorioNum].precio,
      precioCOP: `$${productos[aleatorioNum].precio.toLocaleString("es-CO")}`
    });
  }
  return bigDataVentas;
}

function totalVendido(ventas) {
  let total = 0;
  //let total2 = 0
  let contador = 0;
  while (true) {
    if (contador < ventas.length) {
      total = total + ventas[contador].precio * ventas[contador].cantidad;
      contador = contador + 1;
    } else {
      break;
    }
  }

  /*for (let i = 0; i < ventas.length; i++) {
        //console.log(ventas[i].precio);
        total2 = total2 + (ventas[i].precio * ventas[i].cantidad);
    }*/
  //console.table({ "Total vendido": `$${total2.toLocaleString("es-CO")}` });
  return total;
}

function ventaMayor(ventas) {
  let mayor = ventas[0];
  let contador = 0;
  // console.log(mayor);

  while (contador < ventas.length) {
    
    if (
      ventas[contador].cantidad * ventas[contador].precio >
      mayor.cantidad * mayor.precio
    ) {
      mayor = ventas[contador];
      
      // console.log(mayor);
    }
    //mayor.precioCop = `$${mayor.precio.toLocaleString("es-CO")}`;
    contador++;
  }
  /*for (let i = 1; i < ventas.length; i++) {
      if ((ventas[i].cantidad * ventas[i].precio) > (mayor.cantidad * mayor.precio)) {
        mayor = ventas[i];
        // console.log(mayor);
      }
    }*/
  
  return mayor;
}

function totalPorCiudad(ventas, ciudad) {
  let ciudades = new Map([
    ["medellín", 0],
    ["bogotá", 0],
    ["pereira", 0],
    ["cali", 0],
  ]);
  let ciudadtrim;
  let ciudadinput;
  let sumaTotal = 0;
  let contador = 0;

  while (contador < ventas.length) {
    ciudadtrim = ventas[contador].ciudad.trim().toLowerCase();
    ciudadinput = ciudad.trim().toLowerCase();
    //console.log(venta.ciudad)
    if (ciudadtrim === ciudadinput) {
      sumaTotal += ventas[contador].precio;
      //console.log(contador, venta.cantidad, venta.ciudad)
    }
    contador++;
  }

  /*for (const venta of ventas) {
    ciudadtrim = venta.ciudad.trim().toLowerCase()
    ciudadinput = ciudad.trim().toLowerCase()
    //console.log(venta.ciudad)
    if (ciudadtrim === ciudadinput) {
      sumaTotal += venta.total
      //console.log(contador, venta.cantidad, venta.ciudad)
    }*/
  try {
    ciudades.set(ciudadinput, sumaTotal);
  } catch (error) {
    console.log(error.message);
    console.log("Como ingresó una lista vacía no se puede validar la ciudad.");
  }
  return new Map([
    [ciudadinput, `$${ciudades.get(ciudadinput).toLocaleString("es-CO")}`],
  ]);
}

function primeraVenta(ventas) {
  return ventas[0]
}

function clientesRecurrentes(ventas) {
  //Recurrentes lento, cliclos anidados Big O(n2)
  const recurrentes = [];

  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }

  return recurrentes;
}

function totalCiudadCadena(ventas, ciudad){
  //Debemos normalizar la ciudad con map
  //Luego, usar filter, calcular valor con map y sumar con reduce.
  //Recorrido con for.. of

}

function totalCiudadUnaPasad(ventas, ciudad){

}

module.exports = {
  generarVentas,
  totalPorCiudad,
  totalVendido,
  ventaMayor,
  primeraVenta,
  clientesRecurrentes
};
/*console.table(bigData);
//totalVendido(bigData)
console.table({
  "Total vendido": `$${totalVendido(bigData).toLocaleString("es-CO")}`,
});
console.table(ventaMayor(bigData));
console.table(totalPorCiudad(bigData, "Medellín"));

*/