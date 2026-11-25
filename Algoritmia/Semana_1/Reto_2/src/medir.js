const {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    generarVentas,
    primeraVenta
} = require("./generador.js")

const bigData = generarVentas(100000);
console.table(bigData);
//totalVendido(bigData)
console.table({ "Total vendido": `$${totalVendido(bigData).toLocaleString("es-CO")}` })
console.table(ventaMayor(bigData))
console.table(totalPorCiudad(bigData, "Medellín"))