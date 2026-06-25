import { RegistroAmbiental } from "./RegistroAmbiental.js";
import { GestorRegistrosVerdes } from "./GestorRegistrosVerdes.js";

const gestor = new GestorRegistrosVerdes();

function generarDatosPrueba(cantidad) {

    let datos = [];

    for (let i = 0; i < cantidad; i++) {

        let especie =
            `Especie_${Math.floor(Math.random() * 100)}`;

        let co2 =
            +(Math.random() * 100).toFixed(2);

        datos.push(
            new RegistroAmbiental(
                i,
                especie,
                co2
            )
        );
    }

    for (let i = datos.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [datos[i], datos[j]] =
        [datos[j], datos[i]];
    }

    return datos;
}

function ejecutarPrueba(cantidad, idBuscado) {

    const datos =
        generarDatosPrueba(cantidad);

    const inicioSec =
        performance.now();

    gestor.busquedaSecuencial(
        datos,
        idBuscado
    );

    const finSec =
        performance.now();

    const inicioMerge =
        performance.now();

    gestor.mergeSort(
        datos,
        0,
        datos.length - 1
    );

    const finMerge =
        performance.now();

    const inicioBin =
        performance.now();

    gestor.busquedaBinaria(
        datos,
        idBuscado
    );

    const finBin =
        performance.now();

    console.log(`\nDataset: ${cantidad}`);

    console.log(
        `Secuencial: ${(finSec - inicioSec).toFixed(4)} ms`
    );

    console.log(
        `MergeSort: ${(finMerge - inicioMerge).toFixed(4)} ms`
    );

    console.log(
        `Binaria: ${(finBin - inicioBin).toFixed(4)} ms`
    );
}

ejecutarPrueba(25000, 24999);
ejecutarPrueba(500000, 499999);
ejecutarPrueba(1000000, 999999);