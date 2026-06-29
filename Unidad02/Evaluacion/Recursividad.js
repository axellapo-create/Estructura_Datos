class Recursividad {

static procesarOleadaRecursiva(gestor) {

        if (gestor.cola.estaVacia()) {
            console.log("\n=================================");
            console.log("La oleada ha sido derrotada.");
            console.log("=================================");
            return;
        }

        gestor.derrotarEnemigo();

        this.procesarOleadaRecursiva(gestor);
    }

    static buscarEnemigoPorId(enemigos, id, indice = 0) {

        if (indice >= enemigos.length) {
            return null;
        }

        if (enemigos[indice].id === id) {
            return enemigos[indice];
        }

        return this.buscarEnemigoPorId(enemigos, id, indice + 1);
    }

static mergeSort(enemigos) {

        if (enemigos.length <= 1) {
            return enemigos;
        }

        const medio = Math.floor(enemigos.length / 2);

        const izquierda = this.mergeSort(enemigos.slice(0, medio));
        const derecha = this.mergeSort(enemigos.slice(medio));

        return this.merge(izquierda, derecha);
    }

    static merge(izquierda, derecha) {

        let resultado = [];

        let i = 0;
        let j = 0;

        while (i < izquierda.length && j < derecha.length) {

            if (izquierda[i].nivel >= derecha[j].nivel) {
                resultado.push(izquierda[i]);
                i++;
            } else {
                resultado.push(derecha[j]);
                j++;
            }

        }

        while (i < izquierda.length) {
            resultado.push(izquierda[i]);
            i++;
        }

        while (j < derecha.length) {
            resultado.push(derecha[j]);
            j++;
        }

        return resultado;
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Enemigo;
}

if (typeof window !== "undefined") {
    window.Enemigo = Enemigo;
}