class Enemigo {
    constructor(id, nombre, vida, nivel, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.vida = vida;
        this.nivel = nivel;
        this.tipo = tipo;
        this.estado = "Vivo";
    }

    derrotar() {
        this.estado = "Derrotado";
    }

    estaVivo() {
        return this.estado === "Vivo";
    }

    mostrarInformacion() {
        return `ID: ${this.id} | Nombre: ${this.nombre} | Vida: ${this.vida} | Nivel: ${this.nivel} | Tipo: ${this.tipo} | Estado: ${this.estado}`;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Enemigo;
}

if (typeof window !== "undefined") {
    window.Enemigo = Enemigo;
}