
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

    let tipoCliente;
    let cantidadProducto;
    const cantidadClientes = aleatorio(1, Math.max(1, Math.floor(n / 3)));
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    

    tipoCliente = `C0${aleatorio(1,8)}` //Asi vamos a generar el tipo cliente
    cantidadProducto = aleatorio(1,5) //Así la cantidad.
    
    console.log(cantidadClientes)
    console.log(tipoCliente)
    console.log(cantidadProducto)
    console.log(ciudades[aleatorio(0,3)]) //Selecciona e imprime una ciudad aleatoria
    console.log(productos[aleatorio(0,4)]) //Selecciona e imprime un producto:valor aleatorio
}

function totalVendido() {

}

function ventaMayor() {

}

function totalPorCiudad() {

}


generarVentas(4000)
