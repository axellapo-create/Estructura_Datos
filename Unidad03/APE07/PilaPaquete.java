public class PilaPaquete {

    private Paquete[] stack;
    private int top;

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1;
    }

    public void push(Paquete p) {
        if (top < stack.length - 1) {
            top++;
            stack[top] = p;
        }
    }

    public Paquete pop() {
        if (top >= 0) {
            Paquete p = stack[top];
            stack[top] = null;
            top--;
            return p;
        }
        return null;
    }

}
