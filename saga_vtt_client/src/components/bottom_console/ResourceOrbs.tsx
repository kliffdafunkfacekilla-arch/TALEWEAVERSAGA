import React from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

interface OrbProps {
  label: string;
  current: number;
  max: number;
  color: string;
  glowColor: string;
  icon?: string;
}

const VitalOrb = ({ label, current, max, color, glowColor }: OrbProps) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative w-16 h-16 rounded-full border border-zinc-800 bg-zinc-950 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Fill Level */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out ${color} ${glowColor}`}
          style={{ height: `${percentage}%` }}
        >
          {/* Animated Wave Effect */}
          <div className="absolute top-0 left-0 w-[200%] h-4 -translate-y-1/2 bg-white/10 blur-md animate-[wave_3s_linear_infinite]" />
        </div>
        
        {/* Value Overlay */}
        <div className="z-10 flex flex-col items-center">
          <span className="text-[10px] font-black tracking-tighter text-white drop-shadow-md">
            {current}
          </span>
          <div className="w-4 h-[1px] bg-white/20 my-0.5" />
          <span className="text-[8px] font-bold text-zinc-500">
            {max}
          </span>
        </div>
        
        {/* Inner Glass Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
      
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
        {label}
      </span>
    </div>
  );
};

export const ResourceOrbs = () => {
  const vitals = useCharacterStore((s) => s.vitals);

  return (
    <div className="flex items-end gap-6 h-full py-4">
      <VitalOrb 
        label="Health" 
        current={vitals.hp.current} 
        max={vitals.hp.max} 
        color="bg-rose-600" 
        glowColor="shadow-[0_0_20px_rgba(225,29,72,0.4)]"
      />
      <VitalOrb 
        label="Stamina" 
        current={vitals.stamina.current} 
        max={vitals.stamina.max} 
        color="bg-amber-500" 
        glowColor="shadow-[0_0_20px_rgba(245,158,11,0.4)]"
      />
      <VitalOrb 
        label="Focus" 
        current={vitals.focus.current} 
        max={vitals.focus.max} 
        color="bg-purple-500" 
        glowColor="shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      />
      <VitalOrb 
        label="Comp" 
        current={vitals.composure.current} 
        max={vitals.composure.max} 
        color="bg-blue-500" 
        glowColor="shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};
