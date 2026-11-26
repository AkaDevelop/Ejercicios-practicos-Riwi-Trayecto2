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

\[
Tiempo recurrentes: 1:5.902 (m:ss.mmm)
\]

Tomando como referencia el tiempo medido con 16.000 registros:

### Estimación para 100.000 registros

\[
Tiempo recurrentes: 1:13.902 (m:ss.mmm) Ejecutado.
\]

### Estimación para 1.000.000 de registros

\[
15:13.902 (m:ss.mmm) Aproximado.
\]

**Precaución:** estas son estimaciones bajo un modelo O(n²), no tiempos reales garantizados. El costo de `includes()` puede modificar el crecimiento.

Antes de ejecutar la prueba con 100.000 registros, se debe comprobó que la estimación es inferior a dos minutos (120.000 ms).

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