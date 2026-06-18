class Persona{
    constructor(nombre, apellido, edad){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
    }
}

class Estudiante extends Persona{
    constructor(nombre, apellido, edad, carrera){
        super(nombre, apellido, edad)
        this.carrera = carrera
    }
}

class Profesor extends Persona{
    constructor(nombre, apellido, edad, departamento){
        super(nombre, apellido, edad)
        this.departamento = departamento
    }
}

