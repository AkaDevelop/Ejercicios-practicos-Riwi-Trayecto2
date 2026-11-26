# Análisis de rendimiento del motor de ventas

**Versión:** v0.2  
**Tamaño de referencia:** 10.000 ventas  
**Objetivo:** analizar la complejidad temporal y espacial de las funciones del motor, identificar los riesgos de crecimiento y proponer optimizaciones.

## 1. Criterios de análisis

- **Complejidad temporal:** representa cómo aumenta el trabajo de una función al crecer la cantidad de ventas (`n`).
- **Complejidad espacial:** representa la memoria adicional que necesita una función, sin contar los datos de entrada.
- **O(1):** constante.
- **O(n):** lineal.
- **O(n²):** cuadrática.
- **O(n³):** cúbica.
- **O(n log n):** linealítmica.

Las mediciones de tiempo deben realizarse con el mismo entorno de ejecución y con los datos generados fuera del cronómetro, para no mezclar el costo de generar las ventas con el de procesarlas.

## 2. Tabla de complejidad de las funciones

| Función                                | Qué hace                                                                           | Complejidad temporal  | Complejidad espacial | Justificación y operaciones con 10.000 ventas                                                                                                                                                                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------- | --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generarVentas(n)`                     | Genera registros aleatorios de ventas.                                             | O(n)                  | O(n)                 | El ciclo se ejecuta `n` veces y agrega un objeto por iteración. Para 10.000 ventas genera 10.000 registros.                                                                                                                                                                                         |
| `mostrarTabla(ventas)`                 | Recorre las ventas, prepara el precio formateado y muestra una tabla.              | O(n)                  | O(1) adicional       | Recorre una vez el arreglo. Modifica los objetos existentes, pero no crea una estructura auxiliar proporcional a `n`.                                                                                                                                                                               |
| `valorVenta(venta)`                    | Calcula el valor de una venta multiplicando cantidad por precio.                   | O(1)                  | O(1)                 | Realiza una multiplicación y devuelve un número. No recorre estructuras.                                                                                                                                                                                                                            |
| `totalVendido(ventas)`                 | Calcula el valor total de todas las ventas.                                        | O(n)                  | O(1)                 | Recorre las 10.000 ventas y acumula sus valores en una variable. Tanto la versión con `while` como la versión con `for` tienen crecimiento lineal.                                                                                                                                                  |
| `ventaMayor(ventas)`                   | Encuentra la venta con mayor valor total.                                          | O(n)                  | O(1)                 | Recorre el arreglo y conserva una referencia a la venta mayor. La versión que usa `valorVenta()` realiza una cantidad constante de operaciones por iteración.                                                                                                                                       |
| `ticketPromedio(ventas)`               | Calcula el promedio general del valor de las ventas.                               | O(n)                  | O(1)                 | Ejecuta `totalVendido()` y después realiza otro recorrido para contar registros. Son dos recorridos lineales: O(2n), que se simplifica a O(n).                                                                                                                                                      |
| `ventasPorCiudad(ventas, ciudad)`      | Suma las unidades vendidas en una ciudad.                                          | O(n)                  | O(1)                 | Recorre las ventas una vez y acumula las cantidades. El `Map` contiene cuatro ciudades fijas, por lo que no crece con `n`.                                                                                                                                                                          |
| `totalPorCiudad(ventas, ciudad)`       | Suma los precios de los registros correspondientes a una ciudad.                   | O(n)                  | O(1)                 | Recorre todas las ventas. El `Map` tiene un tamaño fijo de cuatro ciudades y el resultado contiene una entrada.                                                                                                                                                                                     |
| `totalVendidoM(ventas)`                | Calcula el total utilizando `filter()` como mecanismo de recorrido.                | O(n)                  | O(n)                 | `filter()` recorre las 10.000 ventas y crea un nuevo arreglo. Aunque se usa para acumular valores, también reserva memoria para el resultado del filtro.                                                                                                                                            |
| `unidadesVendidasM(ventas)`            | Suma las unidades vendidas utilizando `filter()`.                                  | O(n)                  | O(n)                 | Realiza un recorrido y crea un arreglo nuevo mediante `filter()`. El acumulador no ocupa memoria proporcional a `n`, pero el arreglo filtrado sí.                                                                                                                                                   |
| `ventasPorCiudadM(ventas, ciudad)`     | Filtra las ventas de una ciudad y suma sus unidades.                               | O(n)                  | O(n)                 | `filter()` recorre el arreglo y crea otro con las coincidencias. `reduce()` recorre ese resultado. Son dos etapas lineales.                                                                                                                                                                         |
| `unidadesPorProducto(ventas)`          | Agrupa las unidades vendidas por producto usando un `Map`.                         | O(n)                  | O(n)                 | `filter()` crea un arreglo auxiliar y `reduce()` construye un `Map`. En el peor caso, el número de productos distintos puede crecer hasta `n`.                                                                                                                                                      |
| `primeraVenta(ventas)`                 | Devuelve el primer registro.                                                       | O(1)                  | O(1)                 | Accede directamente a la posición cero del arreglo. No necesita recorrerlo.                                                                                                                                                                                                                         |
| `clientesRecurrentes(ventas)`          | Encuentra clientes que aparecen más de una vez.                                    | O(n³) en el peor caso | O(n)                 | Los ciclos anidados comparan pares de ventas. Además, `includes()` busca dentro del arreglo de recurrentes cada vez que encuentra una coincidencia. En el peor caso, esa búsqueda puede costar O(n), elevando el costo total a O(n³). El arreglo de resultados puede almacenar hasta O(n) clientes. |
| `totalCiudadCadena(ventas, ciudad)`    | Normaliza las ciudades, filtra los registros y suma sus cantidades con `reduce()`. | O(n)                  | O(n)                 | `map()` crea una copia, `filter()` crea otro arreglo y `reduce()` procesa las coincidencias. Son tres recorridos principales, pero el crecimiento sigue siendo lineal.                                                                                                                              |
| `totalCiudadUnaPasada(ventas, ciudad)` | Normaliza las ciudades y suma las cantidades mediante `for...of`.                  | O(n)                  | O(n)                 | `map()` crea una copia del arreglo y `for...of` recorre esa copia. Aunque se evita `filter()` y `reduce()`, todavía existen dos recorridos y una copia completa.                                                                                                                                    |

**Observación:** `totalVendido()` y `ventaMayor()` aparecen implementadas en dos versiones en el código compartido. La tabla analiza su comportamiento general, no las cuenta como funciones diferentes.

## 3. Mediciones con 10.000 ventas

Los tiempos reales deben obtenerse ejecutando las funciones en el entorno del proyecto. No se incluyen valores inventados.

| Función o reporte                        | Tiempo medido con 10.000 ventas |
| ---------------------------------------- | ------------------------------: |
| `generarVentas(10000)`                   |           Pendiente de medición |
| `totalVendido()`                         |           Pendiente de medición |
| `ventaMayor()`                           |           Pendiente de medición |
| `ticketPromedio()`                       |           Pendiente de medición |
| `ventasPorCiudad()` / `totalPorCiudad()` |           Pendiente de medición |
| `totalVendidoM()`                        |           Pendiente de medición |
| `unidadesVendidasM()`                    |           Pendiente de medición |
| `ventasPorCiudadM()`                     |           Pendiente de medición |
| `unidadesPorProducto()`                  |           Pendiente de medición |
| `clientesRecurrentes()`                  |           Pendiente de medición |
| `totalCiudadCadena()`                    |           Pendiente de medición |
| `totalCiudadUnaPasada()`                 |           Pendiente de medición |
| `topProductosPorValor()`                 |           Pendiente de medición |

### Análisis de resultados experimentales

Las pruebas de `clientesRecurrentes()` muestran un crecimiento importante del tiempo de ejecución conforme aumenta el número de ventas.

| Ventas |     Tiempo |
| -----: | ---------: |
|      5 |     0.7 ms |
|  1.000 |  11.292 ms |
|  2.000 |  24.533 ms |
|  4.000 |  88.001 ms |
|  8.000 | 393.853 ms |
| 16.000 |    1.777 s |

Al duplicar los registros de 8.000 a 16.000, el tiempo aumentó aproximadamente 4.51 veces. Este resultado se acerca al crecimiento cuadrático esperado cuando se duplica el tamaño de entrada.

Aunque el peor caso teórico de la implementación puede alcanzar O(n³), debido a las búsquedas adicionales con `includes()`, las mediciones realizadas con datos aleatorios muestran un comportamiento cercano a O(n²) en los tamaños probados.

En las pruebas de las funciones `totalCiudadCadena()` y `totalCiudadUnaPasada()` se obtuvieron los siguientes resultados:

| Función                  |   Tiempo |
| ------------------------ | -------: |
| `totalCiudadCadena()`    | 1.758 ms |
| `totalCiudadUnaPasada()` | 2.551 ms |

En esta ejecución, la versión encadenada fue más rápida. Sin embargo, ambas tienen complejidad temporal O(n) y espacial O(n). Una sola ejecución no es suficiente para establecer cuál tiene mejor rendimiento general.

### Proyección experimental

Tomando como referencia los 16.000 registros de `clientesRecurrentes()`, una extrapolación cuadrática estima aproximadamente 1 hora y 55 minutos para un millón de registros. Si se presenta el peor caso cúbico, la estimación teórica supera los cinco días.

Estas cifras son proyecciones matemáticas y no tiempos medidos. El resultado real depende de la distribución de clientes y del entorno de ejecución.

### Código para realizar las mediciones

La generación de datos debe estar fuera del cronómetro. De esta forma se mide el procesamiento y no la generación aleatoria.

```js
const {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    generarVentas,
    primeraVenta,
    clientesRecurrentes,
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./generador.js");

const ventas = require("../../Reto_1/src/datos.js")
const bigData = generarVentas(10000);
const cantidades = [1000, 2000, 4000, 8000, 16000];
const ventas_2 = [
    { id: 1, cliente: "C001" },
    { id: 2, cliente: "C002" },
    { id: 3, cliente: "C001" },
    { id: 4, cliente: "C003" },
    { id: 5, cliente: "C002" }
];
console.table(bigData);
//totalVendido(bigData)
console.table({ "Total vendido": `$${totalVendido(bigData).toLocaleString("es-CO")}` });
console.table(ventaMayor(bigData));
console.table(totalPorCiudad(bigData, "Medellín"));
console.table(primeraVenta(bigData));
console.table(clientesRecurrentes(ventas)); //Con data del día 1
console.time("Tiempo recurrentes");
console.table(clientesRecurrentes(bigData)); //Data con 1000 registros o dependiendo de la funcion que los genera.
console.timeEnd("Tiempo recurrentes");
console.time("Tiempo recurrentes con 5 reg");
console.table(clientesRecurrentes(ventas_2));
console.timeEnd("Tiempo recurrentes con 5 reg");

//Con este for puedo probar por cada cantidad indicada en la instrucción riwi
for (const n of cantidades) {
    const ventasP = generarVentas(n);

    console.time(`Tiempo para ${n} ventas`);
    clientesRecurrentes(ventasP);
    console.timeEnd(`Tiempo para ${n} ventas`);
}
console.time("Prueba de tiempo Cadena");
totalCiudadCadena(bigData, "Pereira");
console.timeEnd("Prueba de tiempo Cadena");
console.time("Prueba de tiempo Pasada");
totalCiudadUnaPasada(bigData, "Pereira");
console.timeEnd("Prueba de tiempo Pasada");
```

Para que la comparación sea válida, conviene ejecutar las pruebas varias veces y registrar los resultados. Las funciones que usan `console.table()` también incluyen el costo de presentación en el tiempo medido, por lo que sería mejor separar el cálculo de la visualización para comparar únicamente el procesamiento.

## 4. Proyección para 1.000.000 de ventas

La proyección se calcula tomando como referencia el tiempo medido con 10.000 ventas. Los siguientes factores son aproximaciones teóricas:

| Complejidad | Factor aproximado de crecimiento | Proyección                                     |
| ----------- | -------------------------------: | ---------------------------------------------- |
| O(1)        |                               ×1 | Tiempo de referencia prácticamente constante.  |
| O(n)        |                             ×100 | Tiempo de 10.000 ventas × 100.                 |
| O(n log n)  |                             ×150 | Tiempo de 10.000 ventas × 150 aproximadamente. |
| O(n²)       |                          ×10.000 | Tiempo de 10.000 ventas × 10.000.              |
| O(n³)       |                       ×1.000.000 | Tiempo de 10.000 ventas × 1.000.000.           |

### Estimación por reporte

| Función o reporte        | Complejidad           | Tiempo con 10.000 ventas |                   Proyección para 1.000.000 |
| ------------------------ | --------------------- | -----------------------: | ------------------------------------------: |
| `totalVendido()`         | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `ventaMayor()`           | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `ticketPromedio()`       | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `ventasPorCiudad()`      | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `totalPorCiudad()`       | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `totalVendidoM()`        | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `unidadesVendidasM()`    | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `ventasPorCiudadM()`     | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `unidadesPorProducto()`  | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `totalCiudadCadena()`    | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `totalCiudadUnaPasada()` | O(n)                  |                Pendiente |                         Tiempo medido × 100 |
| `topProductosPorValor()` | O(n log n)            |                Pendiente |         Tiempo medido × 150 aproximadamente |
| `clientesRecurrentes()`  | O(n³) en el peor caso |                Pendiente | Tiempo medido × 1.000.000 como cota teórica |

**Advertencia:** estas proyecciones son modelos simplificados. El comportamiento real puede variar por la distribución aleatoria de clientes, el motor de JavaScript, la memoria disponible y el costo de las operaciones internas. En particular, la proyección cúbica de `clientesRecurrentes()` representa su peor caso teórico y no necesariamente el comportamiento de los datos generados aleatoriamente.

No se debe ejecutar directamente una prueba de un millón de ventas para `clientesRecurrentes()` sin evaluar primero el tiempo estimado y el riesgo de bloquear el proceso.

## 5. Riesgos

Orden de mayor a menor riesgo según el crecimiento asintótico y las asignaciones de memoria.

| Prioridad | Función                                                                    | Riesgo   | Motivo                                                                                                               |
| --------: | -------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
|         1 | `clientesRecurrentes()`                                                    | Muy alto | Tiene ciclos anidados y una búsqueda adicional con `includes()`. Su peor caso puede llegar a O(n³).                  |
|         2 | `topProductosPorValor()`                                                   | Alto     | Ordena todos los registros. Su complejidad temporal es O(n log n) y crea una copia del arreglo.                      |
|         3 | `unidadesPorProducto()`                                                    | Medio    | Recorre los registros, crea un arreglo filtrado y construye un `Map` cuyo tamaño depende de los productos distintos. |
|         4 | `totalCiudadCadena()`                                                      | Medio    | Crea dos arreglos auxiliares y realiza tres etapas de procesamiento.                                                 |
|         5 | `ventasPorCiudadM()`                                                       | Medio    | Crea un arreglo filtrado y después lo recorre para acumular las cantidades.                                          |
|         6 | `totalCiudadUnaPasada()`                                                   | Medio    | Evita el filtro y la reducción, pero todavía crea una copia completa mediante `map()`.                               |
|         7 | `totalVendidoM()` y `unidadesVendidasM()`                                  | Medio    | Usan `filter()` para acumular valores, generando arreglos auxiliares que no se necesitan para el resultado.          |
|         8 | `ticketPromedio()`                                                         | Bajo     | Realiza dos recorridos lineales, pero no genera estructuras auxiliares proporcionales a `n`.                         |
|         9 | `totalVendido()`, `ventaMayor()`, `ventasPorCiudad()` y `totalPorCiudad()` | Bajo     | Realizan recorridos lineales y mantienen acumuladores o referencias de tamaño constante.                             |
|        10 | `generarVentas()`                                                          | Bajo     | Su costo es lineal y la memoria crece proporcionalmente al número de registros solicitado.                           |
|        11 | `mostrarTabla()`                                                           | Bajo     | Recorre los registros y modifica los objetos existentes.                                                             |
|        12 | `primeraVenta()` y `valorVenta()`                                          | Muy bajo | Son operaciones de acceso directo y cálculo constante.                                                               |

El criterio de riesgo considera principalmente el orden de crecimiento de la complejidad temporal, seguido de la memoria auxiliar que se crea. Una función lineal puede ser costosa con un millón de registros, pero su crecimiento es más controlable que el de una función cuadrática o cúbica.

## 6. Plan de optimización

### Función prioritaria: `clientesRecurrentes()`

La implementación actual compara cada venta con las ventas posteriores:

```js
for (let i = 0; i < ventas.length; i++) {
  for (let j = i + 1; j < ventas.length; j++) {
    if (
      ventas[i].cliente === ventas[j].cliente &&
      !recurrentes.includes(ventas[i].cliente)
    ) {
      recurrentes.push(ventas[i].cliente);
    }
  }
}
```

**¿Qué trabajo se repite?**

1. Se comparan pares de registros mediante los dos ciclos.
2. Cuando dos ventas pertenecen al mismo cliente, se ejecuta `includes()`.
3. `includes()` vuelve a buscar el identificador dentro de `recurrentes`.
4. A medida que crece el resultado, esa búsqueda puede recorrer más elementos.

Esto significa que el motor repite búsquedas que podrían evitarse si guardara información sobre los clientes que ya fueron encontrados.

**¿Qué información se podría guardar?**

Se podría utilizar un `Set` para almacenar los identificadores de clientes que ya fueron identificados como recurrentes. La estructura permitiría consultar si un cliente ya fue registrado sin recorrer manualmente el arreglo de resultados.

Otra posibilidad sería utilizar un `Map` o un objeto para contar cuántas veces aparece cada cliente. Después, bastaría con seleccionar aquellos cuya frecuencia sea superior a uno.

**Objetivo de la optimización:**

Reemplazar la comparación de todos los pares de ventas por un procesamiento basado en frecuencias de clientes, buscando una solución de tiempo O(n) y espacio O(n).

La optimización todavía no se implementa. Primero se documenta la propuesta y después se comparará su rendimiento con la versión original.

## 7. Revisión por un compañero

**Estado:** pendiente de revisión.

- Compañero revisor: pendiente.
- Observación recibida: pendiente.
- Respuesta a la observación: pendiente.
- Cambio realizado en el informe: pendiente.

La revisión debe realizarla un compañero que pueda verificar las justificaciones de complejidad, las proyecciones y el orden de riesgos. No se registra una observación hasta recibirla realmente.

## 8. Conclusiones

El análisis permite identificar que no todas las funciones tienen el mismo comportamiento al aumentar la cantidad de registros.

La mayoría de los reportes tienen complejidad temporal O(n), lo que significa que su trabajo crece proporcionalmente al número de ventas. Algunas funciones generan arreglos auxiliares, por lo que también requieren memoria O(n).

La principal preocupación es `clientesRecurrentes()`, debido a los ciclos anidados y a la búsqueda adicional realizada mediante `includes()`. Su peor caso puede alcanzar O(n³), por lo que debe ser la primera función considerada para optimización.

También se identificó que algunas funciones utilizan métodos de arreglos que crean estructuras auxiliares innecesarias, como `filter()` cuando se usa únicamente para acumular información.

Finalmente, las mediciones reales permitirán contrastar el análisis teórico con el comportamiento del motor y determinar si las optimizaciones propuestas producen una mejora significativa.

## 9. Control de versión

**Versión objetivo:** v0.2

