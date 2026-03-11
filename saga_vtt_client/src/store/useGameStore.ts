import { create } from 'zustand';

export type VTTTier = 1 | 2 | 3 | 4 | 5;

/** 
 * Saga Phases define the global ruleset and UI constraints active in the VTT.
 * EXPLORATION: Free movement across tiers T1-T4.
 * DEPLOYMENT: Token placement phase before T5 combat.
 * TACTICAL: Grid-bound combat/encounter logic in T5.
 * DOWNTIME: Rest, training, and narrative beats (T3/T5).
 */
export type SagaPhase = 'EXPLORATION' | 'TACTICAL' | 'DEPLOYMENT' | 'DOWNTIME';

export interface LoadoutItem {
    id: string;
    name: string;
    type: string;
    equipped?: boolean;
    desc?: string;
    target?: string;
    range?: number;
    stamina_cost?: number;
    focus_cost?: number;
    target_dc?: number;
    lead_stat?: string;
    trail_stat?: string;
    dice?: string;
}

interface GameState {
    campaignId: string;
    sagaPhase: SagaPhase;
    setSagaPhase: (phase: SagaPhase) => void;
    devToolsOpen: boolean;

    worldData: any;
    setWorldData: (data: any) => void;

    selectedHex: any;
    setSelectedHex: (hex: any) => void;

    viewLens: string;
    setViewLens: (lens: string) => void;

    editMode: string;
    setEditMode: (mode: string) => void;

    activeBrush: string | number;
    setActiveBrush: (brush: string | number) => void;

    brushSize: number;
    setBrushSize: (size: number) => void;

    brushStrength: number;
    setBrushStrength: (strength: number) => void;

    currentScreen: string;
    setScreen: (screen: string) => void;

    activeCampaignId: string;
    setCampaignId: (id: string) => void;

    ui_locked: boolean;
    setUiLocked: (locked: boolean) => void;

    vttTier: VTTTier;
    setVttTier: (tier: VTTTier) => void;

    clientLoadout: LoadoutItem[];
    setClientLoadout: (loadout: LoadoutItem[]) => void;

    inventory_slots: number;
    characterSheet: any;

    weather?: string;
    tension?: number;
    chaosNumbers?: number[];
    pacingProgress?: number;

    addChatMessage: (msg: any) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    campaignId: 'stub-campaign',
    activeCampaignId: 'stub-campaign',
    setCampaignId: (id: string) => set({ campaignId: id, activeCampaignId: id }),
    
    sagaPhase: 'EXPLORATION',
    setSagaPhase: (phase: SagaPhase) => {
        console.log(`[PHASE] Transitioning to: ${phase}`);
        set({ sagaPhase: phase });
        // Auto-adjust tier based on phase
        if (phase === 'TACTICAL' || phase === 'DEPLOYMENT') {
            set({ vttTier: 5 });
        }
    },

    devToolsOpen: false,
    
    currentScreen: 'MAIN_MENU', // Default to main menu for proper entry flow
    setScreen: (screen) => set({ currentScreen: screen }),

    ui_locked: false,
    setUiLocked: (locked) => set({ ui_locked: locked }),

    vttTier: 1, // Default to Global View
    setVttTier: (tier) => {
        const { sagaPhase } = get();
        // Guard: Cannot leave Tier 5 during Tactical/Deployment phases
        if (sagaPhase === 'TACTICAL' && tier < 5) {
            console.warn("[GUARD] Cannot zoom out during Tactical phase.");
            return;
        }
        set({ vttTier: tier });
    },

    clientLoadout: [],
    setClientLoadout: (loadout) => set({ clientLoadout: loadout }),

    inventory_slots: 10,
    characterSheet: null,

    addChatMessage: (msg) => {
        console.log("Chat Message:", msg);
        // Implementation for chat persistence/UI update would go here
    },

    worldData: null,
    setWorldData: (data) => set({ worldData: data }),

    selectedHex: null,
    setSelectedHex: (hex) => set({ selectedHex: hex }),

    viewLens: 'PHYSICAL',
    setViewLens: (lens) => set({ viewLens: lens }),

    editMode: 'NONE',
    setEditMode: (mode) => set({ editMode: mode }),

    activeBrush: '',
    setActiveBrush: (brush) => set({ activeBrush: brush }),

    brushSize: 5,
    setBrushSize: (size) => set({ brushSize: size }),

    brushStrength: 100,
    setBrushStrength: (strength) => set({ brushStrength: strength }),
}));
