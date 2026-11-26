const {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    generarVentas,
    primeraVenta,
    clientesRecurrentes
} = require("./generador.js");

const ventas = require("../../Reto_1/src/datos.js")
const bigData = generarVentas(1000);
const cantidades = [1000, 2000, 4000, 8000, 16000];
const ventas_2 = [
    { id: 1, cliente: "C001" },
    { id: 2, cliente: "C002" },
    { id: 3, cliente: "C001" },
    { id: 4, cliente: "C003" },
    { id: 5, cliente: "C002" }
];
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
console.time("Tiempo recurrentes2");
console.table(clientesRecurrentes(ventas_2));
console.timeEnd("Tiempo recurrentes2");

//Con este for puedo probar por cada cantidad indicada en la instrucción riwi
for (const n of cantidades) {
    const ventasP = generarVentas(n);

    console.time(`Tiempo para ${n} ventas`);
    clientesRecurrentes(ventasP);
    console.timeEnd(`Tiempo para ${n} ventas`);
}