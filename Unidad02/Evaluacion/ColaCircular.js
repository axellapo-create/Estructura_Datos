class ColaCircular {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cola = new Array(capacidad);
        this.frente = 0;
        this.final = -1;
        this.cantidad = 0;
    }

    estaVacia() {
        return this.cantidad === 0;
    }

    estaLlena() {
        return this.cantidad === this.capacidad;
    }

    obtenerCantidad() {
        return this.cantidad;
    }

    encolar(elemento) {
        if (this.estaLlena()) {
            throw new Error("La cola está llena.");
        }

        this.final = (this.final + 1) % this.capacidad;
        this.cola[this.final] = elemento;
        this.cantidad++;
    }

    desencolar() {
        if (this.estaVacia()) {
            throw new Error("La cola está vacía.");
        }

        const elemento = this.cola[this.frente];
        this.cola[this.frente] = null;

        this.frente = (this.frente + 1) % this.capacidad;
        this.cantidad--;

        if (this.cantidad === 0) {
            this.frente = 0;
            this.final = -1;
        }

        return elemento;
    }

    frenteCola() {
        if (this.estaVacia()) {
            return null;
        }

        return this.cola[this.frente];
    }

    mostrarCola() {
        if (this.estaVacia()) {
            console.log("La oleada está vacía.");
            return;
        }

        console.log("=== Enemigos en la Cola ===");

        for (let i = 0; i < this.cantidad; i++) {
            const indice = (this.frente + i) % this.capacidad;
            console.log(this.cola[indice].mostrarInformacion());
        }
    }

    obtenerElementos() {
        const elementos = [];

        for (let i = 0; i < this.cantidad; i++) {
            const indice = (this.frente + i) % this.capacidad;
            elementos.push(this.cola[indice]);
        }

        return elementos;
    }

    obtenerEstado() {
    return {
        capacidad: this.capacidad,
        frente: this.frente,
        final: this.final,
        cantidad: this.cantidad,
        elementos: [...this.cola]
    };
}
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Enemigo;
}

if (typeof window !== "undefined") {
    window.Enemigo = Enemigo;
}