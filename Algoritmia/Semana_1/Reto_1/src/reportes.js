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
const prompts = require('prompt-sync')();

while (true) {
    console.table([
        { column_1: "-1 Mostrar tabla", column_2: "-6 Total por venta" },
        { column_1: "-2 Total vendido", column_2: "-7 Venta por ciudad" },
        { column_1: "-3 Top productos por valor", column_2: "-8 Total vendido ArrayMethod" },
        { column_1: "-4 Promedio general", column_2: "-9 Unidades vendidas ArrayMethod" },
        { column_1: "-5 Ventas por ciudad ArrayMethod", column_2: "-10 Unidades por producto ArrayMethod" },
        { column_1: "-0 cerrar", column_2: "-11 Mayor venta" },
    ]);
    let option;
    while (true) {
        option = Number(prompts("Ingrese la opción que desea usar: "))


        if (option < 0 || option > 11 || !Number.isInteger(option)) {
            console.log("La opción no existe.")
            continue
        }
        break;
    }

    if (option == 1) {
        mostrarTabla(ventas);
        continue
    }

    else if (option == 2) {
        console.table({ "Total general": totalVendido(ventas).toLocaleString("es-CO") })
        continue
    }
    else if (option == 3) {
        topProductosPorValor() //Falta construir la función todavía.
        continue
    }
    else if (option == 4) {
        ticketPromedio(ventas)
        continue
    }
    else if (option == 5) {
        ventasPorCiudadM(ventas, "Bogotá")
        continue
    }
    else if (option == 6) {
        console.table([{ "ID": ventas[1].id, "Total de la venta": valorVenta(ventas[1]).toLocaleString("es-CO") }]);
        continue
    }

    else if (option == 7) {
        ventasPorCiudad(ventas, "Pereira");
        continue
    }

    else if (option == 8) {
        totalVendidoM(ventas);
        continue
    }
    else if (option == 9) {
        unidadesVendidasM(ventas)
        continue
    }

    else if (option == 10) {
        unidadesPorProducto(ventas)
        continue
    }
    else if (option == 11) {
        ventaMayor(ventas)
        continue
    }

    else if (option == 0) {
        break
    }
}