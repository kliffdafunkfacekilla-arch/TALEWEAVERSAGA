import React, { useEffect } from 'react';
import { Stage, Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useWorldStore } from '../../store/useWorldStore';
import { useGameStore } from '../../store/useGameStore';

export const ExplorationNodeMap = () => {
  const mapData = useWorldStore((s) => s.mapData);
  const fetchMapData = useWorldStore((s) => s.fetchMapData);
  const vttTier = useGameStore((s) => s.vttTier);
  const hexId = 200500;

  useEffect(() => {
    if (!mapData || mapData.tier !== vttTier) {
      fetchMapData(hexId);
    }
  }, [vttTier, fetchMapData]);

  if (!mapData) {
    return (
      <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center">
        <div className="text-emerald-900 animate-pulse text-xs font-bold uppercase tracking-widest">
          Syncing Local Topography...
        </div>
      </div>
    );
  }

  const width = window.innerWidth - 384;
  const height = window.innerHeight - 200;
  const cellSize = 12; // Smaller zoom for exploration

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-950">
      <Stage width={width} height={height} options={{ backgroundColor: 0x020617 }}>
        <Container x={50} y={50}>
          <Graphics
            draw={(g) => {
              g.clear();
              const grid = mapData.grid;
              if (!grid || !Array.isArray(grid)) return;

              grid.forEach((row, y) => {
                if (!Array.isArray(row)) return;
                row.forEach((cell, x) => {
                  let color = 0x064e3b; // emerald-950 (Grass)
                  if (cell === "T") color = 0x065f46; // Tree
                  if (cell === "R") color = 0x475569; // Rock
                  if (cell === "WALL") color = 0x1e293b;
                  
                  g.beginFill(color);
                  g.lineStyle(0.25, 0x064e3b);
                  g.drawRect(x * cellSize, y * cellSize, cellSize, cellSize);
                  g.endFill();
                });
              });
            }}
          />
        </Container>
      </Stage>

      <div className="absolute top-4 left-4 p-2 bg-emerald-950/40 border border-emerald-900/50 backdrop-blur-md">
        <div className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em]">
          Exploration Phase
        </div>
        <div className="text-zinc-500 text-[8px] uppercase">
          Biometric Scan: Functional
        </div>
      </div>
    </div>
  );
};
