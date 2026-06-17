const numeroSecreto = Math.floor(Math.random()*10);
let numeroJugador
let ganaste = false
while (!ganaste){
numeroJugador = parseInt(prompt("Adivina el numero secreto entre el 1 al 10:"));
console.log(`Este es el numero con el que juegas ${numeroJugador}`);

if (numeroJugador === numeroSecreto){
    console.log("FELICIDADES, GANASTE!!")
    ganaste = true
} else if (numeroJugador < numeroSecreto){
    console.log("tu numero es menor!!! intenta nuevamente")
} else {
    console.log("tu numero es mayor!!! intenta nuevamente")
} 
}