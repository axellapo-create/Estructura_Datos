const Enemigo = require("./Enemigo");
const GestorOleadas = require("./GestorOleadas");

const gestor = new GestorOleadas(8);

gestor.iniciarOleada();

const enemigo1 = new Enemigo(1, "Goblin", 50, 2, "Bestia");
const enemigo2 = new Enemigo(2, "Orco", 120, 5, "Guerrero");
const enemigo3 = new Enemigo(3, "Mago Oscuro", 80, 7, "Mago");
const enemigo4 = new Enemigo(4, "Arquero Élfico", 60, 4, "Arquero");
const enemigo5 = new Enemigo(5, "Trol", 200, 6, "Tanque");
const enemigo6 = new Enemigo(6, "Caballero Maldito", 180, 8, "Guerrero");
const enemigo7 = new Enemigo(7, "Nigromante", 150, 9, "Invocador");
const enemigo8 = new Enemigo(8, "Dragón Ancestral", 500, 10, "Jefe");

gestor.agregarEnemigo(enemigo1);
gestor.agregarEnemigo(enemigo2);
gestor.agregarEnemigo(enemigo3);
gestor.agregarEnemigo(enemigo4);
gestor.agregarEnemigo(enemigo5);
gestor.agregarEnemigo(enemigo6);
gestor.agregarEnemigo(enemigo7);
gestor.agregarEnemigo(enemigo8);

gestor.mostrarOleada();

gestor.mostrarPrimerEnemigo();

gestor.enemigosRestantes();

console.log("\n========== BÚSQUEDA RECURSIVA ==========");
gestor.buscarEnemigo(6);

gestor.mostrarEnemigosOrdenados();

console.log("\n======= DERROTANDO ENEMIGOS =======");

gestor.derrotarEnemigo();
gestor.derrotarEnemigo();

gestor.mostrarOleada();

gestor.mostrarPrimerEnemigo();

gestor.enemigosRestantes();

console.log("\n======= PROCESAMIENTO RECURSIVO =======");

gestor.procesarOleadaCompleta();

console.log("\n======= ESTADO FINAL =======");

gestor.mostrarOleada();

gestor.enemigosRestantes();