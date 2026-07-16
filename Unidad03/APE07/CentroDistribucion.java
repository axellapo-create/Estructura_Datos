import java.util.ArrayList;

public class CentroDistribucion {

    ArrayList<Paquete> inventario;

    public CentroDistribucion() {
        this.inventario = new ArrayList();
    }

    public void recibirCajaCamion(Paquete p){
        this.inventario.add(p);
    }

    public Paquete despacharACliente(){
        if (!this.inventario.isEmpty()){
            return this.inventario.remove(this.inventario.size()-1);
        }
        return null;
    }



    public void ordenarMergeSort() {
        this.inventario = mergeSort(this.inventario);
    }

    private ArrayList<Paquete> mergeSort(ArrayList<Paquete> lista) {

        if (lista.size() <= 1) {
            return lista;
        }

        int medio = lista.size() / 2;

        ArrayList<Paquete> izquierda = new ArrayList<>(lista.subList(0, medio));
        ArrayList<Paquete> derecha = new ArrayList<>(lista.subList(medio, lista.size()));

        izquierda = mergeSort(izquierda);
        derecha = mergeSort(derecha);

        return merge(izquierda, derecha);
    }

    private ArrayList<Paquete> merge(ArrayList<Paquete> izq, ArrayList<Paquete> der) {

        ArrayList<Paquete> resultado = new ArrayList<>();

        int i = 0, j = 0;

        while (i < izq.size() && j < der.size()) {
            if (izq.get(i).getCodigopostaldestino()
                    .compareTo(der.get(j).getCodigopostaldestino()) <= 0) {

                resultado.add(izq.get(i));
                i++;
            } else {
                resultado.add(der.get(j));
                j++;
            }
        }

        while (i < izq.size()) {
            resultado.add(izq.get(i));
            i++;
        }

        while (j < der.size()) {
            resultado.add(der.get(j));
            j++;
        }

        return resultado;
    }

    public void ordenarQuickSort() {
        quickSort(0, inventario.size() - 1);
    }

    private void quickSort(int low, int high) {

        if (low < high) {

            int pi = partition(low, high);

            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    private int partition(int low, int high) {

        Paquete pivot = inventario.get(high);
        int i = low - 1;

        for (int j = low; j < high; j++) {

            if (inventario.get(j).getCodigopostaldestino()
                    .compareTo(pivot.getCodigopostaldestino()) <= 0) {

                i++;

                Paquete temp = inventario.get(i);
                inventario.set(i, inventario.get(j));
                inventario.set(j, temp);
            }
        }

        Paquete temp = inventario.get(i + 1);
        inventario.set(i + 1, inventario.get(high));
        inventario.set(high, temp);

        return i + 1;
    }

    public void ordenarQuickSortHibrido() {
        quickSortHibrido(0, inventario.size() - 1);
    }

    private void quickSortHibrido(int low, int high) {

        // Umbral típico: 10–20 elementos
        if (high - low <= 10) {
            insertionSort(low, high);
            return;
        }

        if (low < high) {

            int pi = partition(low, high);

            quickSortHibrido(low, pi - 1);
            quickSortHibrido(pi + 1, high);
        }
    }

    private void insertionSort(int low, int high) {

        for (int i = low + 1; i <= high; i++) {

            Paquete key = inventario.get(i);
            int j = i - 1;

            while (j >= low &&
                    inventario.get(j).getCodigopostaldestino()
                            .compareTo(key.getCodigopostaldestino()) > 0) {

                inventario.set(j + 1, inventario.get(j));
                j--;
            }

            inventario.set(j + 1, key);
        }
    }

    // MÉTODOS DE BÚSQUEDA - Tarea 2

    /**
     * Búsqueda lineal de un paquete por ID
     * @param id ID del paquete a buscar
     * @return Paquete encontrado o null si no existe
     */
    public Paquete busquedaLinealPorId(int id) {
        for (Paquete p : inventario) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    /**
     * Verifica si el inventario está ordenado por ID
     * @return true si está ordenado, false en caso contrario
     */
    public boolean estaOrdenadoPorId() {
        for (int i = 0; i < inventario.size() - 1; i++) {
            if (inventario.get(i).getId() > inventario.get(i + 1).getId()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Ordena el inventario por ID usando QuickSort
     */
    public void ordenarPorId() {
        quickSortPorId(0, inventario.size() - 1);
    }

    private void quickSortPorId(int low, int high) {
        if (low < high) {
            int pi = partitionPorId(low, high);
            quickSortPorId(low, pi - 1);
            quickSortPorId(pi + 1, high);
        }
    }

    private int partitionPorId(int low, int high) {
        Paquete pivot = inventario.get(high);
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (inventario.get(j).getId() <= pivot.getId()) {
                i++;
                Paquete temp = inventario.get(i);
                inventario.set(i, inventario.get(j));
                inventario.set(j, temp);
            }
        }

        Paquete temp = inventario.get(i + 1);
        inventario.set(i + 1, inventario.get(high));
        inventario.set(high, temp);

        return i + 1;
    }

    /**
     * Búsqueda binaria de un paquete por ID
     * Requiere que el inventario esté ordenado por ID
     * @param id ID del paquete a buscar
     * @return Paquete encontrado o null si no existe
     * @throws IllegalStateException si el inventario no está ordenado
     */
    public Paquete busquedaBinariaPorId(int id) throws IllegalStateException {
        if (!estaOrdenadoPorId()) {
            throw new IllegalStateException(
                "El inventario no está ordenado por ID. Use ordenarPorId() antes de la búsqueda binaria."
            );
        }
        return busquedaBinariaPorIdDirecto(id);
    }

    /**
     * Búsqueda binaria directa (sin verificación de ordenamiento)
     * Uso interno cuando ya se ha verificado el ordenamiento
     */
    public Paquete busquedaBinariaPorIdDirecto(int id) {
        int low = 0;
        int high = inventario.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            Paquete paqueteMid = inventario.get(mid);

            if (paqueteMid.getId() == id) {
                return paqueteMid;
            } else if (paqueteMid.getId() < id) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return null;
    }
    }