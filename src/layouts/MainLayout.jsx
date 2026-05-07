import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E4] to-[#EDFFFO] animate-fade-in">
      <Sidebar />
      <div className="lg:ml-72">
        <div className="p-6">
          <Navbar />
          <main className="mt-6 animate-fade-in-up">
            <Outlet />
          </main>
        </div>
      </div>

      <style>
        {`@keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
  }
          @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
 }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }`}
      </style>
    </div>
  );
}
