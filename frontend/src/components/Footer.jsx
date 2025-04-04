import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Bal oldal – cím, készítők */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">Apertúra Bázis</h3>
          <p className="text-sm text-gray-400">
            Budapest, VII. kerület, Csányi utca 3.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Az oldal készítői: A CUCLI és a közösség
          </p>
        </div>

        {/* Közép – logó */}
        <div className="flex items-center justify-center">
          {/* Dummy logó – cserélhető saját képre */}
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">LOGO</span>
          </div>
        </div>

        {/* Jobb oldal – közösségi linkek */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-400 transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400 transition"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
