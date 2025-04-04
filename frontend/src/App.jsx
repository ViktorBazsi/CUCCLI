import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import PerformancePage from "./pages/PerformancePage";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/performance" element={<PerformancePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
