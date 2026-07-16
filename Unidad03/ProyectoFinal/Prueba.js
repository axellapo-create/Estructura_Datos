const BuscadorOptimizado = require('./BuscadorOptimo');
const cantidadDatos = 100000;
const cantidadBusquedas = 10000;
// Creación de datos aleatorios
const datos = Array.from(
    { length: cantidadDatos },
    () => Math.floor(Math.random() * 1000000)
);
// Selección de objetivos existentes
const objetivos = Array.from(
    { length: cantidadBusquedas },
    () => datos[
        Math.floor(Math.random() * datos.length)
    ]
);
console.time("Búsquedas lineales");
for (const objetivo of objetivos) {
    BuscadorOptimizado.busquedaLineal(
        datos,
        objetivo
    );
}
console.timeEnd("Búsquedas lineales");
console.time("Ordenamiento MergeSort");
const datosOrdenados =
    BuscadorOptimizado.mergeSort(datos);
console.timeEnd("Ordenamiento MergeSort");
console.time("Búsquedas binarias");
for (const objetivo of objetivos) {
    BuscadorOptimizado.busquedaBinaria(
        datosOrdenados,
        objetivo
    );
}
console.timeEnd("Búsquedas binarias");