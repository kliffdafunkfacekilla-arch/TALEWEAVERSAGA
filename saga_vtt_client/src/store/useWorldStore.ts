import { create } from 'zustand';

export type MapTier = 1 | 2 | 3 | 4 | 5;

interface MapData {
  tier: MapTier;
  grid: string[][] | number[][];
  width: number;
  height: number;
  biome: string;
  hexId: number;
  rx?: number;
  ry?: number;
  lx?: number;
  ly?: number;
}

interface WorldState {
  currentTier: MapTier;
  mapData: MapData | null;
  isLoading: boolean;
  error: string | null;

  // Local/Tactical coordinates
  rx: number;
  ry: number;
  lx: number;
  ly: number;

  setTier: (tier: MapTier) => void;
  setCoordinates: (coords: Partial<{ rx: number; ry: number; lx: number; ly: number }>) => void;
  fetchMapData: (hexId: number) => Promise<void>;
}

export const useWorldStore = create<WorldState>((set, get) => ({
  currentTier: 1,
  mapData: null,
  isLoading: false,
  error: null,
  rx: 10,
  ry: 10,
  lx: 50,
  ly: 50,

  setTier: (tier) => set({ currentTier: tier }),
  
  setCoordinates: (coords) => set((state) => ({ ...state, ...coords })),

  fetchMapData: async (hexId: number) => {
    const { currentTier, rx, ry, lx, ly } = get();
    set({ isLoading: true, error: null });

    try {
      let url = '';
      const directorUrl = import.meta.env.VITE_SAGA_DIRECTOR_URL || 'http://localhost:8050';

      if (currentTier === 2) {
        url = `${directorUrl}/api/world/region/${hexId}`;
      } else if (currentTier === 3) {
        url = `${directorUrl}/api/world/local/${hexId}?rx=${rx}&ry=${ry}`;
      } else if (currentTier === 4 || currentTier === 5) {
        url = `${directorUrl}/api/world/tactical/${hexId}?lx=${lx}&ly=${ly}`;
      } else {
        // Tier 1 (Global) might come from a different source or be static
        set({ 
          mapData: { tier: 1, grid: [], width: 0, height: 0, biome: 'World', hexId },
          isLoading: false 
        });
        return;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch map tier ${currentTier}`);
      
      const data = await response.json();
      
      // Normalize data based on tier
      const normalizedData: MapData = {
        tier: currentTier,
        grid: data.grid || [],
        width: data.gridWidth || data.width || 0,
        height: data.gridHeight || data.height || 0,
        biome: data.biome || 'Wilderness',
        hexId,
        rx: data.rx,
        ry: data.ry,
        lx: data.lx,
        ly: data.ly
      };

      set({ mapData: normalizedData, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
