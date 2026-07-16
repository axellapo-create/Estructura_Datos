class BuscadorOptimizado {
    // Ordenamiento MergeSort: O(n log n)
    static mergeSort(arreglo) {
        if (!Array.isArray(arreglo)) {
            throw new TypeError("El valor recibido debe ser un arreglo.");
        }
        if (arreglo.length <= 1) {
            return arreglo.slice();
        }
        const medio = Math.floor(arreglo.length / 2);
        const izquierda = arreglo.slice(0, medio);
        const derecha = arreglo.slice(medio);
        const izquierdaOrdenada = this.mergeSort(izquierda);
        const derechaOrdenada = this.mergeSort(derecha);
        return this.combinar(
            izquierdaOrdenada,
            derechaOrdenada
        );
    }
    // Combina dos arreglos previamente ordenados
    static combinar(izquierda, derecha) {
        const resultado = [];
        let indiceIzquierdo = 0;
        let indiceDerecho = 0;
        while (
            indiceIzquierdo < izquierda.length &&
            indiceDerecho < derecha.length
        ) {
            if (izquierda[indiceIzquierdo] <=
                derecha[indiceDerecho]
            ) {
                resultado.push(
                    izquierda[indiceIzquierdo]
                );
                indiceIzquierdo++;
            } else {
                resultado.push(
                    derecha[indiceDerecho]
                );
                indiceDerecho++;
            }
        }
        return resultado.concat(
            izquierda.slice(indiceIzquierdo),
            derecha.slice(indiceDerecho)
        );
    }
    // Búsqueda lineal: O(n)
    static busquedaLineal(arreglo, objetivo) {
        for (let i = 0; i < arreglo.length; i++) {
            if (arreglo[i] === objetivo) {
                return i;
            }
        }
        return -1;
    }
    // Búsqueda binaria: O(log n)
    static busquedaBinaria(arregloOrdenado, objetivo) {
        let izquierda = 0;
        let derecha = arregloOrdenado.length - 1;
        while (izquierda <= derecha) {
            const medio = Math.floor(
                (izquierda + derecha) / 2
            );
            if (arregloOrdenado[medio] === objetivo) {
                return medio;
            }
            if (arregloOrdenado[medio] < objetivo) {
                izquierda = medio + 1;
            } else {
                derecha = medio - 1;
            }
        }
        return -1;
    }
}

module.exports = BuscadorOptimizado;