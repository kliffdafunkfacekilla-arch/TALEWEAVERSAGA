import { create } from 'zustand';

interface CombatState {
    inCombat: boolean;
    activeEncounter: { tokens: any[] } | null;
    selectedTargetId: string | null;
    setActiveEncounter: (enc: any) => void;
    setSelectedTargetId: (id: string | null) => void;
}

export const useCombatStore = create<CombatState>((set) => ({
    inCombat: false,
    activeEncounter: null,
    selectedTargetId: null,
    setActiveEncounter: (enc) => set({ activeEncounter: enc }),
    setSelectedTargetId: (id) => set({ selectedTargetId: id }),
}));
