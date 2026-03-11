import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const QuestTracker: React.FC = () => {
    const activeQuest = useGameStore((s) => s.activeQuest);
    const arcName = useGameStore((s) => s.arcName);
    const theme = useGameStore((s) => s.theme);

    if (!activeQuest) return null;

    return (
        <div className="absolute top-20 right-6 w-72 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-20 transition-all duration-500 animate-in slide-in-from-right">
            {/* Header: Arc Title */}
            <div className="px-4 py-2 bg-gradient-to-r from-amber-600/20 to-transparent border-b border-amber-500/30">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500/80">
                    {theme} Arc
                </div>
                <div className="text-sm font-serif font-bold text-zinc-100 italic">
                    {arcName}
                </div>
            </div>

            {/* Active Quest */}
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                        {activeQuest.title}
                    </h3>
                </div>

                <ul className="space-y-2 ml-3.5">
                    {activeQuest.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2 group">
                            <div className={`mt-1 w-3 h-3 rounded-sm border ${obj.is_complete ? 'bg-amber-500 border-amber-500' : 'border-zinc-700'} flex-shrink-0 flex items-center justify-center transition-colors`}>
                                {obj.is_complete && (
                                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-zinc-950 fill-current" stroke="currentColor" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" fill="none" />
                                    </svg>
                                )}
                            </div>
                            <span className={`text-[11px] leading-tight transition-colors ${obj.is_complete ? 'text-zinc-500 line-through' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                {obj.objective}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Decoration */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
        </div>
    );
};
