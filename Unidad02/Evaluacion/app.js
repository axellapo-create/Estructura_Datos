
// ======================================
// VARIABLES GLOBALES
// ======================================

let gestor;

const cantidad = document.getElementById("cantidadEnemigos");
const proximo = document.getElementById("proximoEnemigo");

const colaVisual = document.getElementById("colaVisual");
const indices = document.getElementById("indices");
const punteros = document.getElementById("punteros");

const resultado = document.getElementById("resultado");

const txtBusqueda = document.getElementById("idBusqueda");

const btnDerrotar = document.getElementById("btnDerrotar");
const btnOrdenar = document.getElementById("btnOrdenar");
const btnProcesar = document.getElementById("btnProcesar");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnBuscar = document.getElementById("btnBuscar");


// ======================================
// INICIALIZAR SISTEMA
// ======================================

function crearOleadaInicial() {

    gestor = new GestorOleadas(8);

    gestor.agregarEnemigo(new Enemigo(1, "Goblin", 50, 2, "Bestia"));
    gestor.agregarEnemigo(new Enemigo(2, "Orco", 120, 5, "Guerrero"));
    gestor.agregarEnemigo(new Enemigo(3, "Mago Oscuro", 80, 7, "Mago"));
    gestor.agregarEnemigo(new Enemigo(4, "Arquero Élfico", 60, 4, "Arquero"));
    gestor.agregarEnemigo(new Enemigo(5, "Trol", 200, 6, "Tanque"));
    gestor.agregarEnemigo(new Enemigo(6, "Caballero Maldito", 180, 8, "Guerrero"));
    gestor.agregarEnemigo(new Enemigo(7, "Nigromante", 150, 9, "Invocador"));
    gestor.agregarEnemigo(new Enemigo(8, "Dragón Ancestral", 500, 10, "Jefe"));

}


// ======================================
// ACTUALIZAR TODA LA INTERFAZ
// ======================================

function actualizarPantalla() {

    actualizarCantidad();
    dibujarEnemigo();
    dibujarCola();
    dibujarIndices();
    dibujarPunteros();

}


// ======================================
// CANTIDAD DE ENEMIGOS
// ======================================

function actualizarCantidad() {

    cantidad.textContent = gestor.enemigosRestantes();

}


// ======================================
// PRÓXIMO ENEMIGO
// ======================================

function dibujarEnemigo() {

    const enemigo = gestor.cola.frenteCola();

    if (!enemigo) {

        proximo.innerHTML = "No hay enemigos";

        return;

    }

    proximo.innerHTML = `

        <p><b>${enemigo.nombre}</b></p>
        <p>❤️ Vida: ${enemigo.vida}</p>
        <p>⭐ Nivel: ${enemigo.nivel}</p>
        <p>🛡 Tipo: ${enemigo.tipo}</p>
        <p>🟢 Estado: ${enemigo.estado}</p>

    `;

}

function dibujarCola() {

    colaVisual.innerHTML = "";

    const estado = gestor.cola.obtenerEstado();

    const centro = document.createElement("div");
    centro.classList.add("centro-circulo");

    centro.innerHTML = `
        <h3>COLA CIRCULAR</h3>
        <p>Capacidad: ${estado.capacidad}</p>
        <p>Frente: ${estado.frente}</p>
        <p>Final: ${estado.final}</p>
    `;

    colaVisual.appendChild(centro);

    const total = estado.capacidad;
    const radio = Math.min(180, colaVisual.offsetWidth / 3);

    for (let i = 0; i < total; i++) {

        const nodo = document.createElement("div");
        nodo.classList.add("nodo-circulo");

        const enemigo = estado.elementos[i];

        if (enemigo) {
            nodo.innerHTML = enemigo.nombre;
        } else {
            nodo.innerHTML = "Vacío";
            nodo.classList.add("vacio");
        }

        // Posición circular
        const angle = (i / total) * (2 * Math.PI);

        const x = Math.cos(angle) * radio;
        const y = Math.sin(angle) * radio;

        nodo.style.transform = `translate(${x}px, ${y}px)`;

        // Frente y final
        if (i === estado.frente && i === estado.final) {
            nodo.classList.add("frente-final");
        }
        else if (i === estado.frente) {
            nodo.classList.add("frente");
        }
        else if (i === estado.final) {
            nodo.classList.add("final");
        }

        colaVisual.appendChild(nodo);
    }
}

// ======================================
// ÍNDICES
// ======================================

function dibujarIndices() {

    indices.innerHTML = "";

    const estado = gestor.cola.obtenerEstado();

    for (let i = 0; i < estado.capacidad; i++) {

        const div = document.createElement("div");

        div.classList.add("indice");

        div.textContent = i;

        indices.appendChild(div);

    }

}


// ======================================
// PUNTEROS (FRENTE Y FINAL)
// ======================================

function dibujarPunteros() {

    punteros.innerHTML = "";

    const estado = gestor.cola.obtenerEstado();

    const frente = document.createElement("div");
    frente.classList.add("puntero");
    frente.textContent = "Frente → " + estado.frente;

    const final = document.createElement("div");
    final.classList.add("puntero");
    final.textContent = "Final → " + estado.final;

    punteros.appendChild(frente);
    punteros.appendChild(final);

}


window.onload = () => {

    crearOleadaInicial();
    actualizarPantalla();

    btnDerrotar.onclick = () => {
        gestor.derrotarEnemigo();
        actualizarPantalla();
    };

    btnOrdenar.onclick = () => {

    const ordenados = gestor.mostrarEnemigosOrdenados() || [];

    resultado.innerHTML = "<h3>Ordenados por nivel</h3>";

    ordenados.forEach(e => {
        resultado.innerHTML += `<p>${e.nombre} - Nivel ${e.nivel}</p>`;
    });

};

    btnProcesar.onclick = () => {
        gestor.procesarOleadaCompleta();
        actualizarPantalla();
    };

    btnReiniciar.onclick = () => {
        crearOleadaInicial();
        actualizarPantalla();
    };

    btnBuscar.onclick = () => {

        const id = parseInt(txtBusqueda.value);
        const encontrado = gestor.buscarEnemigo(id);

        resultado.innerHTML = encontrado
            ? `<p>${encontrado.nombre}</p>`
            : "No encontrado";
    };

};
