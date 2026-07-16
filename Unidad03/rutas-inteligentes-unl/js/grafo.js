export class Grafo {
  constructor() {
    this.adyacencia = new Map();
  }

  agregarLugar(id) {
    if (!this.adyacencia.has(id)) this.adyacencia.set(id, []);
  }

  agregarCamino(origen, destino, distancia, bloqueado = false) {
    if (distancia < 0) throw new Error("Dijkstra no admite pesos negativos.");
    this.agregarLugar(origen);
    this.agregarLugar(destino);
    if (bloqueado) return;
    this.adyacencia.get(origen).push({ vecino: destino, peso: distancia });
    this.adyacencia.get(destino).push({ vecino: origen, peso: distancia });
  }

  dijkstra(origen, destino) {
    const distancias = new Map();
    const anteriores = new Map();
    const pendientes = new Set(this.adyacencia.keys());

    for (const id of this.adyacencia.keys()) {
      distancias.set(id, Infinity);
      anteriores.set(id, null);
    }
    distancias.set(origen, 0);

    while (pendientes.size) {
      let actual = null;
      for (const id of pendientes) {
        if (actual === null || distancias.get(id) < distancias.get(actual)) actual = id;
      }

      if (actual === null || distancias.get(actual) === Infinity) break;
      if (actual === destino) break;
      pendientes.delete(actual);

      for (const conexion of this.adyacencia.get(actual)) {
        if (!pendientes.has(conexion.vecino)) continue;
        const alternativa = distancias.get(actual) + conexion.peso;
        if (alternativa < distancias.get(conexion.vecino)) {
          distancias.set(conexion.vecino, alternativa);
          anteriores.set(conexion.vecino, actual);
        }
      }
    }

    if (!Number.isFinite(distancias.get(destino))) {
      return { encontrado: false, ruta: [], distancia: Infinity };
    }

    const ruta = [];
    let paso = destino;
    while (paso !== null) {
      ruta.unshift(paso);
      paso = anteriores.get(paso);
    }
    return { encontrado: true, ruta, distancia: distancias.get(destino) };
  }
}
