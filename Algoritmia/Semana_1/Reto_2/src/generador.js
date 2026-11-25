
const bigData = generarVentas(200);

function generarVentas(n) {

    //Primero se deben crear los registros para jugar con la aleatoriedad
    //Creamos una funcion con math.random Scada de 3wschool para valores aleatorios.
    const productos = [
        { nombre: "Origen Huila 500 g", precio: 42000 },
        { nombre: "Origen Nariño 250 g", precio: 26000 },
        { nombre: "Prensa francesa", precio: 95000 },
        { nombre: "Origen Sierra 500 g", precio: 45000 },
        { nombre: "Molino manual", precio: 120000 }
    ];

    let ciudades = [
        "Medellín",
        "Pereira",
        "Bogotá",
        "Cali"
    ]

    //const cantidadClientes = aleatorio(1, Math.max(1, Math.floor(n / 3)));
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let bigDataVentas = []

    //Asi vamos a generar el tipo cliente aleatorio: `C0${aleatorio(1, 8)}` 
    //Así la cantidad aleatoria: aleatorio(1, 5) 
    //console.log(cantidadClientes)
    //console.log(tipoCliente)
    //console.log(cantidadProducto)
    //console.log(ciudades[aleatorio(0, 3)]) 
    //console.log(productos[aleatorio(0, 4)]) //Selecciona e imprime un producto:valor aleatorio

    for (let i = 0; i < n; i++) {
        let aleatorioNum= aleatorio(0,4) //Necesario para pasar el mismo aleatorio a valor y producto.
        bigDataVentas.push(
            {
                id: i + 1,
                cliente: `C0${ aleatorio(1, Math.max(1, Math.floor(n / 3)))}`,
                producto: productos[aleatorioNum].nombre,
                ciudad: ciudades[aleatorio(0, 3)],
                cantidad: aleatorio(1, 5),
                precio: productos[aleatorioNum].precio
               
            }
        )

    }

    return bigDataVentas

}

function totalVendido() {

}

function ventaMayor() {

}

function totalPorCiudad() {

}




console.table(bigData);
