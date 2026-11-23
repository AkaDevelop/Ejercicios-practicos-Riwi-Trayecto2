const ventas = require("./datos.js")
const {
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
} = require("./analitica.js")

let arrayVacio = []
mostrarTabla(ventas);
mostrarTabla(ventas[3]);
mostrarTabla(ventas[3].producto);
mostrarTabla(ventas[0]);
mostrarTabla(ventas[11]);

console.table({"Total por venta": valorVenta(ventas[1])})
console.table({"Total general": totalVendido(ventas)})
ventaMayor(ventas)
ticketPromedio(ventas)
ventasPorCiudad(arrayVacio,"Bogotá")

totalVendidoM(ventas)
unidadesVendidasM(ventas)
ventasPorCiudadM(ventas, "Medellín")
unidadesPorProducto(ventas)