import { useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useWorldStore } from '../store/useWorldStore';

export const useDirector = () => {
    const activeCampaignId = useGameStore((s) => s.activeCampaignId);
    const addChatMessage = useGameStore((s) => s.addChatMessage);
    const setQuest = useGameStore((s) => s.setQuest);
    const setStoryMetadata = useGameStore((s) => s.setStoryMetadata);
    const [isShaking, setIsShaking] = useState(false);

    const pulseDirector = useCallback(async (action?: any) => {
        if (!activeCampaignId) return;

        const directorUrl = import.meta.env.VITE_SAGA_DIRECTOR_URL || 'http://localhost:8050';
        try {
            const res = await fetch(`${directorUrl}/api/director/pulse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign_id: activeCampaignId,
                    player_action: action
                })
            });

            if (res.ok) {
                const data = await res.json();
                
                // 1. Handle Narration
                if (data.narration) {
                    addChatMessage({
                        sender: 'AI_DIRECTOR',
                        text: data.narration
                    });
                }

                // 2. Handle Story Metadata
                if (data.arc_name && data.theme) {
                    setStoryMetadata({ arcName: data.arc_name, theme: data.theme });
                }

                // 3. Handle Active Quest
                if (data.active_quest) {
                    setQuest(data.active_quest);
                }

                // 4. Handle VTT Commands
                if (data.vtt_commands) {
                    data.vtt_commands.forEach((cmd: any) => {
                        if (cmd.type === 'CAMERA_SHAKE') {
                            setIsShaking(true);
                            setTimeout(() => setIsShaking(false), cmd.duration || 500);
                        }
                    });
                }
            }
        } catch (err) {
            console.error("Director Pulse Failed:", err);
        }
    }, [activeCampaignId, addChatMessage, setQuest, setStoryMetadata]);

    // Initial Pulse
    useEffect(() => {
        if (activeCampaignId) {
            pulseDirector();
        }
    }, [activeCampaignId, pulseDirector]);

    return {
        pulseDirector,
        isShaking
    };
};
