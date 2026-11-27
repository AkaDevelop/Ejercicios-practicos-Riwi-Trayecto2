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
const testObject_1 = new Nodo(controlDePeso);
const testObject_2 = new Nodo(vacunacion);
const testObject_3 = new Nodo(limpiezaDental);

testObject_1.siguiente = testObject_2
testObject_2.siguiente = testObject_3

console.table(testObject_1.dato);
console.table(testObject_1.siguiente.dato)
console.table(testObject_2.siguiente.dato)