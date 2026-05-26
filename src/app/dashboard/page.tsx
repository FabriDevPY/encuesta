"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Calendar, Droplet, Zap, Loader2, RefreshCw, Layers } from "lucide-react";

interface ChartItem {
  name: string;
  value: number;
}

interface DashboardData {
  totalSurveys: number;
  averageAge: number;
  waterSavingPct: number;
  energySavingPct: number;
  charts: {
    sexo: ChartItem[];
    aguaGrifo: ChartItem[];
    aguaDucha: ChartItem[];
    aguaFugas: ChartItem[];
    aguaReutilizacion: ChartItem[];
    aguaRiego: ChartItem[];
    energiaLuces: ChartItem[];
    energiaLeds: ChartItem[];
    energiaDesconectado: ChartItem[];
    energiaTemperatura: ChartItem[];
    energiaElectrodomesticos: ChartItem[];
  };
}

// Color palettes for dark mode Recharts
const GENDER_COLORS = ["#0ea5e9", "#10b981"]; // Blue-500, Emerald-500
const WATER_COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"]; // Blue palette
const ENERGY_COLORS = ["#f59e0b", "#fbbf24", "#fef08a"]; // Amber/Yellow palette

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Active question tabs
  type WaterChartKey = "aguaGrifo" | "aguaDucha" | "aguaFugas" | "aguaReutilizacion" | "aguaRiego";
  type EnergyChartKey = "energiaLuces" | "energiaLeds" | "energiaDesconectado" | "energiaTemperatura" | "energiaElectrodomesticos";

  const [activeWaterKey, setActiveWaterKey] = useState<WaterChartKey>("aguaGrifo");
  const [activeEnergyKey, setActiveEnergyKey] = useState<EnergyChartKey>("energiaLeds");

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/surveys");
      if (!response.ok) {
        throw new Error("No se pudieron cargar las estadísticas.");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error de red.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const waterQuestionsConfig = {
    aguaGrifo: {
      label: "Grifo Cerrado",
      title: "Cerrar el grifo al lavarse/limpiar",
      desc: "Frecuencia con la que se cierra el grifo durante el cepillado de dientes o lavado de vajilla.",
    },
    aguaDucha: {
      label: "Duración Ducha",
      title: "Duración habitual de duchas",
      desc: "Distribución del tiempo aproximado utilizado en bañarse.",
    },
    aguaFugas: {
      label: "Control de Fugas",
      title: "Control de pérdidas en tuberías",
      desc: "Frecuencia de inspección de fugas en canillas, inodoros o grifería del hogar.",
    },
    aguaReutilizacion: {
      label: "Reutilización",
      title: "Reutilización de agua en casa",
      desc: "Hábitos de recolección y uso secundario de agua (ej. desagüe de lavarropas o lluvia).",
    },
    aguaRiego: {
      label: "Horarios Riego",
      title: "Horario de riego de plantas",
      desc: "Planificación horaria del riego para evitar la evaporación rápida en días soleados.",
    },
  };

  const energyQuestionsConfig = {
    energiaLuces: {
      label: "Apagar Luces",
      title: "Apagado de luces sin usar",
      desc: "Hábito de apagar la iluminación y electrodomésticos en habitaciones vacías.",
    },
    energiaLeds: {
      label: "Focos LED",
      title: "Implementación de bombillas LED",
      desc: "Uso general de lámparas de bajo consumo (LED) en el domicilio de los encuestados.",
    },
    energiaDesconectado: {
      label: "Consumo Vampiro",
      title: "Desconexión de consumo pasivo",
      desc: "Frecuencia con la que se desenchufan cargadores o equipos no utilizados.",
    },
    energiaTemperatura: {
      label: "A/C a 24°C+",
      title: "Acondicionador de aire a 24°C o más",
      desc: "Regulación de temperatura eficiente de acondicionadores en épocas de calor.",
    },
    energiaElectrodomesticos: {
      label: "Electrodomésticos",
      title: "Foco en eficiencia Clase A",
      desc: "Preferencia de compra de electrodomésticos con certificación energética.",
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <p className="text-zinc-400 text-sm">Cargando estadísticas consolidadas del proyecto...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 p-6 rounded-2xl max-w-md mx-auto">
          <p className="font-bold">Error al cargar datos</p>
          <p className="text-sm mt-1">{error || "Inténtalo de nuevo más tarde."}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-zinc-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 mx-auto cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100">Panel de Resultados (Dashboard)</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Análisis consolidado de hábitos de consumo basado en las 10 preguntas reales evaluadas.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center space-x-1.5 px-4 py-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer bg-zinc-950/50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Actualizar Datos</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {/* KPI 1 */}
        <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Encuestas
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              {data.totalSurveys}
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-zinc-950/60 text-zinc-300 border border-zinc-800 rounded-xl">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Promedio Edad
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              {data.averageAge} <span className="text-xs font-normal text-zinc-500">años</span>
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-950/40 text-blue-400 border border-blue-500/20 rounded-xl">
            <Droplet className="h-6 w-6 fill-blue-500/10" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Eficiencia Agua
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
              {data.waterSavingPct}%
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-950/40 text-amber-400 border border-amber-500/20 rounded-xl">
            <Zap className="h-6 w-6 fill-amber-500/10" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Eficiencia Energía
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {data.energySavingPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Area with interactive Tabs */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 1: Water habits (Interactive Tabs) */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Droplet className="h-4.5 w-4.5 text-blue-400 fill-blue-500/10" />
                Hábitos de Ahorro de Agua
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 px-2 py-0.5 bg-blue-950/50 rounded border border-blue-500/20 flex items-center gap-1">
                <Layers className="h-3 w-3" /> 5 Variables
              </span>
            </div>

            {/* Sub-tabs selector for Water */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(waterQuestionsConfig).map(([key, config]: [string, { label: string; title: string; desc: string }]) => (
                <button
                  key={key}
                  onClick={() => setActiveWaterKey(key as WaterChartKey)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer font-medium border ${
                    activeWaterKey === key
                      ? "bg-blue-950/50 border-blue-500/30 text-blue-400 shadow-sm"
                      : "border-zinc-850 bg-zinc-950/10 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>

            {/* Sub-question detail block */}
            <div className="mb-6 p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
              <h4 className="text-sm font-bold text-zinc-200">{waterQuestionsConfig[activeWaterKey].title}</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{waterQuestionsConfig[activeWaterKey].desc}</p>
            </div>

            <div className="h-60 mt-2">
              {mounted && data.charts[activeWaterKey] && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.charts[activeWaterKey]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#09090b",
                        borderColor: "#27272a",
                        borderRadius: "0.75rem",
                        color: "#f4f4f5",
                        fontSize: "12px",
                      }}
                      cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                    />
                    <Bar dataKey="value" name="Respuestas" radius={[8, 8, 0, 0]}>
                      {data.charts[activeWaterKey].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={WATER_COLORS[index % WATER_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 text-center mt-4 border-t border-zinc-850/50 pt-3">
            El gráfico se actualiza dinámicamente al seleccionar otra pregunta de ahorro de agua arriba.
          </p>
        </div>

        {/* Chart 2: Energy habits (Interactive Tabs) */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-amber-400 fill-amber-500/10" />
                Hábitos de Eficiencia Energética
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2 py-0.5 bg-amber-950/50 rounded border border-amber-500/20 flex items-center gap-1">
                <Layers className="h-3 w-3" /> 5 Variables
              </span>
            </div>

            {/* Sub-tabs selector for Energy */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(energyQuestionsConfig).map(([key, config]: [string, { label: string; title: string; desc: string }]) => (
                <button
                  key={key}
                  onClick={() => setActiveEnergyKey(key as EnergyChartKey)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer font-medium border ${
                    activeEnergyKey === key
                      ? "bg-amber-950/50 border-amber-500/30 text-amber-400 shadow-sm"
                      : "border-zinc-850 bg-zinc-950/10 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>

            {/* Sub-question detail block */}
            <div className="mb-6 p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
              <h4 className="text-sm font-bold text-zinc-200">{energyQuestionsConfig[activeEnergyKey].title}</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{energyQuestionsConfig[activeEnergyKey].desc}</p>
            </div>

            <div className="h-60 mt-2">
              {mounted && data.charts[activeEnergyKey] && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.charts[activeEnergyKey]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#09090b",
                        borderColor: "#27272a",
                        borderRadius: "0.75rem",
                        color: "#f4f4f5",
                        fontSize: "12px",
                      }}
                      cursor={{ fill: "rgba(245, 158, 11, 0.05)" }}
                    />
                    <Bar dataKey="value" name="Respuestas" radius={[8, 8, 0, 0]}>
                      {data.charts[activeEnergyKey].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ENERGY_COLORS[index % ENERGY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 text-center mt-4 border-t border-zinc-850/50 pt-3">
            El gráfico se actualiza dinámicamente al seleccionar otra pregunta de ahorro de energía arriba.
          </p>
        </div>
      </div>

      {/* Chart 3: Gender breakdown */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl shadow-sm">
        <h3 className="text-base font-bold text-zinc-100 mb-6 flex items-center gap-2">
          <Users className="h-4.5 w-4.5 text-emerald-400" />
          Distribución por Sexo de los Participantes
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
          <div className="h-48 w-48">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.charts.sexo}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.charts.sexo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      borderColor: "#27272a",
                      borderRadius: "0.75rem",
                      color: "#f4f4f5",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          {/* Chart Legend */}
          <div className="space-y-4 grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-2">
            {data.charts.sexo.map((item, index) => {
              const total = data.totalSurveys;
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
              return (
                <div key={item.name} className="flex items-center space-x-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: GENDER_COLORS[index % GENDER_COLORS.length] }}
                  />
                  <div>
                    <span className="text-sm font-semibold text-zinc-200">{item.name}</span>
                    <span className="text-xs text-zinc-500 block">
                      {item.value} {item.value === 1 ? "persona" : "personas"} ({pct}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
