import { Dialog } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.pathname; // pl. /cart vagy /performance

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/40"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">Előbb be kell jelentkezned</h2>
        <p className="text-gray-600 mb-6">
          Ahhoz, hogy előadást állíts össze, előbb be kell jelentkezned.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="border border-gray-400 px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            Mégsem
          </button>
          <button
            onClick={() => navigate(`/login?redirect=${redirectPath}`)}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
          >
            Bejelentkezés
          </button>
        </div>
      </div>
    </Dialog>
  );
}
