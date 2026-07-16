export class NodoB {
  constructor(t, hoja = true) {
    if (!Number.isInteger(t) || t < 2) throw new RangeError('t debe ser un entero >= 2');
    this.t = t;
    this.hoja = Boolean(hoja);
    this.claves = [];
    this.hijos = [];
  }

  get n() { return this.claves.length; }

  buscar(k, alVisitar = () => {}) {
    alVisitar(this);
    let i = 0;
    while (i < this.claves.length && k > this.claves[i]) i++;
    if (i < this.claves.length && this.claves[i] === k) return this;
    if (this.hoja) return null;
    return this.hijos[i].buscar(k, alVisitar);
  }

  dividirHijo(indice, hijoLleno) {
    const t = this.t;
    if (!(hijoLleno instanceof NodoB) || hijoLleno.claves.length !== 2 * t - 1) {
      throw new Error('Solo puede dividirse un hijo lleno compatible');
    }
    const derecho = new NodoB(t, hijoLleno.hoja);
    const mediana = hijoLleno.claves[t - 1];
    derecho.claves = hijoLleno.claves.slice(t);
    hijoLleno.claves = hijoLleno.claves.slice(0, t - 1);
    if (!hijoLleno.hoja) {
      derecho.hijos = hijoLleno.hijos.slice(t);
      hijoLleno.hijos = hijoLleno.hijos.slice(0, t);
    }
    this.hijos.splice(indice + 1, 0, derecho);
    this.claves.splice(indice, 0, mediana);
  }

  insertarNoLleno(k) {
    let i = this.claves.length - 1;
    if (this.hoja) {
      while (i >= 0 && k < this.claves[i]) i--;
      this.claves.splice(i + 1, 0, k);
      return;
    }
    while (i >= 0 && k < this.claves[i]) i--;
    i++;
    if (this.hijos[i].claves.length === 2 * this.t - 1) {
      this.dividirHijo(i, this.hijos[i]);
      if (k > this.claves[i]) i++;
    }
    this.hijos[i].insertarNoLleno(k);
  }

  recorrer(resultado = []) {
    for (let i = 0; i < this.claves.length; i++) {
      if (!this.hoja) this.hijos[i].recorrer(resultado);
      resultado.push(this.claves[i]);
    }
    if (!this.hoja) this.hijos[this.claves.length].recorrer(resultado);
    return resultado;
  }
}
