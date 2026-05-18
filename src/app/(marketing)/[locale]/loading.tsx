export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#1A1A1A] border-t-[#CCFF00] rounded-full animate-spin mx-auto mb-6" />
        <p className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em]">
          [LOADING...]
        </p>
      </div>
    </div>
  );
}
