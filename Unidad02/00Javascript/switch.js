let expr = "mangos"

switch (expr){
    case "mangos":
        console.log("los mangos cuestan $1")
        break;

    case "naraja":
        console.log("las narajas estan 10x$1")
        break;

    case "manzana":
        console.log("las manzanas estan 5x$1")
        
    default:
        console.log(`Lo sentimos con contamos con ${expr}`)
        break;
}

console.log("Quieres comprar algo adicional?")