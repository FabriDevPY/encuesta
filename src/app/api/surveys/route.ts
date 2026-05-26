import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Survey = Awaited<ReturnType<typeof prisma.survey.findMany>>[number];

// Map responses to scores for overall percentage calculations
const scoreMap: Record<string, number> = {
  // General standard values
  "Siempre": 100,
  "A veces": 50,
  "Nunca": 0,
  "Sí, siempre": 100,

  // Agua Ducha
  "Menos de 5 min": 100,
  "5 a 10 min": 50,
  "Más de 10 min": 0,

  // Agua Fugas
  "Sí, regularmente": 100,
  "Rara vez": 50,
  "No lo hago": 0,

  // Agua Riego
  "Amanecer o atardecer": 100,
  "A cualquier hora": 0,
  "No tengo jardín": 100,

  // Energía Leds
  "Toda la casa": 100,
  "Algunas habitaciones": 50,
  "No utilizo": 0,

  // Energía Temperatura
  "24°C o más": 100,
  "Menos de 24°C": 0,
  "No tengo aire": 100,
};

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (surveys.length === 0) {
      return NextResponse.json({
        totalSurveys: 0,
        averageAge: 0,
        waterSavingPct: 0,
        energySavingPct: 0,
        charts: {
          sexo: [],
          aguaGrifo: [],
          aguaDucha: [],
          aguaFugas: [],
          aguaReutilizacion: [],
          aguaRiego: [],
          energiaLuces: [],
          energiaLeds: [],
          energiaDesconectado: [],
          energiaTemperatura: [],
          energiaElectrodomesticos: [],
        },
      });
    }

    const totalSurveys = surveys.length;
    
    // Average age
    const totalAge = surveys.reduce((acc: number, curr: Survey) => acc + curr.edad, 0);
    const averageAge = parseFloat((totalAge / totalSurveys).toFixed(1));

    // Calculate saving percentages based on scores (5 water, 5 energy)
    let totalWaterScore = 0;
    let totalEnergyScore = 0;

    surveys.forEach((s: Survey) => {
      const wGrifo = scoreMap[s.aguaGrifo] ?? 0;
      const wDucha = scoreMap[s.aguaDucha] ?? 0;
      const wFugas = scoreMap[s.aguaFugas] ?? 0;
      const wReutilizacion = scoreMap[s.aguaReutilizacion] ?? 0;
      const wRiego = scoreMap[s.aguaRiego] ?? 0;
      totalWaterScore += (wGrifo + wDucha + wFugas + wReutilizacion + wRiego) / 5;

      const eLuces = scoreMap[s.energiaLuces] ?? 0;
      const eLeds = scoreMap[s.energiaLeds] ?? 0;
      const eDesconectado = scoreMap[s.energiaDesconectado] ?? 0;
      const eTemperatura = scoreMap[s.energiaTemperatura] ?? 0;
      const eElectrodomesticos = scoreMap[s.energiaElectrodomesticos] ?? 0;
      totalEnergyScore += (eLuces + eLeds + eDesconectado + eTemperatura + eElectrodomesticos) / 5;
    });

    const waterSavingPct = Math.round(totalWaterScore / totalSurveys);
    const energySavingPct = Math.round(totalEnergyScore / totalSurveys);

    // Aggregate counts for charts
    const counts = {
      sexo: { Masculino: 0, Femenino: 0 },
      aguaGrifo: { Siempre: 0, "A veces": 0, Nunca: 0 },
      aguaDucha: { "Menos de 5 min": 0, "5 a 10 min": 0, "Más de 10 min": 0 },
      aguaFugas: { "Sí, regularmente": 0, "Rara vez": 0, "No lo hago": 0 },
      aguaReutilizacion: { "Sí, siempre": 0, "A veces": 0, Nunca: 0 },
      aguaRiego: { "Amanecer o atardecer": 0, "A cualquier hora": 0, "No tengo jardín": 0 },
      energiaLuces: { Siempre: 0, "A veces": 0, Nunca: 0 },
      energiaLeds: { "Toda la casa": 0, "Algunas habitaciones": 0, "No utilizo": 0 },
      energiaDesconectado: { Siempre: 0, "A veces": 0, Nunca: 0 },
      energiaTemperatura: { "24°C o más": 0, "Menos de 24°C": 0, "No tengo aire": 0 },
      energiaElectrodomesticos: { "Sí, siempre": 0, "A veces": 0, Nunca: 0 },
    };

    surveys.forEach((s: Survey) => {
      // Sexo
      if (s.sexo === "Masculino" || s.sexo === "Femenino") {
        counts.sexo[s.sexo]++;
      }
      // Agua Grifo
      if (s.aguaGrifo in counts.aguaGrifo) {
        counts.aguaGrifo[s.aguaGrifo as keyof typeof counts.aguaGrifo]++;
      }
      // Agua Ducha
      if (s.aguaDucha in counts.aguaDucha) {
        counts.aguaDucha[s.aguaDucha as keyof typeof counts.aguaDucha]++;
      }
      // Agua Fugas
      if (s.aguaFugas in counts.aguaFugas) {
        counts.aguaFugas[s.aguaFugas as keyof typeof counts.aguaFugas]++;
      }
      // Agua Reutilizacion
      if (s.aguaReutilizacion in counts.aguaReutilizacion) {
        counts.aguaReutilizacion[s.aguaReutilizacion as keyof typeof counts.aguaReutilizacion]++;
      }
      // Agua Riego
      if (s.aguaRiego in counts.aguaRiego) {
        counts.aguaRiego[s.aguaRiego as keyof typeof counts.aguaRiego]++;
      }
      // Energía Luces
      if (s.energiaLuces in counts.energiaLuces) {
        counts.energiaLuces[s.energiaLuces as keyof typeof counts.energiaLuces]++;
      }
      // Energía Leds
      if (s.energiaLeds in counts.energiaLeds) {
        counts.energiaLeds[s.energiaLeds as keyof typeof counts.energiaLeds]++;
      }
      // Energía Desconectado
      if (s.energiaDesconectado in counts.energiaDesconectado) {
        counts.energiaDesconectado[s.energiaDesconectado as keyof typeof counts.energiaDesconectado]++;
      }
      // Energía Temperatura
      if (s.energiaTemperatura in counts.energiaTemperatura) {
        counts.energiaTemperatura[s.energiaTemperatura as keyof typeof counts.energiaTemperatura]++;
      }
      // Energía Electrodomesticos
      if (s.energiaElectrodomesticos in counts.energiaElectrodomesticos) {
        counts.energiaElectrodomesticos[s.energiaElectrodomesticos as keyof typeof counts.energiaElectrodomesticos]++;
      }
    });

    // Format chart data for Recharts (array of { name, value })
    const chartData = {
      sexo: Object.entries(counts.sexo).map(([name, value]: [string, number]) => ({ name, value })),
      aguaGrifo: Object.entries(counts.aguaGrifo).map(([name, value]: [string, number]) => ({ name, value })),
      aguaDucha: Object.entries(counts.aguaDucha).map(([name, value]: [string, number]) => ({ name, value })),
      aguaFugas: Object.entries(counts.aguaFugas).map(([name, value]: [string, number]) => ({ name, value })),
      aguaReutilizacion: Object.entries(counts.aguaReutilizacion).map(([name, value]: [string, number]) => ({ name, value })),
      aguaRiego: Object.entries(counts.aguaRiego).map(([name, value]: [string, number]) => ({ name, value })),
      energiaLuces: Object.entries(counts.energiaLuces).map(([name, value]: [string, number]) => ({ name, value })),
      energiaLeds: Object.entries(counts.energiaLeds).map(([name, value]: [string, number]) => ({ name, value })),
      energiaDesconectado: Object.entries(counts.energiaDesconectado).map(([name, value]: [string, number]) => ({ name, value })),
      energiaTemperatura: Object.entries(counts.energiaTemperatura).map(([name, value]: [string, number]) => ({ name, value })),
      energiaElectrodomesticos: Object.entries(counts.energiaElectrodomesticos).map(([name, value]: [string, number]) => ({ name, value })),
    };

    return NextResponse.json({
      totalSurveys,
      averageAge,
      waterSavingPct,
      energySavingPct,
      charts: chartData,
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar las estadísticas." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre,
      apellido,
      edad,
      ciudad,
      sexo,
      aguaGrifo,
      aguaDucha,
      aguaFugas,
      aguaReutilizacion,
      aguaRiego,
      energiaLuces,
      energiaLeds,
      energiaDesconectado,
      energiaTemperatura,
      energiaElectrodomesticos,
    } = body;

    // Simple validation for all fields
    if (
      !nombre ||
      !apellido ||
      !edad ||
      !ciudad ||
      !sexo ||
      !aguaGrifo ||
      !aguaDucha ||
      !aguaFugas ||
      !aguaReutilizacion ||
      !aguaRiego ||
      !energiaLuces ||
      !energiaLeds ||
      !energiaDesconectado ||
      !energiaTemperatura ||
      !energiaElectrodomesticos
    ) {
      return NextResponse.json(
        { error: "Todos los campos de la encuesta son obligatorios." },
        { status: 400 }
      );
    }

    const parsedAge = parseInt(edad);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      return NextResponse.json(
        { error: "Por favor, ingresa una edad válida." },
        { status: 400 }
      );
    }

    // Save in DB using Prisma
    const newSurvey = await prisma.survey.create({
      data: {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        edad: parsedAge,
        ciudad,
        sexo,
        aguaGrifo,
        aguaDucha,
        aguaFugas,
        aguaReutilizacion,
        aguaRiego,
        energiaLuces,
        energiaLeds,
        energiaDesconectado,
        energiaTemperatura,
        energiaElectrodomesticos,
      },
    });

    return NextResponse.json({ success: true, surveyId: newSurvey.id });
  } catch (error) {
    console.error("Error creating survey:", error);
    return NextResponse.json(
      { error: "Error al guardar la encuesta en la base de datos." },
      { status: 500 }
    );
  }
}
