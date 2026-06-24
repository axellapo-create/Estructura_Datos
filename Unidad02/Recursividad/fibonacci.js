function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function contarLlamadasFibonacci(n) {
  let llamadas = 0;
  function fib(k) {
    llamadas++;
    if (k <= 1) {
      return k;
    }
    return fib(k - 1) + fib(k - 2);
  }
  return { valor: fib(n), llamadas };
}

function generarArbolLlamadasFibonacci(n) {
  if (n <= 1) {
    return { etiqueta: `fibonacci(${n})`, hijos: [] };
  }
  return {
    etiqueta: `fibonacci(${n})`,
    hijos: [
      generarArbolLlamadasFibonacci(n - 1),
      generarArbolLlamadasFibonacci(n - 2),
    ],
  };
}

function dibujarArbolLlamadas(nodo, prefijo = '', esUltimo = true) {
  const marcador = prefijo + (esUltimo ? '└─ ' : '├─ ');
  console.log(marcador + nodo.etiqueta);

  const hijos = nodo.hijos || [];
  hijos.forEach((hijo, index) => {
    const esUltimoHijo = index === hijos.length - 1;
    const nuevoPrefijo = prefijo + (esUltimo ? '   ' : '│  ');
    dibujarArbolLlamadas(hijo, nuevoPrefijo, esUltimoHijo);
  });
}

const n = 4;
const ejemplo = contarLlamadasFibonacci(n);
const arbol = generarArbolLlamadasFibonacci(n);

console.log('Árbol de llamadas para fibonacci(4):');
dibujarArbolLlamadas(arbol);
console.log('');
console.log('Resultado fibonacci(4):', ejemplo.valor);
console.log('Llamadas totales:', ejemplo.llamadas);

console.log('');
console.log('Subproblemas redundantes:');
console.log('- fibonacci(2) se calcula dos veces.');
console.log('- fibonacci(1) se calcula tres veces.');
console.log('- fibonacci(0) se calcula dos veces.');
console.log('');
console.log('Complejidad de tiempo:');
console.log('- Cada llamada no base invoca dos llamadas recursivas.');
console.log('- El número total de llamadas crece de forma exponencial con n.');
console.log('- La recurrencia es T(n) = T(n-1) + T(n-2) + O(1).');
console.log('- Esto da un tiempo de ejecución aproximado O(φ^n), donde φ ≈ 1.618.');
console.log('- Para valores grandes de n, el algoritmo se vuelve muy lento.');
