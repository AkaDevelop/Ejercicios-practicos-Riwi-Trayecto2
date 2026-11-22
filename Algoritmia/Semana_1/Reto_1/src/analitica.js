
function mostrarTabla(ventas){
    if (ventas === undefined) {
        //Borde: Posición que no existe, devuelve undefined.
        return console.log("No es halló el registro.")
    }
    //Muestra la tabla completa.
    return console.table(ventas)
}

module.exports = mostrarTabla