function CrearDepartamento(nombre, Departamentos){
    Departamentos.push(new Departamento(nombre))
}

function CrearCarrera(nombre, duracion, departamento, Carreras){
    Carreras.push(new Carrera(nombre, duracion, departamento))
}

function CrearProfesor(nombre, apellido, edad, departamento, Profesores){
    Profesores.push(new Profesor(nombre, apellido, edad, departamento))
}

function CrearMateria(nombre, creditos, Profesor, Materias){
    Materias.push(new Materia(nombre, creditos, Profesor))
}

function CrearEstudiante(nombre, apellido, edad, carrera, Estudiantes){
    Estudiantes.push(new Estudiante(nombre, apellido, edad, carrera))
}

function CrearMatricula(Estudiante, Materia, Matriculas){
    Matriculas.push(new Matricula(Estudiante, Materia))
}
function AgregarNota(Nota, Matricula){
    Matricula.Notas.push(Nota)
}


