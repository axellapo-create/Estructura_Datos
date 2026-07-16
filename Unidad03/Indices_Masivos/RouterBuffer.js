export class RouterBuffer {
  constructor() {
    this.heap = [];
    this.ids = new Set();
    this.siguienteOrden = 1;
  }

  push(paquete) {
    this._validar(paquete);
    if (this.ids.has(paquete.id)) throw new Error(`ID duplicado: ${paquete.id}`);
    const elemento = { id: paquete.id, latencia: paquete.latencia, ordenLlegada: this.siguienteOrden++ };
    this.ids.add(elemento.id);
    this.heap.push(elemento);
    this.bubbleUp(this.heap.length - 1);
    return elemento;
  }

  pop() {
    if (this.isEmpty()) return null;
    const raiz = this.heap[0];
    const ultimo = this.heap.pop();
    this.ids.delete(raiz.id);
    if (!this.isEmpty()) {
      this.heap[0] = ultimo;
      this.bubbleDown(0);
    }
    return raiz;
  }

  peek() { return this.heap[0] ?? null; }
  size() { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }

  bubbleUp(indice = this.heap.length - 1) {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);
      if (!this._menor(this.heap[indice], this.heap[padre])) break;
      [this.heap[indice], this.heap[padre]] = [this.heap[padre], this.heap[indice]];
      indice = padre;
    }
  }

  bubbleDown(indice = 0) {
    while (true) {
      const izq = 2 * indice + 1;
      const der = izq + 1;
      let menor = indice;
      if (izq < this.size() && this._menor(this.heap[izq], this.heap[menor])) menor = izq;
      if (der < this.size() && this._menor(this.heap[der], this.heap[menor])) menor = der;
      if (menor === indice) break;
      [this.heap[indice], this.heap[menor]] = [this.heap[menor], this.heap[indice]];
      indice = menor;
    }
  }

  _menor(a, b) {
    return a.latencia < b.latencia || (a.latencia === b.latencia && a.ordenLlegada < b.ordenLlegada);
  }

  _validar(p) {
    if (!p || !['string', 'number'].includes(typeof p.id) || p.id === '') throw new TypeError('Paquete con ID inválido');
    if (typeof p.latencia !== 'number' || !Number.isFinite(p.latencia) || p.latencia < 0) throw new TypeError('Latencia inválida');
  }
}
