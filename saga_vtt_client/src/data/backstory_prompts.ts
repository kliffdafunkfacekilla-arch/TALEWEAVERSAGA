export const HERITAGE_TERMINOLOGY: Record<string, string[]> = {
    MAMMAL: ["Cranial", "Brachial", "Femoral", "Axial", "Dermal", "Caudal"],
    REPTILE: ["Cranial", "Brachial", "Femoral", "Axial", "Dermal", "Caudal"],
    AQUATIC: ["Cranial", "Brachial", "Femoral", "Axial", "Dermal", "Caudal"],
    AVIAN: ["Cranial", "Brachial", "Femoral", "Axial", "Dermal", "Caudal"],
    INSECT: ["Cephalic", "Appendicular", "Anterior", "Thoraxial", "Cuticular", "Posterior"],
    PLANT: ["Apical", "Branching", "Rootborne", "Vascular", "Dermal", "Reproductive"]
};

export const HERITAGE_SLOTS = [
    "head_slot", "arms_slot", "legs_slot", "body_slot", "skin_slot", "special_slot"
];

export const BackstoryPrompts = {
    species: {
        question: "Which biological family marks your physical origin?",
        options: [
            { id: "MAMMAL", label: "Mammal", description: "Warm-blooded, furred, and resilient." },
            { id: "AVIAN", label: "Avian", description: "Light-framed, feathered, and focused." },
            { id: "REPTILE", label: "Reptile", description: "Scale-bound, patient, and methodical." },
            { id: "INSECT", label: "Insect", description: "Chitin-armored, hive-minded, and driven." },
            { id: "PLANT", label: "Plant", description: "Rooted, photosynthetic, and deep-thinking." },
            { id: "AQUATIC", label: "Aquatic", description: "Gilled, pressure-resistant, and fluid." }
        ]
    },
    heritages: {
        MAMMAL: { questions: ["Cranial Shape", "Brachial Strength", "Femoral Power", "Axial Core", "Dermal Layer", "Caudal Trait"] },
        INSECT: { questions: ["Cephalic Shell", "Appendicular Joint", "Anterior Grip", "Thoraxial Armor", "Cuticular Skin", "Posterior Sting"] },
        PLANT: { questions: ["Apical Growth", "Branching Form", "Rootborne Base", "Vascular Flow", "Dermal Bark", "Reproductive Seed"] },
        DEFAULT: { questions: ["Cranial Shape", "Brachial Strength", "Femoral Power", "Axial Core", "Dermal Layer", "Caudal Trait"] }
    },
    // --- GROUNDED CHRONOLOGICAL FLOW ---
    triads: {
        // STAGE I: CHILDHOOD
        Assault: {
            question: "When you were a child, how did you usually handle a bully on the playground?",
            options: [
                { skill: "Aggressive", label: "I struck first and fast, standing my ground with physical force." },
                { skill: "Calculated", label: "I waited for them to make a mistake, then struck back precisely." },
                { skill: "Patient", label: "I simply stayed out of reach, letting them exhaust their anger." }
            ]
        },
        Fortify: {
            question: "When your friends dared you to stay in the dark cellar, what was your reaction?",
            options: [
                { skill: "Rooted", label: "I sat as still as a statue, refusing to show even a hint of fear." },
                { skill: "Fluid", label: "I moved through the shadows, making it a game of hide and seek." },
                { skill: "Dueling", label: "I met the darkness head-on, testing my reflexes against every noise." }
            ]
        },
        Mobility: {
            question: "When racing the other children to the top of the local hills, how did you get there first?",
            options: [
                { skill: "Charge", label: "I powered straight up the steepest path, relying on sheer momentum." },
                { skill: "Flanking", label: "I found the clever side-paths that avoided the mud and tall grass." },
                { skill: "Speed", label: "I moved with such a rapid pace that they couldn't possibly keep up." }
            ]
        },
        Resolve: {
            question: "When you failed a task your parents gave you, what did you do?",
            options: [
                { skill: "Confidence", label: "I brushed it off, knowing I would simply succeed next time." },
                { skill: "Reasoning", label: "I looked at why I failed and immediately tried a different method." },
                { skill: "Cavalier", label: "I laughed at the failure and turned it into a joke to hide my frustration." }
            ]
        },
        // STAGE II: YOUTH
        Operations: {
            question: "Which household chore or trade did you actually enjoy helping with?",
            options: [
                { skill: "Alter", label: "Repairing tools and gear, reshaping them to be better than before." },
                { skill: "Utilize", label: "Finding clever ways to use scrap and leftovers for everyday problems." },
                { skill: "Introduce", label: "Building and reinforcing fences or walls to protect our home." }
            ]
        },
        Ballistics: {
            question: "When practicing with a sling or bow behind the house, what was your technique?",
            options: [
                { skill: "Skirmish", label: "I practiced while moving, learning to hit targets from many angles." },
                { skill: "Precise", label: "I spent hours standing still, focused on hitting the absolute center." },
                { skill: "Thrown/Tossed", label: "I preferred hurling heavy stones, testing how much weight I could throw." }
            ]
        },
        Tactics: {
            question: "When organizing neighborhood games, how did you keep the other kids in line?",
            options: [
                { skill: "Command", label: "I spoke with an authority that made them listen and follow my lead." },
                { skill: "Exploit", label: "I found the weak points in the other team's plan and told my friends." },
                { skill: "Tactics", label: "I made sure everyone was in the right spot to maximize our chances." }
            ]
        },
        Stabilize: {
            question: "When you found an injured animal or a friend got hurt, how did you help?",
            options: [
                { skill: "First Aid", label: "I quickly applied bandages to stop the bleeding and kept them calm." },
                { skill: "Medicine", label: "I looked for herbs and natural cures that I'd heard about from elders." },
                { skill: "Surgery", label: "I was steady with a knife/tools, precisely removing thorns or splinters." }
            ]
        },
        // STAGE III: EARLY ADULTHOOD
        Coercion: {
            question: "How did you usually get your way when your parents or teachers said 'no'?",
            options: [
                { skill: "Intimidating", label: "I stood my ground and looked them in the eye until they reconsidered." },
                { skill: "Deception", label: "I wove a believable story that made them think it was their idea." },
                { skill: "Relentless", label: "I asked and asked again with such persistence that they eventually gave in." }
            ]
        },
        Suppression: {
            question: "During long, boring school lessons, how did you keep yourself from getting distracted?",
            options: [
                { skill: "Predict", label: "I anticipated what the teacher would say next to stay engaged." },
                { skill: "Impose", label: "I forced my mind into a state of absolute focus, blocking everything out." },
                { skill: "Imply", label: "I maintained such a focused expression that nobody dared interrupt me." }
            ]
        },
        Rally: {
            question: "When your friends were arguing or afraid, how did you bring them back together?",
            options: [
                { skill: "Self-Awareness", label: "I helped them face their own fear and realize why they were angry." },
                { skill: "Detached", label: "I gave them the hard facts of the situation, ignoring the emotion." },
                { skill: "Mindfulness", label: "I shared my own calm, giving them a steady presence to rely on." }
            ]
        },
        Bravery: {
            question: "What was the final thought that gave you the courage to leave your home for good?",
            options: [
                { skill: "Commitment", label: "I made a promise to someone I loved, and I intend to keep it." },
                { skill: "Determined", label: "I realized that staying meant stagnation, and I refused to settle." },
                { skill: "Outsmart", label: "I calculated that the opportunities out there far outweighed the safety here." }
            ]
        }
    },
    // --- GROUNDED REACTIVE CATALYSTS ---
    catalyst: {
        question: "What specific event finally forced you onto this journey?",
        options: [
            {
                id: "ADVENTURE",
                label: "The Call of the Wild",
                description: "You simply left home in search of adventure.",
                gear: { "main_hand": "wpn_steel_broadsword", "consumable_1": "csm_travelers_bread" },
                backstory: "You realized your potential was stifled in your village and set out to see the larger world."
            },
            {
                id: "REVENGE",
                label: "The Sibling's Vengeance",
                description: "You are hunting your sister's killer.",
                gear: { "main_hand": "wpn_steel_dagger", "consumable_1": "csm_stamina_tea" },
                backstory: "A tragedy struck your family, and you took up your blade with one goal: justice."
            },
            {
                id: "STARVATION",
                label: "The Town's Hope",
                description: "Your village is starving, and you were sent for help.",
                gear: { "main_hand": "wpn_hunting_bow", "consumable_1": "csm_travelers_bread" },
                backstory: "With the town's survival on your shoulders, you have no choice but to find a solution."
            },
            {
                id: "MYSTERY",
                label: "The Stranger's Letter",
                description: "A mysterious letter arrived offering opportunity.",
                gear: { "main_hand": "wpn_heavy_mace", "consumable_1": "csm_ddust" },
                backstory: "A stranger wrote to you, offering a chance at greatness if you met them at the frontier."
            },
            {
                id: "FUGITIVE",
                label: "The Wanted Fugitive",
                description: "You are wanted for a crime you didn't commit.",
                gear: { "main_hand": "wpn_short_sword", "consumable_1": "csm_stamina_tea" },
                backstory: "Falsely accused, you fled into the wilds to stay ahead of the law and find the truth."
            },
            {
                id: "SHIPWRECK",
                label: "The Sea-Washed Stranger",
                description: "You were shipwrecked and lost in a strange land.",
                gear: { "main_hand": "wpn_rusted_axe", "consumable_1": "csm_travelers_bread" },
                backstory: "The sea took your vessel, leaving you washed up on a shore with only your wits to guide you."
            },
            {
                id: "TREASURE",
                label: "The Family Legend",
                description: "You found a map to an old family inheritance.",
                gear: { "main_hand": "wpn_steel_rapier", "consumable_1": "csm_stamina_tea" },
                backstory: "An old legend of wealth was true; you have the map and the drive to claim what is yours."
            },
            {
                id: "INHERITANCE",
                label: "The Surprise Inheritance",
                description: "A sudden windfall with dangerous strings attached.",
                gear: { "main_hand": "wpn_steel_dagger", "consumable_1": "csm_stamina_tea" },
                backstory: "You inherited a title or estate you never expected, but the debt that comes with it must be paid."
            },
            {
                id: "PIONEER",
                label: "The Frontier Pioneer",
                description: "Heading for the frontier to build something new.",
                gear: { "main_hand": "wpn_iron_spear", "consumable_1": "csm_travelers_bread" },
                backstory: "The old lands are crowded. You've set out for the frontier to carve out your own future."
            },
            {
                id: "ZEALOT",
                label: "The Zealous Messenger",
                description: "Heading out to spread the Word to the unreached.",
                gear: { "main_hand": "wpn_staff", "consumable_1": "csm_ddust" },
                backstory: "Your faith drives you. You travel to distant lands to share the truth that saved your own soul."
            },
            {
                id: "SOLDIER",
                label: "The Military Recruit",
                description: "You've left to join the army and serve.",
                gear: { "main_hand": "wpn_steel_longsword", "consumable_1": "csm_stamina_tea" },
                backstory: "The drum of war is beating. You've signed the roster and are heading for the front lines."
            },
            {
                id: "MISSION",
                label: "The Secret Scout",
                description: "You were sent on a specific mission by your unit.",
                gear: { "main_hand": "wpn_steel_dagger", "consumable_1": "csm_stamina_tea" },
                backstory: "Your orders are absolute. You are the vanguard, sent ahead to scout the path for the army."
            },
            {
                id: "SEARCH",
                label: "The Lost Loved One",
                description: "Searching for someone you lost in the chaos.",
                gear: { "main_hand": "wpn_hunting_bow", "consumable_1": "csm_travelers_bread" },
                backstory: "They disappeared without a trace. You won't stop until you find them or know their fate."
            },
            {
                id: "BETRAYED",
                label: "The Hunt for the Traitor",
                description: "Betrayed and hunting down the one who did it.",
                gear: { "main_hand": "wpn_steel_dagger", "consumable_1": "csm_stamina_tea" },
                backstory: "A friend or ally sold you out. You are hunting them down to settle the score."
            },
            {
                id: "EXPLORER",
                label: "The Map-Maker",
                description: "Exploring and documenting new lands and people.",
                gear: { "main_hand": "wpn_staff", "consumable_1": "csm_ddust" },
                backstory: "Whether it's plants, animals, or people, you are driven to document every corner of the world."
            },
            {
                id: "CURE",
                label: "The Cure Seeker",
                description: "Seeking a cure for a sickness you or a loved one has.",
                gear: { "main_hand": "wpn_staff", "consumable_1": "csm_ddust" },
                backstory: "Time is running out. You've left home to find the rare ingredients for a life-saving cure."
            },
            {
                id: "DESTROYED",
                label: "The Home-less Survivor",
                description: "Your village was destroyed; you have nowhere to go.",
                gear: { "main_hand": "wpn_iron_spear", "consumable_1": "csm_travelers_bread" },
                backstory: "Bandits or war left your home in ashes. You wander because there is nothing left to return to."
            },
            {
                id: "VISION",
                label: "The Visionary Path",
                description: "You had a vision that told you to go.",
                gear: { "main_hand": "wpn_staff", "consumable_1": "csm_ddust" },
                backstory: "A dream or a sign from the heavens set you on this path. You don't know where it leads, but you must follow."
            },
            {
                id: "SCAVENGER",
                label: "The Scavenger",
                description: "Just hunting or scavenging for food to survive.",
                gear: { "main_hand": "wpn_hunting_bow", "consumable_1": "csm_travelers_bread" },
                backstory: "Survival is the only goal. You've left your barren lands to find more fertile hunting grounds."
            },
            {
                id: "CARAVAN",
                label: "The Caravan Guard",
                description: "You're part of a caravan traveling between towns.",
                gear: { "main_hand": "wpn_heavy_mace", "consumable_1": "csm_stamina_tea" },
                backstory: "You earn your bread protecting merchants on the long, dangerous roads through the dust."
            },
            {
                id: "SPY",
                label: "The Undercover Spy",
                description: "You're a spy on a mission of vital importance.",
                gear: { "main_hand": "wpn_steel_dagger", "consumable_1": "csm_stamina_tea" },
                backstory: "Your identity is a lie. You travel to infiltrate and report on the enemies of your people."
            },
            {
                id: "BARD",
                label: "The Traveling Bard",
                description: "Traveling to collect songs, stories, and fame.",
                gear: { "main_hand": "wpn_staff", "consumable_1": "csm_stamina_tea" },
                backstory: "The world is your audience. You travel to find the legends that will make your name immortal."
            },
            {
                id: "RELIC",
                label: "The Relic Hunter",
                description: "Seeking out ancient and powerful artifacts.",
                gear: { "main_hand": "wpn_rusted_axe", "consumable_1": "csm_ddust" },
                backstory: "The past holds the keys to the future. You hunt for relics of the old world."
            }
        ]
    },
    schools: {
        prime: {
            question: "Which field of study did you focus on during your early training?",
            options: [
                { id: "MIGHT", label: "The Nexus", description: "Study of physical force and leverage." },
                { id: "ENDURANCE", label: "The Mass", description: "Study of density and structural protection." },
                { id: "REFLEXES", label: "The Motus", description: "Study of velocity and the tempo of action." },
                { id: "FINESSE", label: "The Flux", description: "Study of phase and shifting states of matter." },
                { id: "VITALITY", label: "The Vita", description: "Study of biological growth and repair." },
                { id: "FORTITUDE", label: "The Lex", description: "Study of unbending rules and immunities." },
                { id: "KNOWLEDGE", label: "The Ratio", description: "Study of analysis and telekinetic will." },
                { id: "LOGIC", label: "The Ordo", description: "Study of geometry and elemental alchemy." },
                { id: "AWARENESS", label: "The Lux", description: "Study of sight, light, and total perception." },
                { id: "INTUITION", label: "The Omen", description: "Study of luck and the vibrations of fate." },
                { id: "CHARM", label: "The Aura", description: "Study of resonance and the command of emotion." },
                { id: "WILLPOWER", label: "The Anumis", description: "Study of zeal and the bonding of spirits." }
            ]
        },
        aux: {
            question: "What secondary subject complement your primary field of study?",
            options: [
                { id: "MIGHT", label: "The Nexus", description: "Study of physical force and leverage." },
                { id: "ENDURANCE", label: "The Mass", description: "Study of density and structural protection." },
                { id: "REFLEXES", label: "The Motus", description: "Study of velocity and the tempo of action." },
                { id: "FINESSE", label: "The Flux", description: "Study of phase and shifting states of matter." },
                { id: "VITALITY", label: "The Vita", description: "Study of biological growth and repair." },
                { id: "FORTITUDE", label: "The Lex", description: "Study of unbending rules and immunities." },
                { id: "KNOWLEDGE", label: "The Ratio", description: "Study of analysis and telekinetic will." },
                { id: "LOGIC", label: "The Ordo", description: "Study of geometry and elemental alchemy." },
                { id: "AWARENESS", label: "The Lux", description: "Study of sight, light, and total perception." },
                { id: "INTUITION", label: "The Omen", description: "Study of luck and the vibrations of fate." },
                { id: "CHARM", label: "The Aura", description: "Study of resonance and the command of emotion." },
                { id: "WILLPOWER", label: "The Anumis", description: "Study of zeal and the bonding of spirits." }
            ]
        }
    }
};
