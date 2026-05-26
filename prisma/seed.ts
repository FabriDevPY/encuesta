import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const surveys = [
  {
    nombre: "Juan",
    apellido: "Benítez",
    edad: 24,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "Siempre",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "A veces",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Toda la casa",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "María",
    apellido: "Giménez",
    edad: 21,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "Siempre",
    aguaDucha: "Menos de 5 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "Sí, siempre",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Carlos",
    apellido: "Ortiz",
    edad: 28,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "A veces",
    aguaDucha: "Más de 10 min",
    aguaFugas: "Rara vez",
    aguaReutilizacion: "Nunca",
    aguaRiego: "A cualquier hora",
    energiaLuces: "A veces",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "A veces",
    energiaTemperatura: "Menos de 24°C",
    energiaElectrodomesticos: "A veces"
  },
  {
    nombre: "Fátima",
    apellido: "Galeano",
    edad: 20,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "Siempre",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "A veces",
    aguaRiego: "No tengo jardín",
    energiaLuces: "Siempre",
    energiaLeds: "Toda la casa",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Derlis",
    apellido: "Ayala",
    edad: 35,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "Nunca",
    aguaDucha: "Más de 10 min",
    aguaFugas: "No lo hago",
    aguaReutilizacion: "Nunca",
    aguaRiego: "A cualquier hora",
    energiaLuces: "A veces",
    energiaLeds: "No utilizo",
    energiaDesconectado: "Nunca",
    energiaTemperatura: "Menos de 24°C",
    energiaElectrodomesticos: "Nunca"
  },
  {
    nombre: "Laura",
    apellido: "Ferreira",
    edad: 23,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "Siempre",
    aguaDucha: "Menos de 5 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "A veces",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Toda la casa",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Gustavo",
    apellido: "Cardozo",
    indigo: 19,
    edad: 19,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "A veces",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Rara vez",
    aguaReutilizacion: "Nunca",
    aguaRiego: "No tengo jardín",
    energiaLuces: "A veces",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "A veces",
    energiaTemperatura: "Menos de 24°C",
    energiaElectrodomesticos: "A veces"
  },
  {
    nombre: "Patricia",
    apellido: "Duarte",
    edad: 27,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "Siempre",
    aguaDucha: "Menos de 5 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "Sí, siempre",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Toda la casa",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "No tengo aire",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Ramón",
    apellido: "Gamarra",
    edad: 30,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "A veces",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Rara vez",
    aguaReutilizacion: "A veces",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "A veces",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "A veces"
  },
  {
    nombre: "Silvia",
    apellido: "Silvero",
    edad: 22,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "Siempre",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "A veces",
    aguaRiego: "No tengo jardín",
    energiaLuces: "Siempre",
    energiaLeds: "Toda la casa",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Hugo",
    apellido: "Almada",
    edad: 25,
    ciudad: "Asunción",
    sexo: "Masculino",
    aguaGrifo: "Siempre",
    aguaDucha: "Menos de 5 min",
    aguaFugas: "Sí, regularmente",
    aguaReutilizacion: "A veces",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "A veces",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "A veces",
    energiaTemperatura: "Menos de 24°C",
    energiaElectrodomesticos: "Sí, siempre"
  },
  {
    nombre: "Camila",
    apellido: "Bogado",
    edad: 26,
    ciudad: "Asunción",
    sexo: "Femenino",
    aguaGrifo: "A veces",
    aguaDucha: "5 a 10 min",
    aguaFugas: "Rara vez",
    aguaReutilizacion: "A veces",
    aguaRiego: "Amanecer o atardecer",
    energiaLuces: "Siempre",
    energiaLeds: "Algunas habitaciones",
    energiaDesconectado: "Siempre",
    energiaTemperatura: "24°C o más",
    energiaElectrodomesticos: "A veces"
  }
];

async function main() {
  console.log("Limpiando base de datos...");
  await prisma.survey.deleteMany({});
  
  console.log("Insertando datos iniciales...");
  for (const survey of surveys) {
    await prisma.survey.create({
      data: survey
    });
  }
  console.log("Seeding completado con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
