export interface Question {
  id: number;
  text: string;
  category: string;
  sampleAnswer: string;
}

export const questionsData: Question[] = [
  // Personal
  {
    id: 1,
    text: "Tell us about yourself.",
    category: "Personal",
    sampleAnswer:
      "I'm [Name], a Computer Science student at De La Salle Lipa. I enjoy solving problems and helping others through tech projects and community service.",
  },
  {
    id: 2,
    text: "Why did you join Mr./Ms. LS Cup?",
    category: "Personal",
    sampleAnswer:
      "I joined to develop leadership skills, represent DLSL with integrity, and inspire fellow students to take part in meaningful activities.",
  },
  {
    id: 3,
    text: "What is your proudest achievement and why?",
    category: "Personal",
    sampleAnswer:
      "My proudest achievement is leading a student-led tech workshop, because it helped peers gain skills and confidence they didn't have before.",
  },
  {
    id: 4,
    text: "Who inspired you the most growing up?",
    category: "Personal",
    sampleAnswer:
      "My older sibling inspired me most; they taught me perseverance and the value of helping others, which shaped my approach to leadership.",
  },
  {
    id: 5,
    text: "Describe a failure and what you learned from it.",
    category: "Personal",
    sampleAnswer:
      "I once missed a project deadline because I didn't manage my time well. I learned to prioritize tasks and plan ahead carefully.",
  },
  {
    id: 6,
    text: "If you had one superpower, what would it be and why?",
    category: "Personal",
    sampleAnswer:
      "I would choose the power of instant learning, so I could quickly gain knowledge to help my community and classmates.",
  },

  // Lasallian Values & School
  {
    id: 7,
    text: "What does being a Lasallian mean to you?",
    category: "Lasallian Values & School",
    sampleAnswer:
      "Being a Lasallian means leading with service, integrity, and compassion, while striving for personal excellence and community impact.",
  },
  {
    id: 8,
    text: "Which Lasallian value resonates with you the most and why?",
    category: "Lasallian Values & School",
    sampleAnswer:
      "Faith in the presence of God resonates most with me because it guides me to act responsibly and ethically in all situations.",
  },
  {
    id: 9,
    text: "How will you represent DLSL on and off campus?",
    category: "Lasallian Values & School",
    sampleAnswer:
      "I will represent DLSL by demonstrating integrity, volunteering for community projects, and promoting inclusivity and teamwork.",
  },
  {
    id: 10,
    text: "How can students live out Lasallian values today?",
    category: "Lasallian Values & School",
    sampleAnswer:
      "By helping peers in need, maintaining honesty, and taking part in initiatives that improve the school and local community.",
  },
  {
    id: 11,
    text: "How would you promote unity among Lasallian students?",
    category: "Lasallian Values & School",
    sampleAnswer:
      "I would organize collaborative activities and inclusive events where students from all backgrounds can share ideas and work together.",
  },

  // Computer Science — Course-specific
  {
    id: 12,
    text: "How has Computer Science shaped your worldview?",
    category: "Computer Science",
    sampleAnswer:
      "CS taught me to think critically and solve problems systematically, showing me how technology can improve lives globally.",
  },
  {
    id: 13,
    text: "Describe one tech solution you would build for our campus.",
    category: "Computer Science",
    sampleAnswer:
      "I would build a mobile app for DLSL students to track community service hours, join events, and collaborate on projects.",
  },
  {
    id: 14,
    text: "How can CS students help address educational inequality?",
    category: "Computer Science",
    sampleAnswer:
      "By developing platforms for online tutoring, creating affordable learning resources, and teaching digital literacy to underserved students.",
  },
  {
    id: 15,
    text: "Are there ethical responsibilities for CS students?",
    category: "Computer Science",
    sampleAnswer:
      "Yes, CS students must ensure their technology is used responsibly, respects privacy, and benefits society rather than causing harm.",
  },
  {
    id: 16,
    text: "Explain a technical concept (e.g., algorithms) in one sentence to non-CS people.",
    category: "Computer Science",
    sampleAnswer:
      "An algorithm is a step-by-step recipe for solving a problem efficiently, like instructions to bake a cake.",
  },

  // Advocacy & Social Issues
  {
    id: 17,
    text: "What is your advocacy and why did you choose it?",
    category: "Advocacy & Social Issues",
    sampleAnswer:
      "My advocacy is digital inclusion, because I want everyone to have access to knowledge and opportunities online.",
  },
  {
    id: 18,
    text: "How would you measure the success of your advocacy in 6 months?",
    category: "Advocacy & Social Issues",
    sampleAnswer:
      "By tracking participation, engagement, and skills gained by students in workshops or community programs.",
  },
  {
    id: 19,
    text: "Who would you partner with to scale your advocacy?",
    category: "Advocacy & Social Issues",
    sampleAnswer:
      "I would collaborate with school organizations, local NGOs, and tech companies to expand outreach and resources.",
  },
  {
    id: 20,
    text: "How would you fund your project if there is no budget?",
    category: "Advocacy & Social Issues",
    sampleAnswer:
      "Through sponsorships, volunteer support, and organizing fundraising activities or digital campaigns.",
  },

  // Current Events & Opinion
  {
    id: 21,
    text: "What major issue is Philippine youth facing today?",
    category: "Current Events & Opinion",
    sampleAnswer:
      "Youth face mental health challenges and limited access to quality education, which affects their growth and opportunities.",
  },
  {
    id: 22,
    text: "What is your opinion on social media's role in activism?",
    category: "Current Events & Opinion",
    sampleAnswer:
      "Social media is a powerful tool for raising awareness, but it must be used responsibly to avoid misinformation.",
  },
  {
    id: 23,
    text: "How can schools support mental health better?",
    category: "Current Events & Opinion",
    sampleAnswer:
      "By providing counseling services, mental health workshops, and fostering a supportive, non-judgmental environment.",
  },
  {
    id: 24,
    text: "What do you think about the current state of technology in education?",
    category: "Current Events & Opinion",
    sampleAnswer:
      "Technology has great potential, but access inequality and proper integration into teaching methods remain challenges.",
  },

  // Ethics & Situational
  {
    id: 25,
    text: "If a friend pressured you to cheat, what would you do?",
    category: "Ethics & Situational",
    sampleAnswer:
      "I would politely refuse, explain why it's wrong, and focus on completing my work honestly.",
  },
  {
    id: 26,
    text: "How would you respond if a fellow candidate was accused of wrongdoing?",
    category: "Ethics & Situational",
    sampleAnswer:
      "I would wait for verified information, avoid spreading rumors, and act with fairness and integrity.",
  },
  {
    id: 27,
    text: "Can privacy be sacrificed for security?",
    category: "Ethics & Situational",
    sampleAnswer:
      "Not entirely; security is important, but privacy must be protected to maintain trust and ethical standards.",
  },
  {
    id: 28,
    text: "How do you handle misinformation in your community?",
    category: "Ethics & Situational",
    sampleAnswer:
      "By verifying facts before sharing, educating peers, and promoting critical thinking and reliable sources.",
  },

  // Curveballs & Redirections
  {
    id: 29,
    text: "Who did you vote for in the last election?",
    category: "Curveballs & Redirections",
    sampleAnswer:
      "I stay neutral, but I encourage everyone to participate responsibly in the democratic process.",
  },
  {
    id: 30,
    text: "What's your religion?",
    category: "Curveballs & Redirections",
    sampleAnswer:
      "I respect all religions and focus on universal values like compassion and integrity.",
  },
  {
    id: 31,
    text: "If we gave you ₱100,000 today, how would you spend it?",
    category: "Curveballs & Redirections",
    sampleAnswer:
      "I would fund a community project that teaches tech skills to underprivileged youth.",
  },
  {
    id: 32,
    text: "What's one secret about you nobody knows?",
    category: "Curveballs & Redirections",
    sampleAnswer:
      "I secretly enjoy creating short motivational videos to inspire my friends and peers.",
  },
];
export const categories = [...new Set(questionsData.map((q) => q.category))];
