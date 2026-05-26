import { Zap, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function EnergiaPage() {
  const tips = [
    {
      title: "Iluminación Inteligente",
      description: "Utiliza bombillas de bajo consumo (LED) en tu hogar. Consumen hasta un 80% menos electricidad y duran 10 veces más.",
      savings: "Ahorra ~80% de luz",
      detail: "Las bombillas incandescentes tradicionales transforman la mayor parte de la electricidad en calor y no en luz."
    },
    {
      title: "Control de Climatización",
      description: "Mantén el aire acondicionado a una temperatura recomendada de 24°C. Cada grado menos incrementa el consumo un 8%.",
      savings: "Optimiza ~8% por grado",
      detail: "Fijar temperaturas extremadamente bajas fuerza el motor del equipo de refrigeración, gastando más energía de la necesaria."
    },
    {
      title: "Evitar el Consumo Vampiro",
      description: "Desconecta cargadores, televisores y consolas de videojuegos si no los utilizas. El modo standby sigue consumiendo electricidad.",
      savings: "Reduce ~10% de factura",
      detail: "Los pequeños indicadores luminosos (LED rojos) y fuentes internas de poder sumadas representan un desperdicio constante."
    },
    {
      title: "Uso de Electrodomésticos",
      description: "Aprovecha la luz natural para tus actividades y organiza el uso de la plancha y la lavadora para evitar encendidos repetidos.",
      savings: "Uso racionalizado",
      detail: "Aparatos como la plancha o el horno eléctrico consumen altos niveles de potencia al momento de generar calor inicial."
    }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-orange-950/50 to-zinc-950 border border-amber-900/50 rounded-3xl p-8 sm:p-12 text-white shadow-lg mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <Zap className="h-6 w-6 text-amber-400 fill-amber-400/20" />
            </div>
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">Eficiencia Energética</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Ahorro de Energía: Eficiencia en el Hogar
          </h1>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            Optimizar el consumo eléctrico reduce significativamente la huella de carbono global y alivia directamente los gastos económicos domésticos.
          </p>
        </div>
      </div>

      {/* Grid: Context & Educational Info */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-400" />
            El impacto de nuestro consumo eléctrico
          </h2>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-4">
            <p>
              La energía que consumimos proviene de diversas fuentes. Aunque Paraguay es un gran productor de energía limpia e hidroeléctrica (a través de Itaipú y Yacyretá), gran parte de la energía global todavía se produce quemando combustibles fósiles, liberando toneladas de dióxido de carbono a la atmósfera.
            </p>
            <p>
              Además, el uso excesivo de electricidad tensiona la red de distribución eléctrica local, especialmente durante los meses calurosos de verano, provocando sobrecalentamiento de transformadores e interrupciones del servicio. La eficiencia energética consiste en mantener la misma calidad de vida pero consumiendo menos recursos mediante el uso inteligente y tecnologías de bajo consumo.
            </p>
          </div>

          <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-200">Sabías que...</h4>
              <p className="text-amber-300/80 text-xs mt-1 leading-relaxed">
                El &quot;consumo silencioso&quot; o standby de los electrodomésticos enchufados sin usar representa entre el 5% y el 10% del consumo de energía eléctrica de un hogar promedio. Desenchufarlos cuando sales de viaje es una práctica sumamente efectiva.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Fun stats */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 mb-4">La energía en cifras</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-amber-500/50 pl-4">
                <span className="text-2xl font-black text-amber-400">80%</span>
                <p className="text-zinc-500 text-xs">Menos energía consume una lámpara LED comparada con una incandescente.</p>
              </div>
              <div className="border-l-4 border-amber-500/50 pl-4">
                <span className="text-2xl font-black text-amber-400">24°C</span>
                <p className="text-zinc-500 text-xs">Es la temperatura recomendada para regular el acondicionador de aire.</p>
              </div>
              <div className="border-l-4 border-amber-500/50 pl-4">
                <span className="text-2xl font-black text-amber-400">10%</span>
                <p className="text-zinc-500 text-xs">De la factura de luz puede deberse al consumo en reposo (vampiro).</p>
              </div>
            </div>
          </div>
          <Link href="/encuesta" className="mt-8 block text-center py-3 bg-amber-950/40 hover:bg-amber-900/40 text-amber-400 text-xs font-semibold rounded-lg transition-colors border border-amber-500/10">
            Evalúa tus hábitos energéticos →
          </Link>
        </div>
      </div>

      {/* Practical Tips Grid */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Hábitos para un Consumo Eficiente
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-zinc-100">{tip.title}</h3>
                <span className="inline-block bg-amber-950/50 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-bold">
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
