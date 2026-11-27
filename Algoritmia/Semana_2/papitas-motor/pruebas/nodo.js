const {Nodo} = require("../src/estructuras/Nodo.js")


let controlDePeso = {
    fecha: "15/03",
    veterinario: "Dr.Gomez",
    costo: 40000
}

let vacunacion = {
    fecha: "02/02",
    veterinario: "Dra.Ríos",
    costo: 85000
}
let limpiezaDental = {
    fecha: "20/05",
    veterinario: "Dr.Ríos",
    costo: 150000
}
//Prueba#1: interiorizando concepto de listas enlazadas.
const testObject_1 = new Nodo(controlDePeso)

console.log(testObject_1.dato.fecha)