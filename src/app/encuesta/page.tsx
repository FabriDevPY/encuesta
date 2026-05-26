"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, User, Droplet, Zap, Loader2, ArrowRight } from "lucide-react";

const CUIDADES_PARAGUAY = [
  "Asunción",
  "Ciudad del Este",
  "San Lorenzo",
  "Luque",
  "Capiatá",
  "Lambaré",
  "Fernando de la Mora",
  "Limpio",
  "Ñemby",
  "Encarnación",
  "Pedro Juan Caballero",
  "Villa Elisa",
  "Caaguazú",
  "Coronel Oviedo",
  "Mariano Roque Alonso",
  "Itauguá",
  "Villa Hayes",
  "Concepción",
  "Villarrica",
  "Pilar"
];

export default function EncuestaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State with 10 questions
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    ciudad: "Asunción",
    sexo: "",
    aguaGrifo: "",
    aguaDucha: "",
    aguaFugas: "",
    aguaReutilizacion: "",
    aguaRiego: "",
    energiaLuces: "",
    energiaLeds: "",
    energiaDesconectado: "",
    energiaTemperatura: "",
    energiaElectrodomesticos: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Complete validation
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
    } = formData;

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
      setError("Por favor, completa todas las preguntas del formulario.");
      return;
    }

    const parsedAge = parseInt(edad);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      setError("Por favor, introduce una edad válida (entre 1 y 120 años).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar la encuesta.");
      }

      // Success: redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al conectar con el servidor.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-2xl mb-4">
          <ClipboardList className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100">Encuesta de Hábitos de Consumo</h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          Tus respuestas son anónimas y nos ayudarán a consolidar estadísticas de concientización ambiental.
        </p>
      </div>

      {error && (
        <div className="bg-rose-950/30 border border-rose-900/50 text-rose-300 px-4 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección 1: Datos Personales */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2 pb-3 border-b border-zinc-800/50">
            <User className="h-5 w-5 text-emerald-400" />
            1. Datos Personales
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan"
                className="w-full px-4 py-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label htmlFor="apellido" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                required
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ej. Benítez"
                className="w-full px-4 py-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label htmlFor="edad" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Edad
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                required
                min="1"
                max="120"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ej. 22"
                className="w-full px-4 py-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label htmlFor="ciudad" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Ciudad (Paraguay)
              </label>
              <select
                id="ciudad"
                name="ciudad"
                required
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                {CUIDADES_PARAGUAY.map((city) => (
                  <option key={city} value={city} className="bg-zinc-950 text-zinc-100">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Sexo
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 text-sm text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="sexo"
                    required
                    checked={formData.sexo === "Masculino"}
                    onChange={() => handleRadioChange("sexo", "Masculino")}
                    className="h-4 w-4 text-emerald-500 focus:ring-emerald-500/20 border-zinc-800 bg-zinc-950"
                  />
                  <span>Masculino</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="sexo"
                    required
                    checked={formData.sexo === "Femenino"}
                    onChange={() => handleRadioChange("sexo", "Femenino")}
                    className="h-4 w-4 text-emerald-500 focus:ring-emerald-500/20 border-zinc-800 bg-zinc-950"
                  />
                  <span>Femenino</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Ahorro de Agua */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2 pb-3 border-b border-zinc-800/50">
            <Droplet className="h-5 w-5 text-blue-400" />
            2. Hábitos de Consumo de Agua
          </h2>

          <div className="space-y-6">
            {/* P1 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Con qué frecuencia cierra el grifo mientras se cepilla los dientes o lava los platos?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Siempre", "A veces", "Nunca"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("aguaGrifo", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.aguaGrifo === option
                        ? "bg-blue-950/40 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P2 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Cuánto tiempo duran sus duchas habitualmente?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Menos de 5 min", "5 a 10 min", "Más de 10 min"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("aguaDucha", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.aguaDucha === option
                        ? "bg-blue-950/40 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P3 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Controla periódicamente si hay fugas de agua en grifos o inodoros de su hogar?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Sí, regularmente", "Rara vez", "No lo hago"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("aguaFugas", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.aguaFugas === option
                        ? "bg-blue-950/40 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P4 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Reutiliza el agua en su hogar (por ejemplo, el agua del lavado de ropa o de lluvia)?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Sí, siempre", "A veces", "Nunca"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("aguaReutilizacion", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.aguaReutilizacion === option
                        ? "bg-blue-950/40 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P5 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿En qué horario realiza el riego de sus plantas o jardín?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Amanecer o atardecer", "A cualquier hora", "No tengo jardín"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("aguaRiego", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.aguaRiego === option
                        ? "bg-blue-950/40 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Ahorro de Energía */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2 pb-3 border-b border-zinc-800/50">
            <Zap className="h-5 w-5 text-amber-400" />
            3. Hábitos de Consumo de Energía
          </h2>

          <div className="space-y-6">
            {/* P6 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Apaga las luces y electrodomésticos cuando sale de una habitación?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Siempre", "A veces", "Nunca"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("energiaLuces", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.energiaLuces === option
                        ? "bg-amber-950/40 border-amber-500 text-amber-400 ring-2 ring-amber-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P7 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Utiliza bombillas de bajo consumo (LED) en su hogar?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Toda la casa", "Algunas habitaciones", "No utilizo"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("energiaLeds", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.energiaLeds === option
                        ? "bg-amber-950/40 border-amber-500 text-amber-400 ring-2 ring-amber-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P8 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Desconecta los electrodomésticos y cargadores que no está utilizando (evitando el consumo standby)?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Siempre", "A veces", "Nunca"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("energiaDesconectado", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.energiaDesconectado === option
                        ? "bg-amber-950/40 border-amber-500 text-amber-400 ring-2 ring-amber-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P9 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿A qué temperatura suele regular el aire acondicionado en días calurosos?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["24°C o más", "Menos de 24°C", "No tengo aire"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("energiaTemperatura", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.energiaTemperatura === option
                        ? "bg-amber-950/40 border-amber-500 text-amber-400 ring-2 ring-amber-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* P10 */}
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-3">
                ¿Prioriza la compra de electrodomésticos con etiqueta de eficiencia energética (Clase A o similar)?
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Sí, siempre", "A veces", "Nunca"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange("energiaElectrodomesticos", option)}
                    className={`py-3 px-4 text-sm font-medium border rounded-xl transition-all cursor-pointer ${
                      formData.energiaElectrodomesticos === option
                        ? "bg-amber-950/40 border-amber-500 text-amber-400 ring-2 ring-amber-500/20"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Enviando Encuesta...</span>
              </>
            ) : (
              <>
                <span>Guardar y Ver Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
