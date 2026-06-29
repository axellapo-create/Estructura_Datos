class GestorOleadas {

    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cola = new ColaCircular(capacidad);
    }

    iniciarOleada() {
        console.log("\n======================================");
        console.log("INICIANDO NUEVA OLEADA");
        console.log("======================================");
    }

    agregarEnemigo(enemigo) {

        try {

            this.cola.encolar(enemigo);

            console.log(
                `Enemigo agregado -> ${enemigo.nombre} (Nivel ${enemigo.nivel})`
            );

        } catch (error) {

            console.log(error.message);

        }

    }

    derrotarEnemigo() {

    try {

        const enemigo = this.cola.desencolar();

        if (!enemigo) {
            console.log("No hay enemigos.");
            return;
        }

        enemigo.derrotar();

        console.log(`Enemigo derrotado -> ${enemigo.nombre}`);

    } catch (error) {
        console.log(error.message);
    }

}

    mostrarOleada() {

        console.log("\n=========== OLEADA ACTUAL ===========");

        this.cola.mostrarCola();

    }

    enemigosRestantes() {
    
        return this.cola.obtenerCantidad();
        
    }

    mostrarPrimerEnemigo() {

        const enemigo = this.cola.frenteCola();

        if (enemigo === null) {

            console.log("No existen enemigos.");

            return;
        }

        console.log("\nPróximo enemigo:");

        console.log(enemigo.mostrarInformacion());

    }

    buscarEnemigo(id) {

    const enemigos = this.cola.obtenerElementos();

    const encontrado = Recursividad.buscarEnemigoPorId(enemigos, id);

    return encontrado; 

    }

    mostrarEnemigosOrdenados() {

    const enemigos = this.cola.obtenerElementos();

    const ordenados = Recursividad.mergeSort(enemigos);

    return ordenados;
}

    procesarOleadaCompleta() {

        console.log("\nProcesando toda la oleada...\n");

        Recursividad.procesarOleadaRecursiva(this);

    }

    reiniciarOleada() {

        this.cola = new ColaCircular(this.capacidad);

        console.log("\nLa oleada ha sido reiniciada.");

    }

}
