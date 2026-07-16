import { NodoB } from './NodoB.js';

export class ArbolBPacientes {
  constructor(t) {
    if (!Number.isInteger(t) || t < 2) throw new RangeError('t debe ser un entero >= 2');
    this.t = t;
    this.raiz = null;
    this.lecturasDisco = 0;
    this.cantidad = 0;
  }

  reiniciarContador() { this.lecturasDisco = 0; }

  buscar(k) {
    this._validarClave(k);
    this.reiniciarContador();
    if (!this.raiz) return null;
    return this.raiz.buscar(k, () => { this.lecturasDisco++; });
  }

  insertar(k) {
    this._validarClave(k);
    if (this.buscar(k)) return false;
    if (!this.raiz) {
      this.raiz = new NodoB(this.t, true);
      this.raiz.claves.push(k);
      this.cantidad = 1;
      return true;
    }
    if (this.raiz.claves.length === 2 * this.t - 1) {
      const nuevaRaiz = new NodoB(this.t, false);
      nuevaRaiz.hijos.push(this.raiz);
      nuevaRaiz.dividirHijo(0, this.raiz);
      const i = k > nuevaRaiz.claves[0] ? 1 : 0;
      nuevaRaiz.hijos[i].insertarNoLleno(k);
      this.raiz = nuevaRaiz;
    } else {
      this.raiz.insertarNoLleno(k);
    }
    this.cantidad++;
    return true;
  }

  recorrer() { return this.raiz ? this.raiz.recorrer([]) : []; }

  estadisticas() {
    if (!this.raiz) return { cantidad: 0, altura: -1, niveles: 0, nodos: 0, t: this.t };
    let nodos = 0;
    const contar = (n) => { nodos++; n.hijos.forEach(contar); };
    contar(this.raiz);
    let altura = 0;
    for (let n = this.raiz; !n.hoja; n = n.hijos[0]) altura++;
    return { cantidad: this.cantidad, altura, niveles: altura + 1, nodos, t: this.t };
  }

  _validarClave(k) {
    if (!Number.isSafeInteger(k) || k < 0) throw new TypeError('La clave debe ser un entero seguro no negativo');
  }
}
