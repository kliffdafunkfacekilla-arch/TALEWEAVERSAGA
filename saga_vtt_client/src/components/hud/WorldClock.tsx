import React from 'react';
import { useWorldStore } from '../../store/useWorldStore';
import { useGameStore } from '../../store/useGameStore';

export const WorldClock: React.FC = () => {
    const currentTime = useWorldStore((s) => s.currentTime);
    const currentPhase = useWorldStore((s) => s.currentPhase);
    const advanceTime = useWorldStore((s) => s.advanceTime);
    const activeCampaignId = useGameStore((s) => s.activeCampaignId);

    const formatTime = (t: number) => {
        const hours = Math.floor(t);
        const minutes = Math.round((t - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const handleAdvance = (h: number) => {
        if (activeCampaignId) {
            advanceTime(h, activeCampaignId);
        }
    };

    return (
        <div className="flex flex-col items-center bg-black/80 border border-zinc-800 p-2 rounded-sm shadow-xl backdrop-blur-md">
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">
                {currentPhase}
            </div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums mb-2">
                {formatTime(currentTime)}
            </div>
            <div className="flex gap-1">
                <button 
                    onClick={() => handleAdvance(1)}
                    className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-bold uppercase border border-zinc-700 transition-colors"
                >
                    +1h
                </button>
                <button 
                    onClick={() => handleAdvance(4)}
                    className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-bold uppercase border border-zinc-700 transition-colors"
                >
                    +4h
                </button>
                <button 
                    onClick={() => handleAdvance(8)}
                    className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-bold uppercase border border-zinc-700 transition-colors"
                >
                    +8h
                </button>
            </div>
        </div>
    );
};
