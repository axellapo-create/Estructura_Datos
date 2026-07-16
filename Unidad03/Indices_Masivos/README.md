# Laboratorio 12: Índices de Almacenamiento Masivo

Implementación ES6+ de un Árbol B para índices de pacientes y un MinHeap para el buffer de un router.

## Requisitos

- Node.js 18 o posterior.

## Ejecución

```bash
node main.js
node pruebas.js
node main.js --millon
```

El último comando inserta realmente los identificadores 1 a 1.000.000 con `t = 100`, mide el tiempo de CPU y reporta páginas visitadas por búsqueda. Los tiempos dependen del equipo; las lecturas son una simulación lógica de nodos visitados, no operaciones físicas de un disco.
