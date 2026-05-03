export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5E4] to-[#EDFFFO] animate-fade-in">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-[#FDEDED] border-t-[#F875AA] rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">✨</span>
        </div>
      </div>
      <p className="mt-5 text-[#F875AA] font-medium animate-pulse-slow">Loading na_store Admin...</p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-spin-slow { animation: spinSlow 1s linear infinite; }
        .animate-bounce { animation: bounce 0.8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}