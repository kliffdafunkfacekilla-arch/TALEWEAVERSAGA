import React, { useEffect, useMemo } from 'react';
import { Stage, Container, Graphics, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useWorldStore } from '../../store/useWorldStore';
import { useCombatStore } from '../../store/useCombatStore';
import { useGameStore } from '../../store/useGameStore';

const Token = ({ token, cellSize }: { token: any, cellSize: number }) => {
  return (
    <Container x={token.x * cellSize} y={token.y * cellSize}>
      <Graphics
        draw={(g) => {
          g.clear();
          let color = 0x3b82f6; // Default Blue (Friendly)
          if (token.is_enemy || token.disposition === "HOSTILE") color = 0xef4444; // Red
          else if (token.disposition === "NEUTRAL") color = 0xf59e0b; // Amber
          else if (token.disposition === "SUSPICIOUS") color = 0x8b5cf6; // Purple

          g.beginFill(color);
          g.lineStyle(2, 0xffffff);
          g.drawCircle(cellSize / 2, cellSize / 2, cellSize / 2.5);
          g.endFill();
        }}
      />
      <Text 
        text={token.name?.substring(0, 1) || '?'} 
        style={new PIXI.TextStyle({ 
          fill: 0xffffff, 
          fontSize: 10, 
          fontWeight: 'bold',
          dropShadow: true,
          dropShadowDistance: 1,
          dropShadowBlur: 2
        })} 
        x={cellSize / 4} 
        y={cellSize / 4} 
      />
    </Container>
  );
};

export const PixiBattlemap = () => {
  const activeEncounter = useCombatStore((s: any) => s.activeEncounter);
  const mapData = useWorldStore((s) => s.mapData);
  const fetchMapData = useWorldStore((s) => s.fetchMapData);
  const vttTier = useGameStore((s) => s.vttTier);
  const activeCampaignId = useGameStore((s) => s.activeCampaignId);
  const saveDelta = useWorldStore((s) => s.saveDelta);

  const hexId = 200500;
  const cellSize = 20; // 5ft scale

  useEffect(() => {
    if (!mapData || mapData.tier !== vttTier) {
      fetchMapData(hexId, activeCampaignId);
    }
  }, [vttTier, fetchMapData, activeCampaignId]);

  const handleTileClick = (x: number, y: number) => {
    if (!mapData || !mapData.grid) return;
    const currentVal = mapData.grid[y][x];
    // Cycle: WALL -> DEBRIS -> FLOOR -> WALL
    let newVal = "FLOOR";
    if (currentVal === "WALL") newVal = "DEBRIS";
    else if (currentVal === "DEBRIS") newVal = "FLOOR";
    else if (currentVal === "FLOOR" || currentVal === "EMPTY" || currentVal === "GRASS") newVal = "WALL";

    saveDelta({
      hex_id: hexId,
      layer: vttTier as any,
      x,
      y,
      original_value: String(currentVal),
      new_value: newVal
    }, activeCampaignId);
  };

  // Use activeEncounter data if available, fallback to mapData
  const displayData = activeEncounter || mapData;

  if (!displayData || !displayData.grid) {
    return (
      <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center">
        <div className="text-zinc-700 animate-pulse uppercase tracking-widest text-xs">
          Tactical Matrix Materializing...
        </div>
      </div>
    );
  }

  const width = window.innerWidth - 384;
  const height = window.innerHeight - 200;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Stage width={width} height={height} options={{ backgroundColor: 0x010101 }}>
        <Container x={10} y={10} scale={0.8}>
          {/* Grid Background */}
          <Graphics
            interactive={true}
            pointerdown={(e) => {
              const pos = e.data.getLocalPosition(e.currentTarget);
              const x = Math.floor(pos.x / cellSize);
              const y = Math.floor(pos.y / cellSize);
              handleTileClick(x, y);
            }}
            draw={(g) => {
              g.clear();
              const grid = displayData.grid;
              grid.forEach((row: string[], y: number) => {
                row.forEach((cell: string, x: number) => {
                  let color = 0x111111;
                  if (cell === "WALL") color = 0x44403c;
                  if (cell === "FLOOR") color = 0x92400e;
                  if (cell === "DEBRIS") color = 0x78716c;
                  if (cell === "GRASS") color = 0x064e3b;

                  g.beginFill(color);
                  g.lineStyle(0.5, 0x222222);
                  g.drawRect(x * cellSize, y * cellSize, cellSize, cellSize);
                  g.endFill();
                });
              });
            }}
          />

          {/* Tokens */}
          <Container>
            {(displayData.tokens || []).map((token: any, i: number) => (
              <Token key={i} token={token} cellSize={cellSize} />
            ))}
          </Container>
        </Container>
      </Stage>

      {/* Tactical HUD Overlay */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 bg-black/60 p-3 border border-zinc-800 backdrop-blur-sm pointer-events-none">
        <div className="text-amber-500 font-black text-xs uppercase tracking-widest">
          Tactical Tier 05
        </div>
        <div className="text-[10px] text-zinc-400">
          GRID: {displayData.gridWidth}x{displayData.gridHeight} | SCALE: 5ft/cell
        </div>
      </div>
    </div>
  );
};
