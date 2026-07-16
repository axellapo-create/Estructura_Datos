const NodoTrie = require("./NodoTrie");

class MotorAutocompletado {
  constructor() {
    this.raiz = new NodoTrie();
  }

  insertarTermino(termino) {
    if (typeof termino !== "string" || termino.trim() === "") {
      throw new Error("El término debe ser una cadena válida.");
    }

    let actual = this.raiz;
    const palabra = termino.toLowerCase().trim();

    for (const char of palabra) {
      if (!actual.hijos.has(char)) {
        actual.hijos.set(char, new NodoTrie());
      }

      actual = actual.hijos.get(char);
    }

    actual.esFinDePalabra = true;
  }

  buscarNodoPrefijo(prefijo) {
    if (typeof prefijo !== "string") {
      return null;
    }

    let actual = this.raiz;
    const p = prefijo.toLowerCase().trim();

    for (const char of p) {
      if (!actual.hijos.has(char)) {
        return null;
      }

      actual = actual.hijos.get(char);
    }

    return actual;
  }

  obtenerSugerencias(prefijo) {
    const resultados = [];
    const prefijoNormalizado = prefijo.toLowerCase().trim();
    const nodoInicial = this.buscarNodoPrefijo(prefijoNormalizado);

    if (nodoInicial !== null) {
      this.dfsExtraerPalabras(
        nodoInicial,
        prefijoNormalizado,
        resultados
      );
    }

    return resultados;
  }

  dfsExtraerPalabras(nodo, palabraActual, resultados) {
    if (nodo.esFinDePalabra) {
      resultados.push(palabraActual);
    }

    for (const [char, hijo] of nodo.hijos) {
      this.dfsExtraerPalabras(
        hijo,
        palabraActual + char,
        resultados
      );
    }
  }
}

module.exports = MotorAutocompletado;