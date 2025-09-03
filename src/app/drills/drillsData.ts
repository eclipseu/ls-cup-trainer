import { IconType } from "react-icons";
import {
  HiChat,
  HiFire,
  HiSpeakerphone,
  HiPlay,
  HiFastForward,
  HiHand,
  HiEye,
  HiUser,
  HiCheckCircle,
  HiClock,
} from "react-icons/hi";

export interface Drill {
  title: string;
  description: string;
  duration: number; // in minutes
  icon: IconType;
  examples?: string[]; // optional examples list
}

export interface DrillCategory {
  title: string;
  drills: Drill[];
}

export const drillsData: DrillCategory[] = [
  {
    title: "Speaking Drills",
    drills: [
      {
        title: "Warm-up Articulation",
        description: "Tongue twisters and over-enunciating simple sentences.",
        duration: 10,
        icon: HiChat,
        examples: [
          "Red leather, yellow leather.",
          "She sells seashells by the seashore.",
          "Peter Piper picked a peck of pickled peppers.",
          "Unique New York.",
          "Black bug bleeds black blood.",
          "Toy boat, toy boat, toy boat.",
          "I scream, you scream, we all scream for ice cream.",
          "Fuzzy Wuzzy was a bear.",
          "A proper copper coffee pot.",
          "Six slippery snails slid slowly seaward.",
          "Fresh fried fish.",
          "Which wristwatches are Swiss wristwatches?",
          "Big black bear sat on a big black rug.",
          "Eleven benevolent elephants.",
          "Red lorry, yellow lorry.",
          "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
          "A tutor who tooted a flute tried to tutor two tooters to toot.",
          "Thin sticks, thick bricks.",
          "Four furious friends fought for the phone.",
          "Green glass globes glow greenly.",
          "Irish wristwatch, Swiss wristwatch.",
          "Betty Botter bought some butter.",
          "Lesser leather never weathered wetter weather better.",
          "Good blood, bad blood.",
          "Friendly fleas and fireflies flew.",
          "Rolling red wagons.",
          "Greek grapes, green grapes.",
          "Sheena leads, Sheila needs.",
          "Brisk brave brigadiers brandished broad bright blades.",
          "Three free throws.",
          "How can a clam cram in a clean cream can?",
          "Two tiny tigers take two taxis to town.",
          "Fred fed Ted bread, and Ted fed Fred bread.",
          "The thirty-three thieves thought they thrilled the throne throughout Thursday.",
          "A big black bug bit a big black bear.",
          "The great Greek grape growers grow great Greek grapes.",
          "If two witches were watching two watches, which witch would watch which watch?",
          "Can you can a can as a canner can can a can?",
          "Six sick hicks nick six slick bricks with picks and sticks.",
          "Rory the warrior and Roger the worrier were reared wrongly in a rural brewery.",
          "A loyal warrior will rarely worry why we rule.",
          "Double bubble gum, bubbles double.",
          "Truly rural.",
          "Cooks cook cupcakes quickly.",
          "If a dog chews shoes, whose shoes does he choose?",
          "The bootblack brought the black boot back.",
          "Wayne went to Wales to watch walruses.",
          "Six sleek swans swam swiftly southwards.",
          "Shy Shelly says she shall sew sheets.",
          "The seething sea ceaseth and thus the seething sea sufficeth us.",
        ],
      },
      {
        title: "Voice Projection",
        description: "Read a paragraph while increasing volume gradually.",
        duration: 5,
        icon: HiSpeakerphone,
        examples: [
          "The forest is alive with sounds both subtle and grand. Birds call from the treetops, while the rustle of leaves whispers beneath your feet. Speaking to a crowd is like standing in that forest: your voice must rise above the noise, carrying clearly and confidently so that even the furthest listener feels included.",
          "Confidence is not the absence of fear, but the decision to move forward despite it. Every great speaker began with trembling hands and a shaking voice. With practice, the tremble turns into rhythm, and the shaking becomes strength. Speak as though your words matter, because they do.",
          "Long ago, travelers gathered around fires to share their stories. They spoke of triumphs, struggles, and dreams yet to come. Today, when you stand before an audience, you continue that tradition. Your voice becomes the fire, your words the sparks that light imaginations and warm hearts.",
          "Every idea, no matter how powerful, needs a voice to give it life. Persuasion is not about volume alone but about conviction. When you project with confidence, people don’t just hear your words—they feel your belief. Speak not only to their ears but also to their hearts.",
          "Imagine walking into a bustling café filled with chatter, clinking cups, and music in the background. To be heard, you must raise your voice just enough to stand out without shouting. Practicing projection is like being in that café: finding the balance between volume and clarity, so that your words cut through the noise with ease.",
        ],
      },
      {
        title: "Pacing & Clarity",
        description:
          "Record yourself speaking at different tempos and listen back.",
        duration: 5,
        icon: HiFastForward,
        examples: [
          "Choose a short, familiar paragraph.",
          "1. Slow Pace: Read the paragraph very slowly, pausing at every comma and period. Enunciate every single syllable clearly. (1.5 minutes)",
          "2. Medium Pace: Read the same paragraph at a normal, conversational speed. (1.5 minutes)",
          "3. Fast Pace: Read it again, this time much faster, as if you're excited, but without sacrificing clarity. (1 minute)",
          "If you have a recording app, record all three and listen to the difference.",
        ],
      },
    ],
  },
  {
    title: "Breathing Drills",
    drills: [
      {
        title: "Diaphragmatic Breathing",
        description: "Breathe deep, expanding your diaphragm.",
        duration: 5,
        icon: HiFire,
        examples: [
          "Sit or lie down in a comfortable position.",
          "Place one hand on your upper chest and the other on your belly, just below your rib cage.",
          "Inhale slowly through your nose for a count of 4. Feel your stomach rise as you breathe in. The hand on your chest should remain relatively still.",
          "Hold your breath for a count of 4.",
          "Exhale slowly through your mouth for a count of 6, feeling your stomach fall.",
          "Repeat this cycle for the duration of the drill.",
        ],
      },
      {
        title: "Breath Control",
        description: "Say a long sentence in one breath.",
        duration: 5,
        icon: HiPlay,
        examples: [
          "Take a deep diaphragmatic breath.",
          "As you exhale, recite the alphabet slowly (A... B... C...). See how far you can get before needing another breath.",
          "Try again, aiming to get further.",
          "Next, try saying this long sentence in one breath: 'I am practicing my breath control to become a more confident and effective speaker, ensuring my voice remains steady and strong throughout my entire presentation.'",
          "Repeat, trying to say it smoothly without rushing.",
        ],
      },
      {
        title: "Endurance Training",
        description: "Sustain a vowel sound ('ahhh') for as long as possible.",
        duration: 5,
        icon: HiClock,
        examples: [
          "Take a deep diaphragmatic breath.",
          "As you exhale, make a steady 'ahhh' sound for as long as you can without straining. Keep the volume and pitch consistent.",
          "Rest for 30 seconds.",
          "Repeat the exercise, trying to hold the sound for a second or two longer each time.",
          "You can also try with other vowel sounds like 'eee', 'ooo', 'ohh'.",
        ],
      },
    ],
  },
  {
    title: "Stage Presence Drills",
    drills: [
      {
        title: "Body Awareness",
        description: "Practice standing tall, balanced, and relaxed.",
        duration: 5,
        icon: HiUser,
        examples: [
          "Stand in front of a mirror.",
          "Plant your feet shoulder-width apart, with your weight evenly distributed.",
          "Roll your shoulders back and down, away from your ears.",
          "Keep your chin parallel to the floor.",
          "Imagine a string pulling you up from the crown of your head, elongating your spine.",
          "Hold this posture, breathing deeply. Walk around the room while maintaining this posture.",
        ],
      },
      {
        title: "Gesture Practice",
        description: "Deliver a line using intentional hand movements.",
        duration: 5,
        icon: HiHand,
        examples: [
          "Choose a simple, expressive sentence, like: 'I have three important points to share with you today.'",
          "Practice saying it while using your hands to emphasize the meaning. For 'three', you could hold up three fingers.",
          "For 'share with you', you could use an open-palm gesture towards your imaginary audience.",
          "Record yourself. Do the gestures look natural or forced? Adjust and repeat.",
          "Try other lines: 'This is a huge opportunity for us.' (use expansive gestures) or 'Let's focus on this one key detail.' (use a precise, focused gesture).",
        ],
      },
      {
        title: "Eye Contact Simulation",
        description: "Practice scanning a simulated audience.",
        duration: 5,
        icon: HiEye,
        examples: [
          "Set up a few objects in front of you (e.g., chairs, pillows, water bottles) to represent audience members.",
          "Begin speaking about any topic.",
          "As you speak, make 'eye contact' with one object for 3-5 seconds (a full phrase or sentence).",
          "Move to another object in a different part of the 'room' and make eye contact there.",
          "Practice scanning the entire 'audience' smoothly and naturally, without darting your eyes around.",
        ],
      },
      {
        title: "Confidence Drill",
        description: "Recite a short speech in front of a mirror with energy.",
        duration: 5,
        icon: HiCheckCircle,
        examples: [
          "Choose a short, motivational quote or a paragraph you admire.",
          "Stand in front of a mirror in your 'power pose'.",
          "Recite the text with energy and conviction. Smile!",
          "Use expressive gestures and facial expressions that match the words.",
          "Make eye contact with yourself in the mirror.",
          "The goal is not perfect delivery, but to practice projecting confidence and passion.",
        ],
      },
    ],
  },
];

export const dailyRoutine = [
  {
    name: "Warm-up",
    duration: 10,
    details: "Breathing + light vocal warm-ups",
  },
  {
    name: "Speaking Drills",
    duration: 15,
    details: "Tongue twisters, projection, pacing",
  },
  {
    name: "Breathing Drills",
    duration: 15,
    details: "Diaphragm, control, endurance",
  },
  {
    name: "Stage Presence",
    duration: 20,
    details: "Gestures, posture, mock performance",
  },
  {
    name: "Review (Optional)",
    duration: 10,
    details: "Record and review your performance",
  },
];
