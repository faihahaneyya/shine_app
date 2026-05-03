import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F875AA] to-[#AEDEFC] relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 h-full animate-slide-in-right">
          <div>
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-3xl animate-bounce-subtle">✨</span>
              </div>
              <span className="text-white text-xl font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">na_store.id</span>
            </div>
            
            <h1 className="text-white text-4xl font-bold leading-tight mb-4 animate-slide-in-up">
              Handmade with<br />
              <span className="text-[#FDEDED] relative inline-block group">
                Love & Care
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-500"></span>
              </span>
            </h1>
            
            <p className="text-white/80 text-lg leading-relaxed animate-fade-in-delayed">
              Discover unique handmade accessories<br />
              that tell your story. Each piece crafted<br />
              with attention to detail and passion.
            </p>
          </div>
          
          <div className="flex gap-8 animate-slide-in-up-delayed">
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-white text-3xl font-bold group-hover:text-[#FDEDED] transition-colors">500+</p>
              <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">Happy Customers</p>
            </div>
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-white text-3xl font-bold group-hover:text-[#FDEDED] transition-colors">1K+</p>
              <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">Products Sold</p>
            </div>
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-white text-3xl font-bold group-hover:text-[#FDEDED] transition-colors">4.9</p>
              <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">Rating ★</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white animate-slide-in-left">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent">na_store<span className="text-[#F875AA]">.</span>id</h1>
            <p className="text-gray-500 mt-1">Handmade Accessories</p>
          </div>
          <Outlet />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        @keyframes pulseGentle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slide-in-up { animation: slideInUp 0.5s ease-out forwards; opacity: 0; animation-delay: 0.2s; animation-fill-mode: forwards; }
        .animate-slide-in-up-delayed { animation: slideInUp 0.5s ease-out forwards; opacity: 0; animation-delay: 0.4s; animation-fill-mode: forwards; }
        .animate-fade-in-delayed { animation: fadeIn 0.5s ease-out forwards; opacity: 0; animation-delay: 0.3s; animation-fill-mode: forwards; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: floatSlow 10s ease-in-out infinite reverse; }
        .animate-pulse-gentle { animation: pulseGentle 6s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounceSubtle 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}