import Link from "next/link";
import { Droplet, Zap, ClipboardList, BarChart3, BookOpen, Lightbulb, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-cyan-950/60 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900/50 shadow-inner">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-6 uppercase tracking-wider">
            Proyecto Académico Universitario
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Concientización sobre el Ahorro de{" "}
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              Agua y Energía
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Colabora con nuestra investigación universitaria completando la encuesta de consumo y descubre hábitos eficientes para cuidar nuestro planeta.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/encuesta"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full shadow-lg shadow-emerald-500/10 hover:shadow-emerald-400/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <ClipboardList className="h-5 w-5" />
              <span>Realizar Encuesta</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-full border border-zinc-800 backdrop-blur-sm transition-all duration-300"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Ver Estadísticas</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Objectives Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-zinc-100">Objetivos del Proyecto</h2>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base">
            EcoVida es un esfuerzo universitario enfocado en diagnosticar el nivel de concienciación y fomentar el consumo racional de recursos vitales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/80 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 bg-blue-950/50 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3">Educación Ambiental</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Divulgar información clara y sustentable sobre la escasez hídrica y la huella de carbono, brindando recursos y consejos de fácil aplicación cotidiana.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/80 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3">Diagnóstico y Medición</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Recopilar datos estadísticos locales a través de nuestra encuesta para entender el comportamiento habitual del uso del agua y consumo eléctrico.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/80 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 bg-amber-950/50 text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3">Propuestas de Mejora</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Promover el paso de bombillas tradicionales a tecnologías LED y optimizar las rutinas cotidianas de higiene personal para disminuir el gasto innecesario.
            </p>
          </div>
        </div>
      </section>

      {/* Info Split Section */}
      <section className="bg-zinc-900/10 py-16 border-t border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Contexto de la Investigación</span>
            <h2 className="text-3xl font-extrabold text-zinc-100 mt-2 mb-6">
              ¿Por qué es importante medir nuestro consumo?
            </h2>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
              <p>
                El acceso al agua potable y la generación de energía eléctrica demandan procesos que impactan directamente el ecosistema global. En Paraguay, a pesar de poseer una gran riqueza hídrica e hidroeléctrica, el desperdicio en los hogares sigue representando un desafío ambiental y económico importante.
              </p>
              <p>
                Al participar en esta encuesta corta de solo 10 preguntas clave sobre tus hábitos, ayudas a los estudiantes a generar un mapa estadístico local útil para planificar futuras iniciativas de sensibilización comunitaria.
              </p>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-zinc-300 text-xs">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>100% Anónimo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Uso Estrictamente Académico</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/15 border border-blue-500/20 p-6 rounded-2xl text-center">
              <Droplet className="h-10 w-10 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-blue-200">Agua</h4>
              <p className="text-blue-300/80 text-xs mt-1">Conoce prácticas de ahorro en el baño, la cocina y el lavado.</p>
              <Link href="/agua" className="text-blue-400 hover:text-blue-300 text-xs font-semibold mt-4 inline-block hover:underline">
                Saber más →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/15 border border-amber-500/20 p-6 rounded-2xl text-center">
              <Zap className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-amber-200">Energía</h4>
              <p className="text-amber-300/80 text-xs mt-1">Descubre cómo reducir la facturación y la huella de carbono.</p>
              <Link href="/energia" className="text-amber-400 hover:text-amber-300 text-xs font-semibold mt-4 inline-block hover:underline">
                Saber más →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
