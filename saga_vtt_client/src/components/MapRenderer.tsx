import React, { useEffect, useMemo } from 'react';
import { Stage, Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useWorldStore } from '../store/useWorldStore';
import { useGameStore } from '../store/useGameStore';

// --- TIER 1: GLOBAL VIEW ---
const GlobalView = ({ grid }: { grid: any }) => {
  // Simple hex-like circles for the parchment view
  return (
    <Container x={50} y={50}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x27272a); // zinc-800
          g.lineStyle(1, 0x3f3f46);
          // Draw a 10x10 macro grid for now
          for (let q = 0; q < 10; q++) {
            for (let r = 0; r < 10; r++) {
              const x = q * 40 + (r % 2) * 20;
              const y = r * 35;
              g.drawCircle(x, y, 18);
            }
          }
          g.endFill();
        }}
      />
      <Text text="PARCHMENT VIEW (T1)" style={new PIXI.TextStyle({ fill: 0x71717a, fontSize: 12, fontWeight: 'bold' })} x={10} y={-30} />
    </Container>
  );
};

// --- TIER 2: REGIONAL VIEW ---
const RegionalView = ({ grid }: { grid: any }) => {
  const cellSize = 30;
  return (
    <Container x={50} y={50}>
      <Graphics
        draw={(g) => {
          g.clear();
          if (!grid || !Array.isArray(grid)) return;
          
          grid.forEach((row: any[], y: number) => {
            row.forEach((cell: any, x: number) => {
              // 0: EMPTY, 1: POI, 2: OBSTACLE
              let color = 0x18181b; // zinc-950
              if (cell === 1) color = 0xf59e0b; // amber-500
              if (cell === 2) color = 0x3f3f46; // zinc-700
              
              g.beginFill(color);
              g.lineStyle(1, 0x27272a);
              g.drawRect(x * cellSize, y * cellSize, cellSize, cellSize);
              g.endFill();
            });
          });
        }}
      />
      <Text text="REGIONAL STRATEGIC (T2)" style={new PIXI.TextStyle({ fill: 0xd4d4d8, fontSize: 14, fontWeight: 'bold' })} x={0} y={-30} />
    </Container>
  );
};

export const MapRenderer: React.FC = () => {
  const vttTier = useGameStore((s) => s.vttTier);
  const mapData = useWorldStore((s) => s.mapData);
  const isLoading = useWorldStore((s) => s.isLoading);
  const fetchMapData = useWorldStore((s) => s.fetchMapData);

  const activeCampaignId = useGameStore((s) => s.activeCampaignId);

  // In a real scenario, this comes from the campaign state
  const hexId = 200500; 

  useEffect(() => {
    fetchMapData(hexId, activeCampaignId);
  }, [vttTier, hexId, fetchMapData, activeCampaignId]);

  if (isLoading || !mapData) {
    return (
      <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center">
        <div className="text-amber-500 font-black tracking-[0.3em] uppercase animate-pulse mb-2">
          Syncing World Layer...
        </div>
        <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest transition-all">
          Tier {vttTier} | Neural Grid Active
        </div>
      </div>
    );
  }

  // Calculate canvas size (total width - sidebar)
  const width = window.innerWidth - 384;
  const height = window.innerHeight - 200;

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <Stage
        width={width}
        height={height}
        options={{ 
          backgroundColor: 0x09090b, // zinc-950
          antialias: true,
          resolution: window.devicePixelRatio || 1
        }}
      >
        <Container sortableChildren={true}>
          {vttTier === 1 && <GlobalView grid={mapData.grid} />}
          {vttTier === 2 && <RegionalView grid={mapData.grid} />}
        </Container>
      </Stage>
      
      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 pointer-events-none flex flex-col gap-1">
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
          COORDS: {mapData.rx ?? 0},{mapData.ry ?? 0} | HEX: {mapData.hexId}
        </div>
        <div className="px-2 py-1 bg-zinc-900/80 border border-zinc-800 text-[9px] text-amber-500 font-black uppercase tracking-widest">
          SAGA_OS: LAYER_0{vttTier}_STABLE
        </div>
      </div>
    </div>
  );
};
