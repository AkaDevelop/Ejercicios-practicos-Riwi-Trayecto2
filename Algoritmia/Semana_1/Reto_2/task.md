# Un compañero de Nodo Digital agregó al motor un reporte de clientes recurrentes (clientes que compraron más de una vez). Con los datos de prueba funcionó, pero cuando la gerente lo ejecutó con el historial anual “se quedó pensando varios minutos”. Esta es la función que escribió tu compañero:
```
function clientesRecurrentes(ventas) {</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> const recurrentes = [];</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> for (let i = 0; i < ventas.length; i++) {</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> for (let j = i + 1; j < ventas.length; j++) {</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> if (ventas[i].cliente === ventas[j].cliente &&</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> !recurrentes.includes(ventas[i].cliente)) {</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> recurrentes.push(ventas[i].cliente);</code><br><code style="color: #a3315c; background: #f3f3f5; padding: .08em .35em; border-radius: 5px; font-family: Consolas,monospace; font-size: .9em;"> }
}
}
return recurrentes;
} ```

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