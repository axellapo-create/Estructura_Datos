class NodoArbol {
  constructor(valor) {
    this.valor     = valor;
    this.izquierdo = null;
    this.derecho   = null;
  }
}

function recorridoInorden(raiz) {
  if (raiz === null) return [];

  return [
    ...recorridoInorden(raiz.izquierdo),
    raiz.valor,
    ...recorridoInorden(raiz.derecho)
  ];
}

function recorridoPreorden(raiz) {
  if (raiz === null) return [];

  return [
    raiz.valor,
    ...recorridoPreorden(raiz.izquierdo),
    ...recorridoPreorden(raiz.derecho)
  ];
}

function recorridoPostorden(raiz) {
  if (raiz === null) return [];

  return [
    ...recorridoPostorden(raiz.izquierdo),
    ...recorridoPostorden(raiz.derecho),
    raiz.valor
  ];
}

const raiz   = new NodoArbol(4);
raiz.izquierdo         = new NodoArbol(2);
raiz.derecho           = new NodoArbol(6);
raiz.izquierdo.izquierdo = new NodoArbol(1);
raiz.izquierdo.derecho   = new NodoArbol(3);
raiz.derecho.izquierdo   = new NodoArbol(5);
raiz.derecho.derecho     = new NodoArbol(7);

console.assert(JSON.stringify(recorridoInorden(raiz))   === "[1,2,3,4,5,6,7]");
console.assert(JSON.stringify(recorridoPreorden(raiz))  === "[4,2,1,3,6,5,7]");
console.assert(JSON.stringify(recorridoPostorden(raiz)) === "[1,3,2,5,7,6,4]");
console.log("Ejercicio 3.1 superado.");