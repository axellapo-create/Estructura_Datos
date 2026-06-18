public class Paquete {

    private int id;
    private String codigopostaldestino;

    public Paquete(int id, String codigopostaldestino) {
        this.id = id;
        this.codigopostaldestino = codigopostaldestino;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCodigopostaldestino() {
        return codigopostaldestino;
    }

    public void setCodigopostaldestino(String codigopostaldestino) {
        this.codigopostaldestino = codigopostaldestino;
    }
}