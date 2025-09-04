export interface Question {
  id: number;
  text: string;
  category: string;
  sampleAnswer: string;
  timeLimit: string;
}

export const questionsData: Question[] = [
  // Personal Excellence & Character
  {
    id: 1,
    text: "If you could write a letter to your future self 10 years from now, what would be the most important message you'd want to share?",
    category: "Personal Excellence & Character",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a powerful question that really makes me reflect on what matters most in life. **Main Idea:** The most important message would be to never forget that true success isn't measured by achievements alone, but by the positive impact you've made on others' lives. **Connection:** As a Lasallian, I've learned that our purpose goes beyond personal success—it's about service, faith, and building communities where everyone can thrive. **Impact:** Ten years from now, I want to look back and see not just my accomplishments, but the lives I've touched, the students I've mentored, and the positive change I've helped create in our world."
  },
  {
    id: 2,
    text: "What's the most valuable lesson someone younger than you has taught you?",
    category: "Personal Excellence & Character",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's such an insightful question because we often underestimate what younger people can teach us. **Main Idea:** A 10-year-old I tutored once told me, 'You don't have to know everything to help someone,' and it completely changed my perspective on leadership and learning. **Connection:** As a Lasallian, I realized that our mission of education isn't about having all the answers—it's about growing together, staying humble, and creating spaces where everyone can learn from each other. **Impact:** This lesson transformed me from someone who felt pressured to be perfect into a leader who embraces authenticity, admits mistakes, and focuses on genuine connection over pretending to have it all figured out."
  },
  {
    id: 3,
    text: "If you could have dinner with any Lasallian saint or founder, what would you ask them?",
    category: "Personal Excellence & Character",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** What a fascinating question that connects us to our rich Lasallian heritage. **Main Idea:** I would choose St. John Baptist de La Salle and ask him: 'How do you maintain hope and determination when trying to change systems that seem impossible to transform?' **Connection:** As a Lasallian today, I'm inspired by his dedication to educating the poor despite facing tremendous opposition, and I want to understand how he balanced idealism with practical action. **Impact:** His insights would guide me in my own mission to create positive change—helping me understand that transforming education and serving others requires both unwavering faith and strategic wisdom."
  },

  // Lasallian Values & Faith
  {
    id: 4,
    text: "How would you explain the Lasallian spirit to someone who has never heard of it before?",
    category: "Lasallian Values & Faith",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's an important question because the Lasallian spirit is something truly special that deserves to be shared. **Main Idea:** The Lasallian spirit is about creating a community where education transforms lives, where everyone—especially those who need it most—receives respect, opportunity, and genuine care. **Connection:** As a Lasallian, I've experienced how this spirit combines faith in action with practical service, building relationships that matter and never giving up on anyone's potential. **Impact:** When you embrace the Lasallian spirit, you become part of a global family united by shared values of service and integrity, where learning isn't just for personal gain but to lift others up and create positive change in the world."
  },
  {
    id: 5,
    text: "If you were tasked with creating a modern version of the Lasallian motto 'Indivisa Manent' (United We Stand), what would it be?",
    category: "Lasallian Values & Faith",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a creative challenge that honors our tradition while looking toward the future. **Main Idea:** My modern motto would be 'Together We Rise'—capturing how we unite across distances, cultures, and differences to lift each other up. **Connection:** As a Lasallian in today's digital age, I believe this emphasizes growth rather than just survival, hope rather than just endurance, speaking to young people who understand that collaboration creates opportunities. **Impact:** 'Together We Rise' maintains the Lasallian emphasis on unity while inspiring forward momentum, showing that our diversity strengthens communities and our collective action can address global challenges."
  },

  // Leadership & Service
  {
    id: 6,
    text: "Describe a time when you had to choose between personal gain and helping others. What did you choose and why?",
    category: "Leadership & Service",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a question that really tests one's values and priorities in life. **Main Idea:** During exam week, I was offered a paid internship that required immediate start, but it meant abandoning my commitment to tutor struggling classmates—I chose to honor my tutoring commitment first. **Connection:** As a Lasallian, I knew that integrity and service to others must come before personal advancement, even when it's difficult or costly. **Impact:** Not only did my classmates pass their exams, but the company later offered me an even better position after hearing about my dedication to others—proving that when we prioritize service, unexpected opportunities often follow."
  },
  {
    id: 7,
    text: "If you could solve one problem at DLSL right now, what would it be and how would you approach it?",
    category: "Leadership & Service",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a thoughtful question that challenges me to think practically about our campus community. **Main Idea:** I would address student mental health awareness by creating a comprehensive peer support network where trained volunteers provide initial emotional support and connect students with professional resources. **Connection:** As a Lasallian, I believe in caring for the whole person—mind, body, and spirit—and creating inclusive communities where everyone feels valued and heard. **Impact:** This initiative wouldn't just help individual students cope with stress and anxiety, but would transform our campus culture into one where seeking help is normalized and every Lasallian feels genuinely supported in their journey."
  },

  // Current Issues & Social Awareness
  {
    id: 8,
    text: "How can young Filipinos use technology to address climate change while staying true to Lasallian values?",
    category: "Current Issues & Social Awareness",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a crucial question connecting our responsibility as Filipinos with our calling as Lasallians. **Main Idea:** We can create digital platforms for environmental education, develop apps for resource sharing, and use social media for advocacy—but always ensuring these technologies serve marginalized communities first. **Connection:** As Lasallians, we're called to prioritize those most affected by climate change but least equipped to adapt, making sure technology becomes a tool for inclusive environmental justice. **Impact:** This approach doesn't just address climate change—it builds a more equitable future where Filipino innovation serves both our environment and our most vulnerable communities, embodying true Lasallian service."
  },
  {
    id: 9,
    text: "What role should faith play in addressing social media's impact on mental health among young people?",
    category: "Current Issues & Social Awareness",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a deeply relevant question in our digital age where young people face unprecedented challenges. **Main Idea:** Faith provides the foundation for healthy self-worth that isn't dependent on likes, followers, or online validation—reminding us that our value comes from being loved by God and our capacity to love others. **Connection:** As a Lasallian, I believe faith communities should create safe spaces for honest conversations about social media struggles and teach digital wellness based on spiritual principles. **Impact:** When young people ground their identity in faith rather than virtual approval, they can use social media as a tool for spreading positivity and truth, creating authentic connections that nurture mental health instead of undermining it."
  },

  // Innovation & Future Vision
  {
    id: 10,
    text: "If you could design the ideal Lasallian campus of 2050, what would be its most important feature?",
    category: "Innovation & Future Vision",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** What an exciting question that challenges me to envision the future of Lasallian education. **Main Idea:** The most important feature would be 'Community Connection Hubs'—spaces that seamlessly blend physical and digital environments to connect our campus with marginalized communities worldwide. **Connection:** As a Lasallian, I believe education should never be confined to campus walls but should actively engage with those who need it most, using technology to bridge geographical gaps while maintaining human connection. **Impact:** These hubs wouldn't just prepare students for the future—they would create a campus that actively builds a more just and sustainable world through continuous community engagement and collaborative problem-solving."
  },

  // Personal Challenges & Growth
  {
    id: 11,
    text: "Tell us about a moment when you failed publicly. How did it shape your character?",
    category: "Personal Challenges & Growth",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a vulnerable question that requires honest self-reflection. **Main Idea:** I organized a charity event that failed spectacularly due to poor planning—low attendance, technical problems, and we barely raised any funds, which was deeply embarrassing since many people knew about it. **Connection:** As a Lasallian, I learned that true character isn't built in success but in how we respond to failure with grace, humility, and determination to do better. **Impact:** I publicly acknowledged my mistakes, thanked those who supported the effort, and learned from every error—which enabled me to organize a successful event six months later, proving that failure can be the foundation for future success when we approach it with integrity."
  },

  // Cultural & Community Connection
  {
    id: 12,
    text: "How can we celebrate Filipino culture while embracing global citizenship as Lasallians?",
    category: "Cultural & Community Connection",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a beautiful question about balancing cultural pride with global responsibility. **Main Idea:** We celebrate Filipino culture by sharing our rich traditions, values like kapamilya and bayanihan, and our resilience, while learning from other cultures and staying rooted in our identity. **Connection:** As Lasallians, I believe our Filipino values of hospitality, creativity, and strong community bonds are gifts we offer to the world, perfectly aligning with Lasallian principles of service and relationship-building. **Impact:** This creates authentic cultural exchange where we become proud ambassadors of Filipino heritage while building bridges across cultures through shared human values, proving that local pride and global citizenship can beautifully coexist."
  },

  // Ethics & Decision Making
  {
    id: 13,
    text: "You witness a popular student leader doing something unethical. What do you do?",
    category: "Ethics & Decision Making",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's a challenging ethical dilemma that tests both courage and compassion. **Main Idea:** I would first approach them privately with compassion, giving them a chance to explain and correct their actions, because sometimes people make mistakes without realizing the full impact. **Connection:** As a Lasallian, I'm called to speak truth with love, protect the vulnerable, and maintain integrity while offering opportunities for redemption and growth. **Impact:** If they're receptive, I'd support them in making things right, but if they refuse to acknowledge the issue, I would report it to appropriate authorities—because true leadership means holding ourselves and others accountable while showing that ethical behavior isn't negotiable."
  },

  // Inspiration & Motivation
  {
    id: 14,
    text: "What message would you share with a first-year student who feels like they don't belong at DLSL?",
    category: "Inspiration & Motivation",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** That's such an important question because many students struggle with belonging, especially in their first year. **Main Idea:** I would tell them: 'You belong here not because you're perfect, but because you have something unique to offer this community—every great Lasallian started as someone who felt uncertain.' **Connection:** As a Lasallian community, our strength comes from the diversity of backgrounds, perspectives, and experiences that each person brings to our family. **Impact:** I'd encourage them to find one activity they're passionate about, connect with people who share their interests, and remember that feeling different isn't a weakness—it's often where our greatest contributions come from, and they're exactly where they need to be."
  },

  // Creative & Unexpected
  {
    id: 15,
    text: "If you could add one completely new tradition to DLSL that would still embody Lasallian values, what would it be?",
    category: "Creative & Unexpected",
    timeLimit: "1 minute",
    sampleAnswer:
      "**Acknowledge:** What a creative question that lets me imagine new ways to strengthen our Lasallian community. **Main Idea:** I would create 'Story Sharing Circles'—monthly gatherings where students, faculty, staff, and community members share personal stories of triumph, struggle, or growth in a safe, judgment-free environment. **Connection:** As Lasallians, this tradition would embody our values by fostering genuine relationships, creating opportunities for mutual support, and celebrating the diverse experiences that make our community strong. **Impact:** These circles would create lasting connections beyond campus walls, help build the inclusive and caring community that defines the Lasallian spirit, and remind us that everyone has valuable experiences that can inspire and teach others."
  }
];

export const categories = [...new Set(questionsData.map((q) => q.category))];

// AMCI Framework Guide for Contestants
export const amciFramework = {
  title: "AMCI Response Framework",
  description: "A structured approach for delivering impactful pageant answers",
  components: {
    A: {
      title: "Acknowledge",
      description: "Recognize the question and show engagement",
      examples: ["That's a great question...", "What an important topic...", "That's something I'm passionate about..."]
    },
    M: {
      title: "Main Idea",
      description: "Present your core message or position clearly",
      examples: ["The key issue is...", "I believe that...", "My approach would be..."]
    },
    C: {
      title: "Connection",
      description: "Link to Lasallian values and personal experience",
      examples: ["As a Lasallian...", "This connects to our values of...", "In my experience as a student..."]
    },
    I: {
      title: "Impact",
      description: "Explain the broader significance and future implications",
      examples: ["This would create...", "The result would be...", "This matters because..."]
    }
  }
};

// Additional judging criteria for pageant scoring
export const judgingCriteria = {
  content: "Substance and relevance of answer (30%)",
  delivery: "Confidence, clarity, and stage presence (25%)",
  lasallianValues: "Demonstration of Lasallian principles (25%)",
  authenticity: "Genuineness and personal connection (20%)"
};

// Sample follow-up questions for judges
export const followUpQuestions = [
  "Can you give us a specific example of that?",
  "How would you implement this idea practically?",
  "What challenges might you face, and how would you overcome them?",
  "How does this connect to your personal experience?",
  "What would success look like to you in this situation?"
];