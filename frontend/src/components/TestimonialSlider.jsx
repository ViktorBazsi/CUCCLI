import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Márta K.",
    message:
      "A CUCLI előadás valóban olyan volt, mintha nekem írták volna. Elképesztő élmény!",
    date: "2025. március 12.",
    title: "Képzelt Város",
  },
  {
    name: "Gergő P.",
    message:
      "Személyre szabott, megható és humoros — ilyet még nem láttam. Csak ajánlani tudom.",
    date: "2025. február 28.",
    title: "A Tükör Másik Oldalán",
  },
  {
    name: "Nóra L.",
    message:
      "Mint egy terápiás színházélmény. A saját történetem visszhangzott a színpadon.",
    date: "2025. január 15.",
    title: "Monológok egy padlásról",
  },
  {
    name: "Ákos D.",
    message:
      "Megérkeztem, és mintha már ismertek volna. A darab nekem szólt, rólam szólt.",
    date: "2024. december 9.",
    title: "El nem mondott történetek",
  },
  {
    name: "Zsófi M.",
    message:
      "A színészek elképesztően rezonáltak rám. Ez nem csak színház, ez élmény.",
    date: "2024. november 22.",
    title: "Buborékban",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // váltás 5 másodpercenként
    return () => clearInterval(timer);
  }, []);

  const { name, message, date, title } = testimonials[index];

  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">
          Nézőink és megrendelőink mondták
        </h2>
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-500">
          <p className="text-lg italic mb-6">“{message}”</p>
          <div className="text-sm text-gray-400">
            <p className="font-semibold">{name}</p>
            <p>
              {title} – {date}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
