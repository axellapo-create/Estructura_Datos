import { Carrito } from "./clase-carrito.js"
import { Producto } from "./clase-producto.js"
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function preguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, respuesta => {
            resolve(respuesta)
        })
    })
}

const car = new Carrito()

const producto1 = new Producto("limon", 1, 500)
const producto2 = new Producto("aguacate", 0.5, 20)
const producto3 = new Producto("naranja", 1, 200)

console.log("----- Lista de productos -----")
console.log(`1 - ${producto1.nombre} - $${producto1.precio} - Stock: ${producto1.stock}`)
console.log(`2 - ${producto2.nombre} - $${producto2.precio} - Stock: ${producto2.stock}`)
console.log(`3 - ${producto3.nombre} - $${producto3.precio} - Stock: ${producto3.stock}`)

function agregarOActualizarProducto(productoNuevo) {
    const productoExistente = car.productos.find(p => p.nombre === productoNuevo.nombre)
    
    if (productoExistente) {
        productoExistente.cantidad += productoNuevo.cantidad
    } else {
        car.agregarProducto(productoNuevo)
    }
}

// Función para calcular el total
function calcularTotal() {
    return car.productos.reduce((total, p) => total + (p.precio * p.cantidad), 0)
}

async function main() {

    let continuar = true

    while (continuar) {

        const input = parseInt(await preguntar("Producto (1-3) o 0 para salir: "))

        switch (input) {

            case 1:
                if (producto1.stock >= 20) {
                    const nuevoProducto1 = new Producto(producto1.nombre, producto1.precio, producto1.stock)
                    nuevoProducto1.cantidad = 20
                    producto1.stock -= 20
                    agregarOActualizarProducto(nuevoProducto1)
                    console.log(`✓ Agregado: ${nuevoProducto1.nombre} - Cantidad: ${nuevoProducto1.cantidad}\n`)
                } else {
                    console.log(`✗ Stock insuficiente de ${producto1.nombre}\n`)
                }
                break

            case 2:
                if (producto2.stock >= 1) {
                    const nuevoProducto2 = new Producto(producto2.nombre, producto2.precio, producto2.stock)
                    nuevoProducto2.cantidad = 1
                    producto2.stock -= 1
                    agregarOActualizarProducto(nuevoProducto2)
                    console.log(`✓ Agregado: ${nuevoProducto2.nombre} - Cantidad: ${nuevoProducto2.cantidad}\n`)
                } else {
                    console.log(`✗ Stock insuficiente de ${producto2.nombre}\n`)
                }
                break

            case 3:
                if (producto3.stock >= 10) {
                    const nuevoProducto3 = new Producto(producto3.nombre, producto3.precio, producto3.stock)
                    nuevoProducto3.cantidad = 10
                    producto3.stock -= 10
                    agregarOActualizarProducto(nuevoProducto3)
                    console.log(`✓ Agregado: ${nuevoProducto3.nombre} - Cantidad: ${nuevoProducto3.cantidad}\n`)
                } else {
                    console.log(`✗ Stock insuficiente de ${producto3.nombre}\n`)
                }
                break

            case 0:
                continuar = false
                rl.close()
                break
        }
    }

    console.log("----- Carrito -----")

    for (let p of car.productos) {
        const subtotal = p.precio * p.cantidad
        console.log(`${p.nombre} - Cantidad: ${p.cantidad} - Precio unitario: $${p.precio} - Subtotal: $${subtotal}`)
    }

    const total = calcularTotal()
    console.log(`\n----- TOTAL: $${total} -----`)
}

main()