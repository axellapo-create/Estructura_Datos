// Estructura del Nodo del Índice
class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword         // Llave de búsqueda (ej. "estructura de datos")
        this.urlCache = urlCache       // Valor (ej. "es.wikipedia.org/...")
        this.visitas = 1           // Frecuencia de búsqueda
        this.izquierdo = null
        this.derecho = null
    }
}

// Implementación del TDA Árbol Binario de Búsqueda
class MotorIndexacionBST {
    constructor() {
        this.raiz = null
    }

    // Indexar nueva consulta en el historial
    indexar(keyword, urlCache) {
    const nuevoNodo = new NodoBusqueda(keyword, urlCache)
    if (this.raiz === null) {
        this.raiz = nuevoNodo
        return
    }

    let actual = this.raiz;
    while (true) {
        if (keyword === actual.keyword) {
            actual.visitas++;
            return;
        } else if (keyword < actual.keyword) {
            if (actual.izquierdo === null) {
                actual.izquierdo = nuevoNodo;
                return;
            }
            actual = actual.izquierdo;   
        } else {
            if (actual.derecho === null) {
                actual.derecho = nuevoNodo;
                return;
            }
            actual = actual.derecho;     
        }
    }
}

  _insertarNodo(nodoActual, nuevoNodo) {
    const comparacion = nuevoNodo.keyword.localeCompare(nodoActual.keyword);
    if (comparacion === 0) {
      nodoActual.visitas++;
      return;
    }
    if (comparacion < 0) {
      if (nodoActual.izquierdo === null) {
        nodoActual.izquierdo = nuevoNodo;
      } else {
        this._insertarNodo(nodoActual.izquierdo, nuevoNodo);
      }
    } else {
      if (nodoActual.derecho === null) {
        nodoActual.derecho = nuevoNodo;
      } else {
        this._insertarNodo(nodoActual.derecho, nuevoNodo);
      }
    }
  }

 buscar(keyword) {
        let actual = this.raiz;
        while (actual !== null) {
            if (keyword === actual.keyword) {
                return actual;
            } else if (keyword < actual.keyword) {
                actual = actual.izquierdo;
            } else {
                actual = actual.derecho;
            }
        }
        return null; // No encontrado
    }

    // Recorrido Inorden: exporta el historial ordenado alfabéticamente (A-Z)
    exportarHistorial(nodo = this.raiz, resultado = []) {
        if (nodo !== null) {
            this.exportarHistorial(nodo.izquierdo, resultado);
            resultado.push({
                keyword: nodo.keyword,
                urlCache: nodo.urlCache,
                visitas: nodo.visitas
            });
            this.exportarHistorial(nodo.derecho, resultado);
        }
        return resultado;
    }  

}