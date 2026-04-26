import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

export const BackgroundFX: FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-background z-[-2]" />
      
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -50, 50, 50, 0],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#3B82F6]/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, -100, 100, 50, 0],
          y: [0, 100, -50, -100, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-[#8B5CF6]/20 rounded-full blur-[100px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, 50, -100, 50, 0],
          y: [0, -100, 100, -50, 0],
          scale: [1, 0.9, 1.2, 1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] bg-[#4338ca]/20 rounded-full blur-[130px] mix-blend-screen"
      />
      
      {/* Subtle Noise Texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10 mix-blend-overlay"></div>
    </div>
  );
};

export const BrandMark: FC = () => {
  return (
    <div className="flex flex-col items-center mb-8 space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-md z-[-1]" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="1" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
          Aura
        </span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
        <span className="text-xs font-medium tracking-wide text-purple-200/80 uppercase">
          Exclusive Member Access Only
        </span>
      </motion.div>
    </div>
  );
};

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 font-sans bg-background text-foreground dark selection:bg-purple-500/30">
      <BackgroundFX />
      
      <div className="w-full max-w-md relative z-10">
        <BrandMark />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
        >
          {/* Inner highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/[0.02]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          
          <div className="p-8">
            {children}
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground/60">
          <p>Protected by Aura Security. OAuth providers can be wired up by the platform owner.</p>
        </div>
      </div>
    </div>
  );
};
