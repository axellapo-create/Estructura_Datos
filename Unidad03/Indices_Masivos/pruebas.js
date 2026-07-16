import assert from 'node:assert/strict';
import { NodoB } from './NodoB.js';
import { ArbolBPacientes } from './ArbolBPacientes.js';
import { RouterBuffer } from './RouterBuffer.js';

let aprobadas = 0;
const prueba = (nombre, fn) => {
  try { fn(); aprobadas++; console.log(`OK ${String(aprobadas).padStart(2, '0')} - ${nombre}`); }
  catch (e) { console.error(`FALLO - ${nombre}: ${e.message}`); process.exitCode = 1; }
};

const arbol = new ArbolBPacientes(2);
prueba('creación del Árbol B', () => assert.equal(arbol.raiz, null));
prueba('inserción de claves', () => [10, 20, 5, 6, 12, 30, 7, 17].forEach(k => assert.equal(arbol.insertar(k), true)));
prueba('recorrido ordenado', () => assert.deepEqual(arbol.recorrer(), [5, 6, 7, 10, 12, 17, 20, 30]));
prueba('búsqueda existente', () => assert.ok(arbol.buscar(17)));
prueba('búsqueda inexistente', () => assert.equal(arbol.buscar(99), null));
prueba('contador incluye raíz y se reinicia', () => { arbol.buscar(17); const a = arbol.lecturasDisco; arbol.buscar(10); assert.ok(a >= 1); assert.equal(arbol.lecturasDisco, 1); });
prueba('división de nodo lleno', () => { const p = new NodoB(2, false); const h = new NodoB(2, true); h.claves = [1, 2, 3]; p.hijos = [h]; p.dividirHijo(0, h); assert.deepEqual(p.claves, [2]); assert.deepEqual(p.hijos[1].claves, [3]); });
prueba('división de raíz', () => { const a = new ArbolBPacientes(2); [1, 2, 3, 4].forEach(k => a.insertar(k)); assert.equal(a.raiz.hoja, false); assert.deepEqual(a.raiz.claves, [2]); });
prueba('rechazo de duplicado', () => assert.equal(arbol.insertar(12), false));

const router = new RouterBuffer();
const datos = [['P1',30],['P2',10],['P3',20],['P4',10],['P5',5],['P6',30],['P7',15],['P8',5],['P9',25],['P10',10]];
prueba('inserción de diez paquetes', () => { datos.forEach(([id, latencia]) => router.push({id, latencia})); assert.equal(router.size(), 10); });
prueba('peek devuelve el prioritario', () => assert.equal(router.peek().id, 'P5'));
let salida;
prueba('extracción completa', () => { salida = []; while (!router.isEmpty()) salida.push(router.pop()); assert.equal(salida.length, 10); });
prueba('orden por prioridad', () => assert.deepEqual(salida.map(p => p.latencia), [5,5,10,10,10,15,20,25,30,30]));
prueba('pop vacío devuelve null', () => assert.equal(router.pop(), null));
prueba('empates conservan llegada', () => assert.deepEqual(salida.filter(p => p.latencia === 10).map(p => p.id), ['P2','P4','P10']));
prueba('ID duplicado rechazado', () => { const r = new RouterBuffer(); r.push({id:'X',latencia:1}); assert.throws(() => r.push({id:'X',latencia:2})); });
prueba('paquete inválido rechazado', () => assert.throws(() => new RouterBuffer().push({id:'Y',latencia:-1})));

console.log(`\nResultado: ${aprobadas}/17 pruebas aprobadas.`);
if (aprobadas !== 17) process.exitCode = 1;
