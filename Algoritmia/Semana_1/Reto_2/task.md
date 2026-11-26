# Día 2

Un compañero de Nodo Digital agregó al motor un reporte de clientes recurrentes (clientes que compraron más de una vez). Con los datos de prueba funcionó, pero cuando la gerente lo ejecutó con el historial anual “se quedó pensando varios minutos”. Esta es la función que escribió tu compañero:

```
function clientesRecurrentes(ventas) {
  //Recurrentes lento, cliclos anidados Big O(n2)
  const recurrentes = [];

  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }

  return recurrentes;
}
```

## Objetivo

Diagnosticar la complejidad de una función con ciclos anidados, medir su tiempo real y predecir su comportamiento con volúmenes que todavía no existen.

### PASOS

Instrucciones
Agrega la función al motor y verifica con los 12 datos del Día 1 que es correcta: debe devolver los clientes C01, C02 y C03.
Haz una traza en la bitácora con un arreglo de 5 ventas e indica cuántas comparaciones hace. Generaliza: ¿cuántas comparaciones hace con n ventas?
Mide el tiempo de ejecución con console.time y console.timeEnd para n = 1.000, 2.000, 4.000, 8.000 y 16.000. Registra los resultados en una tabla.
Analiza la tabla: cuando n se duplica, ¿qué pasa con el tiempo? Relaciona la respuesta con la complejidad O(n²).
Con tus mediciones, estima cuánto tardaría la función con 100.000 y con 1.000.000 de ventas. Ejecuta 100.000 solo si tu estimación es menor a dos minutos.
Identifica un costo oculto: recurrentes.includes también recorre un arreglo. Explica en la bitácora cómo afecta la complejidad en el peor caso.
Escribe una conclusión para la gerente, sin tecnicismos, de por qué el reporte se vuelve lento. Haz commit y push.
REQ.
Requisitos técnicos
Ciclos anidados; includes; console.time y console.timeEnd.
Análisis de peor caso; crecimiento cuadrático.
Generador de datos del MiniReto 5.
CHECK
Criterios de cumplimiento
La función devuelve C01, C02 y C03 con los datos del Día 1.
La tabla de tiempos incluye al menos cinco tamaños de entrada que se duplican.
La bitácora muestra que, al duplicar n, el tiempo se multiplica aproximadamente por cuatro.
La estimación para 1.000.000 de ventas está calculada a partir de las mediciones, no supuesta.
La conclusión para la gerente explica el problema en lenguaje de negocio.

#### Minireto 7:
- Escribe una función totalCiudadCadena(ventas, ciudad) que normalice las ciudades con map, filtre con filter, calcule el valor con map y sume con reduce.
- Escribe totalCiudadUnaPasada(ventas, ciudad), que obtenga el mismo resultado con un solo ciclo y sin crear arreglos intermedios.
- Comprueba con el generador que ambas devuelven el mismo valor para 10.000 ventas.
- Cuenta, para cada versión, cuántos recorridos completos hace y cuántos arreglos nuevos crea. Expresa ambas en notación Big O de tiempo y de espacio.
- Explica en la bitácora por qué ambas son ONo en tiempo aunque una recorra el arreglo cuatro veces (reglas de simplificación: se eliminan las constantes).Clasifica la complejidad espacial de todas las funciones del motor: ¿cuáles usan memoria adicional constante, O(1), y cuáles proporcional a los datos, ONo? Presta atención a totalPorCiudad y a topProductosPorValor.
- Decide cuál versión de totalCiudad dejarás en el motor y justifica la decisión entre legibilidad y recursos. Haz commit y push.


##### Criterios de cumplimiento
- Ambas versiones devuelven exactamente el mismo valor con 10.000 ventas.
- La bitácora indica el número de recorridos y de arreglos intermedios de cada versión.
- Se explica correctamente por qué O(4n) se simplifica a ONo.
- Todas las funciones del motor tienen clasificada su complejidad espacial.
- La decisión final está justificada con argumentos de legibilidad y de recursos.