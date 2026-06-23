class Cola {
    constructor() {
        this.estudiantes = [];
    }

    llegar(nombre) {
        this.estudiantes.push(nombre);
    }

    atender() {
        if (this.estudiantes.length === 0) {
            return "No hay estudiantes en espera";
        }

        return this.estudiantes.shift();
    }

    mostrar() {
        console.log(this.estudiantes);
    }
}

const cola = new Cola();

cola.llegar("Axel");
cola.llegar("María");
cola.llegar("Pedro");

cola.mostrar();

console.log("Atendiendo:", cola.atender());

cola.mostrar();