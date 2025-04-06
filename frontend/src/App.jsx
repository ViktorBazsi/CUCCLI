import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import PerformancePage from "./pages/PerformancePage";
import CartPage from "./pages/CartPage";
import ArchivePage from "./pages/ArchivePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
