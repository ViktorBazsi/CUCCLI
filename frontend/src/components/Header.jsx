import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion"; // <- hagyd itt, akkor is ha "unused"

export default function Header() {
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerClass = `fixed top-0 left-0 w-full border-b ${
    transparentHeader
      ? "bg-white/30 backdrop-blur-md border-gray-200"
      : "bg-white border-gray-300"
  } transition-colors duration-300 text-black px-4 py-4 z-50 shadow-sm`;

  useEffect(() => {
    const handleScroll = () => setTransparentHeader(window.scrollY <= 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={headerClass}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            CUCLI
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-6 text-lg font-medium items-center">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/performance" className="hover:underline">
              Előadásod
            </Link>
            <Link to="/archive" className="hover:underline">
              Archív
            </Link>
            <Link to="/contact" className="hover:underline">
              Kapcsolat
            </Link>
          </nav>

          {/* Jobb oldal ikonok és hamburger */}
          <div className="flex items-center gap-4">
            {/* Bejelentkezés */}
            <Link
              to="/login"
              className="hover:underline flex items-center gap-1"
            >
              <User size={22} />
            </Link>

            {/* Kosár */}
            <Link to="/cart" className="hover:underline flex items-center">
              <ShoppingCart size={22} />
            </Link>

            {/* Hamburger csak mobilra */}
            <button
              className="lg:hidden text-black z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobilmenü animált slide-in */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-start pt-24 px-6 gap-6 text-xl font-medium overflow-y-auto"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Home
            </Link>
            <Link
              to="/performance"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Előadásod
            </Link>
            <Link
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Archív
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Kapcsolat
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
