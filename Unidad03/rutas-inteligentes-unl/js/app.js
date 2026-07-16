import { Grafo } from "./grafo.js";
import { lugaresIniciales, caminosIniciales } from "./datos.js";

const CLAVE = "rutas-unl-html";
let lugares = structuredClone(lugaresIniciales);
let caminos = structuredClone(caminosIniciales);

const $ = (id) => document.getElementById(id);
const selects = [$("origenRuta"), $("destinoRuta"), $("origenCamino"), $("destinoCamino")];

function id(prefijo) {
  return `${prefijo}-${crypto.randomUUID()}`;
}

function cargarGuardado() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    if (Array.isArray(datos?.lugares) && Array.isArray(datos?.caminos) && datos.lugares.length) {
      lugares = datos.lugares;
      caminos = datos.caminos;
    }
  } catch {
    localStorage.removeItem(CLAVE);
  }
}

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify({ lugares, caminos }));
}

function nombreDe(idLugar) {
  return lugares.find((lugar) => lugar.id === idLugar)?.nombre ?? "Lugar desconocido";
}

function crearGrafo() {
  const grafo = new Grafo();
  lugares.forEach((lugar) => grafo.agregarLugar(lugar.id));
  caminos.forEach((camino) => grafo.agregarCamino(camino.origen, camino.destino, camino.distancia, camino.bloqueado));
  return grafo;
}

function mensaje(texto) {
  $("mensaje").textContent = texto;
}

function renderizarSelects() {
  const valores = selects.map((select) => select.value);
  const opciones = lugares.map((lugar) => `<option value="${lugar.id}">${lugar.nombre}</option>`).join("");
  selects.forEach((select, indice) => {
    select.innerHTML = opciones;
    if (lugares.some((lugar) => lugar.id === valores[indice])) select.value = valores[indice];
  });

  if (!$("destinoRuta").value || $("destinoRuta").value === $("origenRuta").value) {
    $("destinoRuta").value = lugares[1]?.id ?? lugares[0].id;
  }
}

function renderizar() {
  renderizarSelects();
  const conectados = new Set(caminos.flatMap((camino) => [camino.origen, camino.destino]));

  $("totalLugares").textContent = `${lugares.length} lugares`;
  $("totalCaminos").textContent = `${caminos.filter((camino) => !camino.bloqueado).length} caminos activos`;

  $("tablaLugares").innerHTML = lugares.map((lugar) => `
    <tr>
      <td><strong>${lugar.nombre}</strong></td><td>${lugar.tipo}</td>
      <td>${lugar.referencia || "Sin referencia"}</td>
      <td><span class="estado ${conectados.has(lugar.id) ? "activo" : "aislado"}">${conectados.has(lugar.id) ? "Conectado" : "Aislado"}</span></td>
    </tr>`).join("");

  $("listaCaminos").innerHTML = caminos.map((camino) => `
    <article class="${camino.bloqueado ? "bloqueado" : ""}">
      <div><strong>${nombreDe(camino.origen)} ↔ ${nombreDe(camino.destino)}</strong><small>${camino.distancia} metros</small></div>
      <button type="button" data-camino="${camino.id}">${camino.bloqueado ? "Habilitar" : "Bloquear"}</button>
    </article>`).join("");
}

$("formLugar").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = $("nombreLugar").value.trim().replace(/\s+/g, " ");
  if (lugares.some((lugar) => lugar.nombre.toLowerCase() === nombre.toLowerCase())) {
    mensaje("Ese lugar ya está registrado. Usa un nombre único.");
    return;
  }

  const nuevo = { id: id("lugar"), nombre, tipo: $("tipoLugar").value, referencia: $("referenciaLugar").value.trim() };
  lugares.push(nuevo);
  guardar();
  renderizar();
  $("origenCamino").value = nuevo.id;
  evento.target.reset();
  mensaje(`${nombre} fue agregado. Ahora conéctalo con otro lugar y registra la distancia.`);
  $("conectar").scrollIntoView({ behavior: "smooth" });
});

$("formCamino").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const origen = $("origenCamino").value;
  const destino = $("destinoCamino").value;
  const distancia = Number($("distanciaCamino").value);

  if (origen === destino) {
    mensaje("Un camino debe conectar dos lugares diferentes.");
    return;
  }
  if (!Number.isFinite(distancia) || distancia <= 0) {
    mensaje("La distancia debe ser positiva.");
    return;
  }

  const existente = caminos.find((camino) =>
    (camino.origen === origen && camino.destino === destino) ||
    (camino.origen === destino && camino.destino === origen));

  if (existente) {
    existente.distancia = Math.round(distancia);
    existente.bloqueado = false;
    mensaje("La conexión ya existía: su distancia fue actualizada.");
  } else {
    caminos.push({ id: id("camino"), origen, destino, distancia: Math.round(distancia), bloqueado: false });
    mensaje("Camino registrado correctamente.");
  }
  $("distanciaCamino").value = "";
  guardar();
  renderizar();
});

$("formRuta").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const origen = $("origenRuta").value;
  const destino = $("destinoRuta").value;
  if (origen === destino) {
    mensaje("Selecciona lugares diferentes.");
    return;
  }

  const resultado = crearGrafo().dijkstra(origen, destino);
  if (!resultado.encontrado) {
    $("resultado").innerHTML = `<div class="vacio error"><b>!</b><h3>No existe una ruta disponible</h3><p>El destino está aislado o sus caminos están bloqueados.</p></div>`;
    return;
  }

  const pasos = resultado.ruta.map((idLugar, indice) => `<div class="paso"><span>${indice + 1}</span><strong>${nombreDe(idLugar)}</strong></div>`).join("");
  $("resultado").innerHTML = `
    <div class="ruta-encontrada"><p class="eyebrow verde">Ruta óptima encontrada</p>${pasos}
      <div class="metricas"><div><small>Distancia total</small><strong>${resultado.distancia} m</strong></div>
      <div><small>Tiempo estimado</small><strong>${Math.ceil(resultado.distancia / 80)} min</strong></div></div>
    </div>`;
});

$("listaCaminos").addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-camino]");
  if (!boton) return;
  const camino = caminos.find((item) => item.id === boton.dataset.camino);
  camino.bloqueado = !camino.bloqueado;
  guardar();
  renderizar();
});

$("restaurar").addEventListener("click", () => {
  lugares = structuredClone(lugaresIniciales);
  caminos = structuredClone(caminosIniciales);
  guardar();
  renderizar();
  mensaje("Se restauraron los datos demostrativos.");
});

cargarGuardado();
renderizar();
