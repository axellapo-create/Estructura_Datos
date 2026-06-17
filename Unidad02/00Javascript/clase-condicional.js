//Condicionales
// if

let edad = 18

if(edad>=18){
    console.log("Eres mayor de edad")
}

//if...else

let Edad = 17

if(edad>=18){
    console.log("Eres mayor de edad")
    }else{
        console.log("Eres menor de edad")
    }

//if...else if...else

let nota = 85

if(nota>=90){
    console.log("Exelente")
}else if(nota>=70){
        console.log("Aprobado")
}else{
    console.log("Reprobado")
}

//switch

let dia = 3

switch (dia){
    case 1:
        console.log("Lunes")
        break
    case 2:
        console.log("Martes")
        break
    case 3:
        console.log("Miercoles")
        break
    case 4:
        console.log("Jueves")
        break
    case 5:
        console.log("Viernes")
        break
    case 6:
        console.log("Sabado")
        break
    case 7:
        console.log("Domingo")
        break
    default:
        console.log("Dia inválido")
        break
    }

// ? operador terniario

let edad = 20

let mensaje = (edad>=18) ? "Eres mayor de edad" : "Eres menor de edad"
console.log(mensaje)

//Condicionales en clase
let nombre = "Fernando"

if (nombre === "Fernando"){
    console.log("Hola Fer")
} else if (nombre === "Cristian"){
    console.log("hola Cris")
} else {
    console.log("No encontre tu nombre")
}