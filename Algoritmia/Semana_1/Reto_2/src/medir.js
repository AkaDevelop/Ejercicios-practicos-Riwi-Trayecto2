const {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    generarVentas,
    primeraVenta,
    clientesRecurrentes
} = require("./generador.js");

const ventas = require("../../Reto_1/src/datos.js")
const bigData = generarVentas(100000);
console.table(bigData);
//totalVendido(bigData)
console.table({ "Total vendido": `$${totalVendido(bigData).toLocaleString("es-CO")}` });
console.table(ventaMayor(bigData));
console.table(totalPorCiudad(bigData, "Medellín"));
console.table(primeraVenta(bigData));
console.table(clientesRecurrentes(ventas)); //Con data del día 1
console.time("Tiempo recurrentes");
console.table(clientesRecurrentes(bigData)); //Data con 1000 registros o dependiendo de la funcion que los genera.
console.timeEnd("Tiempo recurrentes");