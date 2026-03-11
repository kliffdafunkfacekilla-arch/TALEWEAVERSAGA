import random
from typing import Dict, List, Optional
from .encounter_schemas import CombatEncounter, Combatant, SpatialData

class TacticalGenerator:
    _world_manager = None

    @classmethod
    def set_world_manager(cls, wm):
        cls._world_manager = wm

    @staticmethod
    def generate_region_map(biome: str, hex_id: int):
        """Tier 2: 20x20 Regional Strategic Grid."""
        # 0 = Empty, 1 = POI (Village/Ruins), 2 = Obstacle (Woods/Mountain)
        width, height = 20, 20
        grid = [[0 for _ in range(width)] for _ in range(height)]
        
        # Place a central POI
        grid[10][10] = 1
        
        return {
            "hex_id": hex_id,
            "biome": biome,
            "grid": grid,
            "width": width,
            "height": height
        }

    @staticmethod
    def generate_local_grid(biome: str, hex_id: int, rx: int, ry: int):
        """Tier 3: 100x100 Local Exploration Grid."""
        # "G" = Grass, "T" = Tree, "R" = Rock
        width, height = 100, 100
        grid = [["G" for _ in range(width)] for _ in range(height)]
        
        return {
            "hex_id": hex_id,
            "rx": rx,
            "ry": ry,
            "biome": biome,
            "grid": grid,
            "width": width,
            "height": height
        }

    @staticmethod
    def generate_ambient_encounter(
        biome: str, 
        hex_id: int, 
        lx: int, 
        ly: int, 
        current_hour: float = 12.0, 
        densities: Dict = None,
        external_npcs: List = None,
        player_sprite: Dict = None
    ):
        """Tier 4: 100x100 Player/Tactical Grid with building interiors and NPCs."""
        width, height = 100, 100
        grid = [["EMPTY" for _ in range(width)] for _ in range(height)]
        
        # Deterministic building placement based on local coordinates
        # For Tier 4, we want a small tactical area
        for y in range(40, 60):
            for x in range(40, 60):
                if x == 40 or x == 59 or y == 40 or y == 59:
                    grid[y][x] = "WALL"
                else:
                    grid[y][x] = "FLOOR"

        # Populate with some basic noise (GRASS/DEBRIS)
        rng = random.Random(hex_id + lx + ly)
        for _ in range(200):
            rx = rng.randint(0, 99)
            ry = rng.randint(0, 99)
            if grid[ry][rx] == "EMPTY":
                grid[ry][rx] = "GRASS" if rng.random() > 0.2 else "DEBRIS"

        return {
            "encounter_id": f"TAC_{hex_id}_{lx}_{ly}",
            "biome": biome,
            "grid": grid,
            "gridWidth": width,
            "gridHeight": height,
            "tokens": external_npcs or [],
            "data": {
                "category": "COMBAT",
                "title": f"{biome} Tactical Zone",
                "narrative_prompt": f"You have entered a tactical zone in the {biome}. Use the environment to your advantage.",
                "enemies": []
            }
        }
