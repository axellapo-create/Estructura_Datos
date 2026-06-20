export class Carrito {
    constructor(productos = []) {
        this.productos = productos
    }

    agregarProducto(producto) {
        this.productos.push(producto)
    }
}