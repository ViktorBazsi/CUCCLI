import { ShoppingBag, Settings, PenTool, Users, Eye } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Megrendeled",
      icon: <ShoppingBag size={32} />,
      description: "Kiválasztod az élményt, amit kapni szeretnél.",
    },
    {
      title: "Összeállítod",
      icon: <Settings size={32} />,
      description: "Megadod a stílust, műfajt, szereplőket, és preferenciáidat.",
    },
    {
      title: "Megírjuk",
      icon: <PenTool size={32} />,
      description: "Íróink megalkotják a darabot, amit csak neked készítünk.",
    },
    {
      title: "Bepróbáljuk",
      icon: <Users size={32} />,
      description: "A színészek próbálják, a rendező rendezi, díszlet, kellékek, fény.",
    },
    {
      title: "Megnézed & haza viszed",
      icon: <Eye size={32} />,
      description: "Te és a barátaid eljöttök és megnézitek a ti, saját darabotokat.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-400 to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12 tracking-tight">
          Hogyan működik?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-700/30 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 flex flex-col items-center text-center basis-[260px] flex-grow max-w-xs transition hover:scale-105 hover:bg-gray-700/50"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
