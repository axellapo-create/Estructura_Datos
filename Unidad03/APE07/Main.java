import java.util.Random;

public class Main {

    public static void main(String[] args) {
        System.out.println("=".repeat(80));
        System.out.println("SIMULACION DE RENDIMIENTO - BUSQUEDA EN SISTEMA DE DISTRIBUCION");
        System.out.println("=".repeat(80));
        System.out.println();

        // Configuracion
        final int CANTIDAD_PAQUETES = 10000;
        final int CANTIDAD_BUSQUEDAS = 1000;

        System.out.println("PASO 1: GENERANDO " + CANTIDAD_PAQUETES + " PAQUETES CON IDS ALEATORIOS...");
        CentroDistribucion centro = new CentroDistribucion();
        long tiempoGeneracion = generarPaquetes(centro, CANTIDAD_PAQUETES);
        System.out.println("* Paquetes generados en: " + formatoTiempo(tiempoGeneracion));
        System.out.println();

        // MEDICIONES DE ORDENAMIENTO
        System.out.println("PASO 2: ORDENAMIENTO DE DATOS");
        System.out.println("-".repeat(80));

        // Ordenar por ID para busqueda binaria
        long tiempoOrdenamientoPorId = 0;
        {
            long inicio = System.nanoTime();
            centro.ordenarPorId();
            tiempoOrdenamientoPorId = System.nanoTime() - inicio;
            System.out.printf("%-30s: %s%n", "QuickSort (por ID)", formatoTiempo(tiempoOrdenamientoPorId));
        }
        System.out.println();

        // MEDICIONES DE BUSQUEDA
        System.out.println("PASO 3: BUSQUEDA DE PAQUETES (" + CANTIDAD_BUSQUEDAS + " busquedas)");
        System.out.println("-".repeat(80));

        // Generar IDs aleatorios para busqueda - usar IDs que existen en el rango
        int[] idsABuscar = generarIdsAleatorios(CANTIDAD_BUSQUEDAS, 10000);

        // Busqueda lineal (antes de ordenar)
        long tiempoBusquedaLineal = medirBusquedaLineal(centro, idsABuscar);

        // Busqueda binaria (despues de ordenar)
        long tiempoBusquedaBinaria = medirBusquedaBinaria(centro, idsABuscar);

        System.out.println();

        // TABLA COMPARATIVA
        imprimirTablaComparativa(
            CANTIDAD_PAQUETES,
            CANTIDAD_BUSQUEDAS,
            tiempoOrdenamientoPorId,
            tiempoBusquedaLineal,
            tiempoBusquedaBinaria
        );
    }

    /**
     * Genera paquetes con IDs aleatorios
     */
    private static long generarPaquetes(CentroDistribucion centro, int cantidad) {
        long inicio = System.nanoTime();
        Random random = new Random(42); // Seed para reproducibilidad

        for (int i = 0; i < cantidad; i++) {
            int id = i; // Usar indice como ID para garantizar IDs unicos y secuenciales
            String codigoPostal = String.format("%05d", random.nextInt(100000));
            centro.recibirCajaCamion(new Paquete(id, codigoPostal));
        }

        return System.nanoTime() - inicio;
    }

    /**
     * Genera un array de IDs aleatorios para busqueda
     */
    private static int[] generarIdsAleatorios(int cantidad, int maxId) {
        Random random = new Random(123);
        int[] ids = new int[cantidad];
        for (int i = 0; i < cantidad; i++) {
            ids[i] = random.nextInt(maxId);
        }
        return ids;
    }

    /**
     * Mide el tiempo de busqueda lineal
     */
    private static long medirBusquedaLineal(CentroDistribucion centro, int[] ids) {
        long inicio = System.nanoTime();
        int encontrados = 0;

        for (int id : ids) {
            Paquete p = centro.busquedaLinealPorId(id);
            if (p != null) {
                encontrados++;
            }
        }

        long tiempo = System.nanoTime() - inicio;
        System.out.printf("Busqueda Lineal         : %s (encontrados: %d/%d)%n", 
            formatoTiempo(tiempo), encontrados, ids.length);

        return tiempo;
    }

    /**
     * Mide el tiempo de busqueda binaria
     */
    private static long medirBusquedaBinaria(CentroDistribucion centro, int[] ids) {
        // Verificar una sola vez
        if (!centro.estaOrdenadoPorId()) {
            throw new IllegalStateException("El inventario no esta ordenado por ID");
        }
        
        long inicio = System.nanoTime();
        int encontrados = 0;

        for (int id : ids) {
            Paquete p = centro.busquedaBinariaPorIdDirecto(id);
            if (p != null) {
                encontrados++;
            }
        }

        long tiempo = System.nanoTime() - inicio;
        System.out.printf("Busqueda Binaria        : %s (encontrados: %d/%d)%n", 
            formatoTiempo(tiempo), encontrados, ids.length);

        return tiempo;
    }

    /**
     * Imprime la tabla comparativa de resultados
     */
    private static void imprimirTablaComparativa(
            int cantidadPaquetes,
            int cantidadBusquedas,
            long tiempoOrdenamientoPorId,
            long tiempoBusquedaLineal,
            long tiempoBusquedaBinaria) {

        System.out.println();
        System.out.println("PASO 4: TABLA COMPARATIVA DE RESULTADOS");
        System.out.println("=".repeat(80));
        System.out.println();

        // Encabezados
        System.out.printf("%-45s | %20s | %15s%n", "OPERACION", "TIEMPO (ns)", "TIEMPO (ms)");
        System.out.println("-".repeat(85));

        // Datos de entrada
        System.out.printf("%-45s | %20d | %15s%n", 
            "Total de paquetes",
            cantidadPaquetes,
            "");

        System.out.printf("%-45s | %20d | %15s%n", 
            "Total de busquedas realizadas",
            cantidadBusquedas,
            "");

        System.out.println("-".repeat(85));

        // Ordenamientos
        System.out.printf("%-45s | %20d | %15s%n", 
            "Tiempo ordenamiento por ID",
            tiempoOrdenamientoPorId,
            String.format("%.4f ms", tiempoOrdenamientoPorId / 1_000_000.0));

        System.out.println("-".repeat(85));

        // Busquedas
        System.out.printf("%-45s | %20d | %15s%n", 
            "Tiempo busqueda lineal (1000 busquedas)",
            tiempoBusquedaLineal,
            String.format("%.4f ms", tiempoBusquedaLineal / 1_000_000.0));

        System.out.printf("%-45s | %20d | %15s%n", 
            "Tiempo busqueda binaria (1000 busquedas)",
            tiempoBusquedaBinaria,
            String.format("%.4f ms", tiempoBusquedaBinaria / 1_000_000.0));

        System.out.println("-".repeat(85));

        // Analisis de mejora
        double mejora = ((double) tiempoBusquedaLineal - tiempoBusquedaBinaria) / tiempoBusquedaLineal * 100;
        double tiempoPromedioPorBusquedaLineal = tiempoBusquedaLineal / (double) cantidadBusquedas;
        double tiempoPromedioPorBusquedaBinaria = tiempoBusquedaBinaria / (double) cantidadBusquedas;

        System.out.printf("%-45s | %20s | %15s%n", 
            "Tiempo promedio busqueda lineal",
            String.format("%.2f ns", tiempoPromedioPorBusquedaLineal),
            String.format("%.4f us", tiempoPromedioPorBusquedaLineal / 1000.0));

        System.out.printf("%-45s | %20s | %15s%n", 
            "Tiempo promedio busqueda binaria",
            String.format("%.2f ns", tiempoPromedioPorBusquedaBinaria),
            String.format("%.4f us", tiempoPromedioPorBusquedaBinaria / 1000.0));

        System.out.println("=".repeat(85));
        
        if (mejora >= 0) {
            System.out.printf("MEJORA CON BUSQUEDA BINARIA: %.2f%%%n", mejora);
        } else {
            System.out.printf("LA BUSQUEDA LINEAL ES MAS RAPIDA EN ESTE CASO: %.2f%%%n", Math.abs(mejora));
        }
        
        System.out.println("=".repeat(85));
        
        // Analisis de factor de mejora
        double ratio = tiempoBusquedaLineal / (double) tiempoBusquedaBinaria;
        System.out.printf("RATIO BUSQUEDA LINEAL / BUSQUEDA BINARIA: %.2fx%n", ratio);
        
        // Costo total incluyendo ordenamiento
        long costoTotalBinaria = tiempoOrdenamientoPorId + tiempoBusquedaBinaria;
        long costoTotalLineal = tiempoBusquedaLineal;
        
        System.out.println("-".repeat(85));
        System.out.println("ANALISIS DE COSTO TOTAL:");
        System.out.printf("Costo Total (Busqueda Lineal):                      %s%n", 
            formatoTiempo(costoTotalLineal));
        System.out.printf("Costo Total (Ordenamiento + Busqueda Binaria):      %s%n", 
            formatoTiempo(costoTotalBinaria));
        
        if (costoTotalBinaria < costoTotalLineal) {
            double mejoraCosto = (1.0 - (double) costoTotalBinaria / costoTotalLineal) * 100;
            System.out.printf("AHORRO CON BINARIA: %.2f%%%n", mejoraCosto);
        } else {
            double mayorCosto = ((double) costoTotalBinaria / costoTotalLineal - 1.0) * 100;
            System.out.printf("COSTO ADICIONAL CON BINARIA: %.2f%%%n", mayorCosto);
        }
        System.out.println("=".repeat(85));
    }

    /**
     * Formatea un tiempo en nanosegundos a un formato legible
     */
    private static String formatoTiempo(long nanosegundos) {
        if (nanosegundos >= 1_000_000_000) {
            return String.format("%.4f s", nanosegundos / 1_000_000_000.0);
        } else if (nanosegundos >= 1_000_000) {
            return String.format("%.4f ms", nanosegundos / 1_000_000.0);
        } else if (nanosegundos >= 1_000) {
            return String.format("%.4f μs", nanosegundos / 1_000.0);
        } else {
            return nanosegundos + " ns";
        }
    }
}