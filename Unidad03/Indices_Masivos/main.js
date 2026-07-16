import { performance } from 'node:perf_hooks';
import { ArbolBPacientes } from './ArbolBPacientes.js';
import { RouterBuffer } from './RouterBuffer.js';

const arbol = new ArbolBPacientes(3);
[40, 20, 60, 10, 30, 50, 70, 80, 90, 25, 35, 65].forEach(k => arbol.insertar(k));
console.log('Recorrido ordenado:', arbol.recorrer().join(', '));
for (const k of [65, 66]) {
  const encontrado = Boolean(arbol.buscar(k));
  console.log(`Buscar ${k}: ${encontrado ? 'encontrado' : 'no encontrado'}; páginas=${arbol.lecturasDisco}`);
}
console.log('Estadísticas:', arbol.estadisticas());

const paquetes = [
  ['P1', 30], ['P2', 10], ['P3', 20], ['P4', 10], ['P5', 5],
  ['P6', 30], ['P7', 15], ['P8', 5], ['P9', 25], ['P10', 10]
];
const router = new RouterBuffer();
paquetes.forEach(([id, latencia]) => router.push({ id, latencia }));
console.log('Peek:', router.peek());
const salida = [];
while (!router.isEmpty()) salida.push(router.pop());
console.table(salida);

if (process.argv.includes('--millon')) {
  const grande = new ArbolBPacientes(100);
  const inicio = performance.now();
  for (let i = 1; i <= 1_000_000; i++) grande.insertar(i);
  const fin = performance.now();
  console.log(`Inserción real de 1.000.000: ${(fin - inicio).toFixed(2)} ms`);
  console.log('Estadísticas reales:', grande.estadisticas());
  for (const k of [1, 50_000, 250_000, 500_000, 999_999, 1_000_000, 1_000_001]) {
    const t0 = performance.now();
    const encontrado = Boolean(grande.buscar(k));
    const dt = performance.now() - t0;
    console.log(`${k}|${encontrado}|${grande.lecturasDisco}|${dt.toFixed(4)} ms`);
  }
}
