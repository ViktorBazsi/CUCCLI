import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

import LandingPage from "./pages/LandingPage";
import PerformancePage from "./pages/PerformancePage";
import CartPage from "./pages/CartPage";
import ArchivePage from "./pages/ArchivePage";
import ContactPage from "./pages/ContactPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
