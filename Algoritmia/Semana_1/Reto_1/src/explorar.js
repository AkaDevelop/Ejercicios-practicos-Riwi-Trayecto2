const ventas = require("./datos.js")
const {
    mostrarTabla, 
    valorVenta,
    totalVendido,
    ventaMayor,
    ticketPromedio
} = require("./analitica.js")

mostrarTabla(ventas);
mostrarTabla(ventas[3]);
mostrarTabla(ventas[3].producto);
mostrarTabla(ventas[0]);
mostrarTabla(ventas[11]);

console.table({"Total por venta": valorVenta(ventas[1])})
console.table({"Total general": totalVendido(ventas)})
ventaMayor(ventas)
ticketPromedio(ventas)