# Bitácora: Análisis de eficiencia de `clientesRecurrentes()`

## 1. Objetivo

Analizar el rendimiento de la función `clientesRecurrentes()` mediante el conteo de operaciones y mediciones de tiempo de ejecución.

El propósito es comprender cómo aumenta el costo de un algoritmo a medida que crece la cantidad de registros y reconocer operaciones internas que pueden afectar su eficiencia.

## 2. Función analizada

```javascript
function clientesRecurrentes(ventas) {
    const recurrentes = [];

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

    return recurrentes;
}
```

La función utiliza dos ciclos anidados para comparar los clientes de los registros y determinar cuáles aparecen más de una vez.

## 3. Traza manual con 5 ventas

Para analizar el comportamiento, se utiliza el siguiente arreglo:

```javascript
const ventas = [
    { id: 1, cliente: "C001" },
    { id: 2, cliente: "C002" },
    { id: 3, cliente: "C001" },
    { id: 4, cliente: "C003" },
    { id: 5, cliente: "C002" }
];
```

### Comparaciones realizadas

| Iteración externa (i) | Comparaciones internas (j) | Comparaciones de clientes |
| --- | --- | --- |
| 0 | 1, 2, 3, 4 | 4 |
| 1 | 2, 3, 4 | 3 |
| 2 | 3, 4 | 2 |
| 3 | 4 | 1 |
| 4 | Ninguna | 0 |
| **Total** | | **10** |

### Resultado

- Comparaciones entre identificadores de clientes: 10.
- Coincidencias encontradas: 2.
- Llamadas a `includes()`: 2.
- Resultado: `["C001", "C002"]`.

### Generalización

El primer ciclo realiza `n` iteraciones, mientras que el segundo compara cada registro con los registros posteriores.

Por lo tanto, el número de comparaciones crece cuadráticamente respecto a la cantidad de ventas: **O(n²)** para los dos ciclos por sí solos.

## 4. Medición del tiempo de ejecución

Para observar el comportamiento del algoritmo con diferentes cantidades de registros, se utiliza `console.time()` y `console.timeEnd()`.

### Código de medición

```javascript
const cantidades = [1000, 2000, 4000, 8000, 16000];

for (const n of cantidades) {
    const ventasP = generarVentas(n);

    console.time(`Tiempo para ${n} ventas`);
    clientesRecurrentes(ventasP);
    console.timeEnd(`Tiempo para ${n} ventas`);
}
```

**Importante:** los datos se generan antes de iniciar el cronómetro. Así se mide principalmente el tiempo de ejecución de `clientesRecurrentes()` y no el tiempo de generación de las ventas.

### Registro de resultados

| Cantidad de ventas (n) | Tiempo de ejecución |
| ---: | ---: |
| 1.000 | 16.494ms |
| 2.000 | 94.241ms |
| 4.000 | 94.656ms |
| 8.000 | 376.071ms |
| 16.000 | 1.747s |

## 5. Análisis del crecimiento

Al duplicar la cantidad de registros, el número de comparaciones de los ciclos anidados aumenta aproximadamente cuatro veces.

| Cantidad de ventas | Comparaciones de los ciclos |
| ---: | ---: |
| 1.000 | 499.500 |
| 2.000 | 1.999.000 |
| 4.000 | 7.998.000 |
| 8.000 | 31.996.000 |
| 16.000 | 127.992.000 |

Esto sucede porque el número de comparaciones depende del cuadrado de la cantidad de registros.

Por ejemplo, pasar de 1.000 a 2.000 registros no duplica las comparaciones: las multiplica aproximadamente por cuatro.

En consecuencia, el tiempo de ejecución también puede aumentar considerablemente al duplicar los datos, aunque el tiempo real dependerá de las operaciones internas y del equipo utilizado.

## 6. Estimación para 100.000 y 1.000.000 de ventas

Para realizar una estimación inicial bajo un comportamiento cuadrático, se utiliza la siguiente relación:

```
Tiempo recurrentes: 1:5.902 (m:ss.mmm)
```

Tomando como referencia el tiempo medido con 16.000 registros:

### Estimación para 100.000 registros

```
Tiempo recurrentes: 1:13.902 (m:ss.mmm) Ejecutado.
```

### Estimación para 1.000.000 de registros
```
15:13.902 (m:ss.mmm) Aproximado.
```

**Precaución:** estas son estimaciones bajo un modelo O(n²), no tiempos reales garantizados. El costo de `includes()` puede modificar el crecimiento.

Antes de ejecutar la prueba con 100.000 registros, se comprobó que la estimación es inferior a dos minutos (120.000 ms).

| Cantidad de ventas | Tiempo estimado | ¿Ejecutar? |
| ---: | ---: | --- |
| 100.000 |  1:13.902 (m:ss.mmm) | Solo si es inferior a 120.000 ms |
| 1.000.000 | 15:13.902 (m:ss.mmm) | No ejecutar sin evaluar previamente el costo |

## 7. Identificación del costo oculto: `includes()`

Dentro del segundo ciclo se utiliza:

```javascript
!recurrentes.includes(ventas[i].cliente)
```

El método `includes()` busca un elemento dentro de un arreglo. Para hacerlo, puede necesitar recorrer sus elementos hasta encontrar una coincidencia o llegar al final.

Esto significa que no solamente se realizan las comparaciones de los dos ciclos anidados: también pueden realizarse recorridos adicionales sobre el arreglo `recurrentes`.

En el peor caso, el arreglo puede contener O(n) clientes recurrentes y `includes()` puede necesitar O(n) operaciones por llamada.

Si se combina ese costo con las comparaciones de los ciclos anidados, el límite superior del algoritmo puede llegar iterarse simultaneamente en 3 dimensiones.

Por tanto, la complejidad de peor caso de la implementación completa es **O(n³)**.

Es importante distinguir que esto representa el peor escenario posible. Con los datos generados aleatoriamente por `generarVentas()`, el comportamiento observado puede ser diferente según la cantidad.

## 8. Conclusión para la gerente

El reporte de clientes recurrentes se vuelve lento porque, a medida que aumenta la cantidad de ventas, el sistema necesita realizar muchas más revisiones para identificar qué clientes han comprado varias veces.

Además, para evitar mostrar clientes repetidos, vuelve a buscar cada coincidencia dentro de una lista que también puede crecer.

Esto provoca que el reporte tarde cada vez más cuando el negocio acumula información. Por esa razón, es recomendable optimizar la forma en que se identifican los clientes recurrentes antes de trabajar con grandes cantidades de ventas.

---

## 9. Reflexión personal

En este ejercicio comprendí que un algoritmo puede resolver correctamente un problema y aun así no ser eficiente cuando aumenta la cantidad de información.

También identifiqué que no basta con analizar los ciclos principales: los métodos utilizados dentro de ellos pueden introducir costos adicionales que modifican la complejidad total.

El análisis de Big O, el conteo de operaciones y las mediciones reales permiten comprender mejor el comportamiento de una solución y tomar decisiones para mejorarla.

# 10. Análisis de complejidad temporal y espacial

## 10.1. Comparación de las versiones de total por ciudad

Se implementaron dos versiones para calcular el total de ventas de una ciudad utilizando diferentes métodos de JavaScript.

### Versión 1: `totalCiudadCadena()`

Esta implementación utiliza los métodos `map()`, `filter()` y `reduce()`.

```javascript
function totalCiudadCadena(ventas, ciudad) {
    const ventasCopia = ventas.map((venta) => ({
        ...venta,
        ciudad: venta.ciudad.trim().toLowerCase(),
    }));

    let ventasTotales = ventasCopia
        .filter((venta) => venta.ciudad === ciudad.trim().toLowerCase())
        .reduce((total, venta) => venta.cantidad + total, 0);

    return console.table([
        { ciudad: ciudad, "total de ventas": ventasTotales }
    ]);
}
```

**Recorridos realizados:**

1. `map()`: recorre las ventas originales y crea un nuevo arreglo con las ciudades normalizadas.
2. `filter()`: recorre el arreglo creado por `map()` y selecciona las ventas de la ciudad indicada. También crea otro arreglo.
3. `reduce()`: recorre el resultado de `filter()` para acumular las cantidades.

En el peor caso, los tres métodos pueden recorrer una cantidad proporcional a `n` registros.

**Complejidad temporal:** O(n).

**Complejidad espacial:** O(n).

**Arreglos nuevos:** 2. Uno generado por `map()` y otro por `filter()`.

### Versión 2: `totalCiudadUnaPasada()`

Esta implementación utiliza `map()` y un ciclo `for...of`.

```javascript
function totalCiudadUnaPasada(ventas, ciudad) {
  //Recorrido con for.. of
  /*const ventasCopia = ventas.map((venta) => ({
    ...venta,
    ciudad: venta.ciudad.trim().toLowerCase(),
  }));*/
  const ciudadBuscada = ciudad.trim().toLowerCase();
  let cantidadTotal = 0;
  for(const venta of ventas){
    if(venta.ciudad.trim().toLowerCase() === ciudadBuscada){
        cantidadTotal += venta.cantidad
        //console.log(venta)
    }
    //console.log(venta)
  }

  return console.table([{"ciudad": ciudad, "total de ventas": cantidadTotal}]);
}
```

**Recorridos realizados:**

1. `for...of`: recorre el arreglo creado para acumular las cantidades correspondientes a la ciudad solicitada.

**Complejidad temporal:** O(n).

**Complejidad espacial:** O(1).


### Comparación de ambas versiones

| Característica | `totalCiudadCadena()` | `totalCiudadUnaPasada()` |
| --- | ---: | ---: |
| Recorridos principales | 3 | 1 |
| Arreglos nuevos | 2 | 0 |
| Complejidad temporal | O(n) | O(n) |
| Complejidad espacial | O(n) | O(1) |

## 10.2. ¿Por qué ambas versiones son O(n)?

Aunque una implementación realice más recorridos que la otra, ambas pertenecen a la misma categoría de complejidad temporal.

Esto se debe a que Big O representa el crecimiento del algoritmo y no la cantidad exacta de instrucciones ejecutadas.

Por ejemplo, si `n` representa la cantidad de ventas:

- Dos recorridos completos representan aproximadamente `2n` operaciones.
- Tres recorridos completos representan aproximadamente `3n` operaciones.
- Cuatro recorridos completos representan aproximadamente `4n` operaciones.

Sin embargo, al expresar estos resultados en Big O se eliminan las constantes:

\[
O(2n)=O(3n)=O(4n)=O(n)
\]

Por esta razón, ambas implementaciones tienen complejidad temporal lineal.

**Importante:** que tengan la misma complejidad Big O no significa que necesariamente tarden lo mismo. La cantidad de recorridos, las copias de objetos y las operaciones internas pueden producir diferencias en el tiempo real de ejecución.

## 10.3. Análisis de complejidad espacial del motor

La complejidad espacial permite identificar cuánta memoria adicional necesita una función a medida que aumenta la cantidad de registros.

Se clasifican las funciones según si utilizan memoria constante O(1) o memoria proporcional a los datos O(n).

| Función | Complejidad espacial | Por qué |
| --- | --- | --- |
| `generarVentas` | O(n) | Crea un arreglo que almacena los n registros generados. |
| `totalVendido` | O(1) | Utiliza variables acumuladoras y un contador, sin crear arreglos adicionales. |
| `ventaMayor` | O(1) | Mantiene una referencia al registro mayor y un contador. |
| `totalPorCiudad` | O(1) | Crea un `Map` de tamaño fijo con cuatro ciudades y otro `Map` de un solo elemento. |
| `primeraVenta` | O(1) | Devuelve una referencia al primer registro sin crear estructuras adicionales. |
| `clientesRecurrentes` | O(n) | Crea un arreglo donde almacena los clientes recurrentes. En el peor caso puede contener una cantidad proporcional a n. |
| `totalCiudadCadena` | O(n) | Crea un arreglo con `map()` y otro con `filter()`. |
| `totalCiudadUnaPasada` | O(1) | Recorre el arreglo original una vez. |
| `topProductosPorValor` | O(n) | Crea una copia de los registros con `map()` y un arreglo adicional con `slice()`. |

### Observaciones sobre la memoria adicional

**`totalPorCiudad()`**

Aunque utiliza estructuras `Map`, su complejidad espacial es O(1), porque el primer `Map` contiene cuatro ciudades fijas y el resultado contiene una sola entrada.

Su espacio no aumenta con la cantidad de ventas procesadas.

**`topProductosPorValor()`**

Esta función necesita memoria proporcional a la cantidad de registros porque crea una copia del arreglo original y posteriormente obtiene un nuevo arreglo con `slice()`.

Por eso su complejidad espacial es O(n).

**`clientesRecurrentes()`**

También utiliza memoria adicional proporcional a los datos, porque almacena los clientes que identifica como recurrentes. Además, el método `includes()` realiza búsquedas dentro de ese arreglo, lo que afecta su complejidad temporal.

## 10.4. Conclusión Día 2

El análisis demuestra que la complejidad temporal y la espacial representan aspectos diferentes del rendimiento de un programa.

Una función puede tener complejidad temporal O(n) y, al mismo tiempo, utilizar memoria adicional O(n), como sucede con las implementaciones que crean copias de arreglos mediante `map()` y `filter()`.

Con esto comprendí que utilizar varios métodos de arrays no significa automáticamente tener una complejidad temporal mayor. Si cada método realiza un recorrido lineal, el resultado continúa siendo O(n), aunque la cantidad de recorridos influya en el tiempo real.

Finalmente, reducir las estructuras temporales y evitar copias innecesarias puede ayudar a construir soluciones que aprovechen mejor la memoria disponible y el rendimiento general de un sistema.