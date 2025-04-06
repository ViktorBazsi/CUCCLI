import { Facebook, Instagram } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
      {/* Logó rész */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/apertura-logo.png" // helyettesítsd saját logóddal
          alt="Apertúra Bázis logó"
          className="max-w-[200px] h-auto"
        />
      </div>

      {/* Információk rész */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Elérhetőségek</h2>

        <div className="text-gray-700 text-lg space-y-1">
          <p>
            📍{" "}
            <span className="font-medium">1071 Budapest, Csányi utca 3.</span>
          </p>
          <p>
            📞 <span className="font-medium">+36 30 123 4567</span>
          </p>
          <p>
            ✉️ <span className="font-medium">info@cucli.hu</span>
          </p>
        </div>

        <div className="mt-4 flex justify-center md:justify-start gap-6">
          <a
            href="https://facebook.com/aperturabazis"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Facebook className="w-6 h-6" />
            Facebook
          </a>
          <a
            href="https://instagram.com/aperturabazis"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-pink-500 hover:underline"
          >
            <Instagram className="w-6 h-6" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
