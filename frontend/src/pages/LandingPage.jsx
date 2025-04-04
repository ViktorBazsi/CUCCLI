import HowItWorks from "../components/HowItWorks";
import TestimonialSlider from "../components/TestimonialSlider";
import NextPerformance from "../components/NextPerformance";

export default function LandingPage() {
  return (
    <>
      <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-200 px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Fedezd fel a személyre szabott színházat
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            A CUCLI új szintre emeli az előadásélményt. Mondd el, mire vágysz,
            és mi megmutatjuk, mit nézz meg ma este!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-2xl text-base font-medium hover:bg-gray-800 transition">
              Kezdés
            </button>
            <button className="border border-black px-6 py-3 rounded-2xl text-base font-medium hover:bg-black hover:text-white transition">
              Böngéssz az archívumban
            </button>
          </div>
        </div>
      </main>

      <NextPerformance />
      <HowItWorks />
      <TestimonialSlider />
    </>
  );
}
