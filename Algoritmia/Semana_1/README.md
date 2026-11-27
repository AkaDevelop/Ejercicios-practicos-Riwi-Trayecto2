# Ejercicios prácticos – Riwi | Trayecto 2

Repositorio de ejercicios y retos prácticos desarrollados durante el Trayecto 2 de formación en Riwi, enfocados en el fortalecimiento de la lógica de programación y el uso de JavaScript.

## 📌 Reto 1 – Café Origen v0.1

Aplicación de consola desarrollada en JavaScript que permite analizar un conjunto de datos de ventas mediante diferentes operaciones estadísticas y de procesamiento de información.

El proyecto busca poner en práctica conceptos fundamentales de programación, modularización y manipulación de arreglos, utilizando tanto estructuras tradicionales como métodos propios de JavaScript (*Array Methods*).

### 🚀 Funcionalidades

La aplicación cuenta con un menú interactivo desde el cual se pueden ejecutar las siguientes operaciones:

| Opción | Funcionalidad |
|:---:|---|
| 1 | Mostrar la tabla completa de ventas. |
| 2 | Calcular el total general vendido. |
| 3 | Obtener los productos con mayor valor de ventas. |
| 4 | Calcular el promedio general de las ventas (ticket promedio). |
| 5 | Consultar las ventas por ciudad utilizando Array Methods. |
| 6 | Calcular el valor total de una venta específica. |
| 7 | Consultar las ventas por ciudad mediante una función tradicional. |
| 8 | Calcular el total vendido utilizando Array Methods. |
| 9 | Calcular las unidades vendidas utilizando Array Methods. |
| 10 | Consultar las unidades vendidas por producto. |
| 11 | Identificar la venta de mayor valor. |
| 0 | Salir de la aplicación. |

### 🛠️ Tecnologías utilizadas

- **JavaScript (Node.js):** Lenguaje principal de desarrollo.
- **Node.js:** Entorno de ejecución para la aplicación de consola.
- **prompt-sync:** Biblioteca utilizada para capturar información ingresada por el usuario.
- **Array Methods:** Métodos de manipulación de arreglos para procesar y analizar los datos.

### 📂 Estructura del proyecto

```text
Reto_1/
│
├── src/
│   ├── analitica.js       # Funciones de análisis y procesamiento de ventas.
│   ├── datos.js           # Conjunto de datos de ventas.
│   ├── explorar.js        # Exploración de los datos. (Esto trata de interpretar lo que se pidió en verificar.js)
│   └── reportes.js        # Menú interactivo y ejecución de reportes.
│   └── *verificar.js*       # En la instrucción riwi no se espefició muy bien que requería, no se construyó este archivo.
│
├── bitacora.md            # Registro del desarrollo del reto.
├── README.md              # Documentación del proyecto.
├── Reto_Laboratorio.js    # Ejercicio de laboratorio.
└── task.md                # Descripción de las actividades.
```

### ⚙️ Instalación y ejecución

**1. Clonar el repositorio**

```bash
git clone https://github.com/AkaDevelop/Ejercicios-practicos-Riwi-Trayecto2
```

**2. Ingresar al directorio del proyecto**

```bash
cd Ejercicios-practicos-Riwi-Trayecto2
```

**3. Instalar las dependencias**

```bash
pnpm install
```

**4. Ejecutar el reto**

Desde la raíz del repositorio:

```bash
node Algoritmia/Semana_1/Reto_1/src/reportes.js
```

### 💻 Funcionamiento

Al ejecutar la aplicación, se presenta un menú interactivo en la terminal con las operaciones disponibles.

El usuario puede seleccionar una opción ingresando el número correspondiente. La aplicación valida que la entrada sea un número entero dentro del rango permitido y ejecuta la operación seleccionada.

El menú permanece activo hasta que el usuario selecciona la opción `0`.

### 🎯 Objetivos de aprendizaje

- Fortalecer el pensamiento lógico y la resolución de problemas.
- Comprender la organización del código mediante módulos.
- Trabajar con conjuntos de datos estructurados.
- Implementar funciones para reutilizar lógica de negocio.
- Practicar la manipulación de arreglos en JavaScript.
- Comparar soluciones mediante estructuras tradicionales y Array Methods.
- Desarrollar aplicaciones interactivas desde la terminal.

---

**Desarrollado como parte del proceso de formación en Riwi – Trayecto 2.**