from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class CampaignState(Base):
    __tablename__ = "campaign_states"

    id = Column(String, primary_key=True, index=True)
    player_id = Column(String, index=True)
    current_hex = Column(Integer, default=1)
    
    # 4-Layer Hierarchy Positions
    current_layer = Column(Integer, default=1)
    current_region_x = Column(Integer, default=10)
    current_region_y = Column(Integer, default=10)
    current_local_x = Column(Integer, default=50)
    current_local_y = Column(Integer, default=50)
    current_player_x = Column(Integer, default=50)
    current_player_y = Column(Integer, default=50)

    tension = Column(Integer, default=10)
    weather = Column(String, default="Clear Skies")
    chaos_numbers = Column(JSON, default="[1]")
    
    pacing_current = Column(Integer, default=0)
    pacing_goal = Column(Integer, default=15)
    
    player_sprite = Column(JSON, nullable=True)
    difficulty = Column(String, default="STANDARD")
    style = Column(String, default="GRITTY_SURVIVAL")
    length_type = Column(String, default="SAGA")
    no_fly_list = Column(JSON, default="[]")
    
    hex_densities = Column(JSON, default="{}")
    active_encounter = Column(JSON, nullable=True)
    
    # NPC state tracking (JSON blob for now)
    npc_states = Column(JSON, default="{}")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(String, index=True)
    role = Column(String) # "player" or "narrator"
    content = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class ActiveQuest(Base):
    __tablename__ = "active_quests"
    id = Column(String, primary_key=True)
    campaign_id = Column(String, index=True)
    title = Column(String)
    objectives = Column(JSON) # List of {objective: str, is_complete: bool}

class CampaignFrameworkTable(Base):
    __tablename__ = "campaign_frameworks"
    campaign_id = Column(String, primary_key=True)
    arc_name = Column(String)
    theme = Column(String)
    hero_journey = Column(JSON)
    character_hooks = Column(JSON)

class WorldEventsLog(Base):
    __tablename__ = "world_events_log"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(String, index=True)
    turn_number = Column(Integer)
    event_description = Column(String)
    associated_faction = Column(String, nullable=True)
    location_hex_id = Column(String)
