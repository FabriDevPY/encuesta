import { Droplet, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AguaPage() {
  const tips = [
    {
      title: "Cepillado e Higiene",
      description: "Cierra el grifo mientras te cepillas los dientes o te afeitas. Esto puede ahorrar hasta 12 litros de agua por minuto.",
      savings: "Ahorra ~12 L / min",
      detail: "Un grifo abierto gasta agua inútilmente que termina directamente en el desagüe sin ser aprovechada."
    },
    {
      title: "Duchas Eficientes",
      description: "Intenta que tus duchas duren menos de 5 minutos. Disminuir el tiempo bajo la ducha ahorra decenas de litros de agua.",
      savings: "Ahorra ~80 L / ducha",
      detail: "Las duchas prolongadas son la principal fuente de desperdicio de agua potable en el ámbito doméstico."
    },
    {
      title: "Detección de Fugas",
      description: "Revisa periódicamente inodoros y grifos. Una gotera persistente puede acumular pérdidas enormes de agua al mes.",
      savings: "Evita perder ~30 L / día",
      detail: "Un simple goteo silencioso en el inodoro puede desperdiciar miles de litros al año si no se repara a tiempo."
    },
    {
      title: "Limpieza y Lavado",
      description: "Utiliza la lavadora solo con cargas completas y limpia el auto usando baldes en lugar de manguera abierta.",
      savings: "Ahorra hasta un 50% de agua",
      detail: "El uso incontrolado de la manguera para limpieza de patios o vehículos gasta más agua de la requerida."
    }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-blue-950/80 via-cyan-950/50 to-zinc-950 border border-blue-900/50 rounded-3xl p-8 sm:p-12 text-white shadow-lg mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-400 fill-blue-400/20" />
            </div>
            <span className="text-blue-300 font-bold text-xs uppercase tracking-wider">Recurso Vital</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            El Ahorro del Agua: Garantía de Vida
          </h1>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            El agua es un recurso finito y esencial. Pequeños cambios de comportamiento en nuestras actividades diarias pueden generar una diferencia sustancial en su conservación.
          </p>
        </div>
      </div>

      {/* Grid: Context & Educational Info */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            ¿Por qué debemos cuidar el agua dulce?
          </h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-4">
            <p>
              Aunque la Tierra está cubierta mayormente de agua, <strong>solo el 2.5% es agua dulce</strong>, y la mayor parte de ella se encuentra congelada en glaciares y capas de hielo. El agua verdaderamente disponible para el consumo humano representa menos del 1% del total mundial.
            </p>
            <p>
              El crecimiento demográfico, la urbanización y el cambio climático están ejerciendo una presión sin precedentes sobre nuestras fuentes de agua. Cuidar el agua no solo disminuye el costo de la facturación mensual, sino que resguarda la disponibilidad del servicio para las comunidades vecinas y preserva los ecosistemas acuáticos.
            </p>
          </div>

          <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-200">Sabías que...</h4>
              <p className="text-blue-300/80 text-xs mt-1 leading-relaxed">
                Una ducha de 10 minutos con grifo convencional consume aproximadamente 150 a 200 litros de agua limpia. Si reduces la ducha a la mitad, estás ahorrando el equivalente al consumo de hidratación de una persona durante un mes entero.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Fun stats */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 mb-4">El agua en cifras</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500/50 pl-4">
                <span className="text-2xl font-black text-blue-400">2.5%</span>
                <p className="text-zinc-500 text-xs">Del agua del planeta es agua dulce.</p>
              </div>
              <div className="border-l-4 border-blue-500/50 pl-4">
                <span className="text-2xl font-black text-blue-400">1%</span>
                <p className="text-zinc-500 text-xs">Es accesible para consumo directo.</p>
              </div>
              <div className="border-l-4 border-blue-500/50 pl-4">
                <span className="text-2xl font-black text-blue-400">120 L</span>
                <p className="text-zinc-500 text-xs">Promedio consumido por persona por día en tareas de higiene básica.</p>
              </div>
            </div>
          </div>
          <Link href="/encuesta" className="mt-8 block text-center py-3 bg-blue-950/40 hover:bg-blue-900/40 text-blue-400 text-xs font-semibold rounded-lg transition-colors border border-blue-500/10">
            Evalúa tus hábitos de agua →
          </Link>
        </div>
      </div>

      {/* Practical Tips Grid */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Consejos Prácticos de Ahorro
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-zinc-100">{tip.title}</h3>
                <span className="inline-block bg-blue-950/50 text-blue-400 border border-blue-500/30 text-xs px-2.5 py-1 rounded-full font-bold">
                  {tip.savings}
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {tip.description}
              </p>
              <div className="text-xs text-zinc-400 bg-zinc-950/60 p-3 rounded-lg border border-zinc-900/80">
                <strong>Detalle técnico:</strong> {tip.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
