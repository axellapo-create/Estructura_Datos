public class GestorRutas {

    public static void ordenar(Paquete[] datos) {

        if (datos.length <= 1) return;

        int longitud = datos[0].getCodigopostaldestino().length();

        for (int pos = longitud - 1; pos >= 0; pos--) {
            countingSortPorPosicion(datos, pos);
        }
    }

    private static void countingSortPorPosicion(Paquete[] datos, int posicion) {

        int n = datos.length;

        Paquete[] salida = new Paquete[n];
        int[] conteo = new int[10];

        for (int i = 0; i < n; i++) {

            int digito = datos[i].getCodigopostaldestino().charAt(posicion) - '0';

            conteo[digito]++;
        }

        for (int i = 1; i < 10; i++) {
            conteo[i] += conteo[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {

            int digito = datos[i].getCodigopostaldestino().charAt(posicion) - '0';

            salida[conteo[digito] - 1] = datos[i];
            conteo[digito]--;
        }

        System.arraycopy(salida, 0, datos, 0, n);
    }
}