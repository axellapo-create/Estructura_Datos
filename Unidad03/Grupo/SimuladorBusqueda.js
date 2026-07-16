const MotorAutocompletado = require("./MotorAutocompletado");

// ============================================================
// MAIN: Simulador de Barra de Búsqueda de Paquetería
// ============================================================

const motor = new MotorAutocompletado();

const diccionario = [
  "paquete_express",
  "postal_nacional",
  "prioritario",
  "estandar",
  "perecedero"
];

// ============================================================
// CARGA DEL DICCIONARIO
// ============================================================

console.log("==============================================");
console.log("CARGA DEL DICCIONARIO DE PAQUETERÍA");
console.log("==============================================");

diccionario.forEach((termino) => {
  motor.insertarTermino(termino);
  console.log(`insertarTermino("${termino}") -> OK`);
});

console.log("\nDiccionario de paquetería cargado exitosamente.");

// ============================================================
// PRUEBA 1: LLAMADAS INDIVIDUALES
// ============================================================

console.log("\n==============================================");
console.log("PRUEBAS DE BÚSQUEDA INDIVIDUALES");
console.log("==============================================");

const resultadoP = motor.obtenerSugerencias("p");
const resultadoPa = motor.obtenerSugerencias("pa");
const resultadoPos = motor.obtenerSugerencias("pos");

console.log("\nSugerencias para 'p':");
console.log(resultadoP.length > 0 ? resultadoP : "(sin resultados)");

console.log("\nSugerencias para 'pa':");
console.log(resultadoPa.length > 0 ? resultadoPa : "(sin resultados)");

console.log("\nSugerencias para 'pos':");
console.log(resultadoPos.length > 0 ? resultadoPos : "(sin resultados)");

// ============================================================
// PRUEBA 2: BUCLE ITERATIVO CON MEDICIÓN DE TIEMPO
// ============================================================

const prefijosPrueba = ["p", "pa", "pos", "e", "pe"];

console.log("\n==============================================");
console.log("SIMULACIÓN DE BUCLE DE BÚSQUEDA");
console.log("==============================================");

prefijosPrueba.forEach((prefijo) => {
  const etiquetaTiempo = `Tiempo_Busqueda_${prefijo}`;

  console.time(etiquetaTiempo);

  const resultados = motor.obtenerSugerencias(prefijo);

  console.timeEnd(etiquetaTiempo);

  console.log(`Sugerencias para '${prefijo}':`);

  if (resultados.length > 0) {
    console.log(resultados);
  } else {
    console.log("(sin resultados)");
  }

  console.log("----------------------------------------------");
});

// ============================================================
// PRUEBA 3: PREFIJO INEXISTENTE
// ============================================================

console.log("\n==============================================");
console.log("PRUEBA DE PREFIJO INEXISTENTE");
console.log("==============================================");

const prefijoInexistente = "zzz";
const resultadosInexistentes =
  motor.obtenerSugerencias(prefijoInexistente);

console.log(`Sugerencias para '${prefijoInexistente}':`);

console.log(
  resultadosInexistentes.length > 0
    ? resultadosInexistentes
    : "(sin resultados)"
);

// ============================================================
// PRUEBA 4: BUSCAR NODO DE PREFIJO
// ============================================================

console.log("\n==============================================");
console.log("PRUEBA DE buscarNodoPrefijo");
console.log("==============================================");

const existePa = motor.buscarNodoPrefijo("pa") !== null;
const existeXy = motor.buscarNodoPrefijo("xy") !== null;

console.log(`buscarNodoPrefijo("pa") existe: ${existePa}`);
console.log(`buscarNodoPrefijo("xy") existe: ${existeXy}`);