export const lugaresIniciales = [
  { id: "entrada", nombre: "Entrada principal", tipo: "Acceso", referencia: "Ingreso principal del campus" },
  { id: "biblioteca", nombre: "Biblioteca central", tipo: "Servicio", referencia: "Zona central del campus" },
  { id: "educacion", nombre: "Facultad de Educación", tipo: "Facultad", referencia: "Bloque académico" },
  { id: "energias", nombre: "Facultad de Energías Renovables", tipo: "Facultad", referencia: "Bloque académico de energías" },
  { id: "laboratorios", nombre: "Laboratorios de Computación", tipo: "Laboratorio", referencia: "Área de prácticas" },
  { id: "cafeteria", nombre: "Cafetería universitaria", tipo: "Servicio", referencia: "Zona de alimentación" },
  { id: "bienestar", nombre: "Bienestar Universitario", tipo: "Servicio", referencia: "Atención a estudiantes" },
  { id: "coliseo", nombre: "Coliseo universitario", tipo: "Deportivo", referencia: "Zona deportiva" }
];

export const caminosIniciales = [
  { id: "c1", origen: "entrada", destino: "biblioteca", distancia: 220, bloqueado: false },
  { id: "c2", origen: "entrada", destino: "educacion", distancia: 180, bloqueado: false },
  { id: "c3", origen: "biblioteca", destino: "energias", distancia: 140, bloqueado: false },
  { id: "c4", origen: "biblioteca", destino: "cafeteria", distancia: 120, bloqueado: false },
  { id: "c5", origen: "educacion", destino: "cafeteria", distancia: 150, bloqueado: false },
  { id: "c6", origen: "energias", destino: "laboratorios", distancia: 90, bloqueado: false },
  { id: "c7", origen: "cafeteria", destino: "laboratorios", distancia: 160, bloqueado: false },
  { id: "c8", origen: "cafeteria", destino: "bienestar", distancia: 130, bloqueado: false },
  { id: "c9", origen: "laboratorios", destino: "bienestar", distancia: 190, bloqueado: false },
  { id: "c10", origen: "bienestar", destino: "coliseo", distancia: 260, bloqueado: false }
];
