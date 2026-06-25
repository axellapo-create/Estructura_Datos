export class GestorRegistrosVerdes {
  constructor() {
    this.registros = [];
  }

  busquedaSecuencial(arreglo, idBuscado) {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i].idRegistro === idBuscado) {
        return i;
      }
    }
    return -1;
  }

  busquedaBinaria(arreglo, idBuscado) {
    let izquierda = 0;
    let derecha = arreglo.length - 1;

    while (izquierda <= derecha) {
      const medio = Math.floor((izquierda + derecha) / 2);
      const idMedio = arreglo[medio].idRegistro;

      if (idMedio === idBuscado) {
        return medio;
      }

      if (idMedio < idBuscado) {
        izquierda = medio + 1;
      } else {
        derecha = medio - 1;
      }
    }

    return -1;
  }

  agregarRegistro(id, placa, tipo) {
    this.registros.push({ id, placa, tipo });
  }

  mergeSort(arreglo, inicio, fin) {
    if (inicio < fin) {
      let medio = Math.floor(inicio + (fin - inicio) / 2);

      this.mergeSort(arreglo, inicio, medio);
      this.mergeSort(arreglo, medio + 1, fin);

      this.merge(arreglo, inicio, medio, fin);
    }
  }

  merge(arreglo, inicio, medio, fin) {
    let izquierda = arreglo.slice(inicio, medio + 1);
    let derecha = arreglo.slice(medio + 1, fin + 1);

    let i = 0, j = 0, k = inicio;

    while (i < izquierda.length && j < derecha.length) {
      if (izquierda[i].idRegistro <= derecha[j].idRegistro) {
        arreglo[k] = izquierda[i];
        i++;
      } else {
        arreglo[k] = derecha[j];
        j++;
      }
      k++;
    }

    while (i < izquierda.length) {
      arreglo[k] = izquierda[i];
      i++;
      k++;
    }

    while (j < derecha.length) {
      arreglo[k] = derecha[j];
      j++;
      k++;
    }
  }
}