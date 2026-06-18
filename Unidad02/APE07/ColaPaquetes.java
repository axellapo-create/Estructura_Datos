public class ColaPaquetes {
    private Paquete[] queue;
    private int frente, fin, total;

    public ColaPaquetes(int capacidad) {
        this.queue = new Paquete[capacidad];
        this.frente = 0;
        this.fin = 0;
        this.total = 0;
    }

    public void enqueue(Paquete p) {
        if (total < queue.length) {
            queue[fin] = p;
            fin = (fin + 1) % queue.length;
            total++;
        }
    }

    public Paquete dequeue() {
        if (total > 0) {
            Paquete p = queue[frente];
            queue[frente] = null;
            frente = (frente + 1) % queue.length;
            total--;
            return p;
        }
        return null;
    }
}