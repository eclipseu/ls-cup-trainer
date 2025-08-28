"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import CoreMessageBank from "./CoreMessageBank";

// Question data structure
interface Question {
  id: number;
  text: string;
  category: string;
  sampleAnswer: string;
}

// Sample questions data (would typically come from a JSON file)
const questionsData: Question[] = [
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

const categories = [...new Set(questionsData.map((q) => q.category))];

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter questions by selected category
  const categoryQuestions = selectedCategory
    ? questionsData.filter((q) => q.category === selectedCategory)
    : [];

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(120);
    setTimerActive(true);
    setShowSampleAnswer(false);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetPractice = () => {
    stopTimer();
    setSelectedQuestion(null);
    setUserAnswer("");
    setShowSampleAnswer(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Practice Q&A | Interview Prep</title>
        <meta
          name="description"
          content="Practice structured interview responses"
        />
      </Head>

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="pt-20 text-4xl font-bold text-emerald-800 mb-4">
            Interview Practice
          </h1>
          <p className="text-lg text-emerald-600 max-w-2xl mx-auto">
            Hone your Q&A skills with our structured response practice. Use the
            A→M→C→I framework to craft compelling answers.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Categories and Questions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
                Question Bank
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-emerald-700 mb-2">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-emerald-500 text-white"
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div>
                  <h3 className="text-lg font-medium text-emerald-700 mb-2">
                    Questions
                  </h3>
                  <div className="space-y-3">
                    {categoryQuestions.map((question) => (
                      <div
                        key={question.id}
                        onClick={() => {
                          setSelectedQuestion(question);
                          stopTimer();
                          setUserAnswer("");
                          setShowSampleAnswer(false);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedQuestion?.id === question.id
                            ? "bg-emerald-100 border-l-4 border-emerald-500"
                            : "bg-gray-50 hover:bg-emerald-50"
                        }`}
                      >
                        <p className="text-sm text-gray-700">{question.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content - Question and Answer Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timer and Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-emerald-800">
                  Practice Session
                </h2>

                <div className="flex items-center space-x-4">
                  <div
                    className={`text-xl font-mono font-bold ${
                      timeLeft < 30 ? "text-red-500" : "text-emerald-600"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex space-x-2">
                    {!timerActive ? (
                      <button
                        onClick={startTimer}
                        disabled={!selectedQuestion}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Practice
                      </button>
                    ) : (
                      <button
                        onClick={stopTimer}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                      >
                        Stop
                      </button>
                    )}
                    <button
                      onClick={resetPractice}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Question */}
              {selectedQuestion ? (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-emerald-700 mb-2">
                    Question:
                  </h3>
                  <p className="text-gray-800 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    {selectedQuestion.text}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Select a question from the question bank to begin practicing
                </div>
              )}

              {/* Framework Guide */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-emerald-700 mb-2">
                  A→M→C→I Framework Guide
                </h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1">
                      A
                    </div>
                    <p className="text-xs font-medium text-emerald-800">
                      Acknowledge
                    </p>
                    <p className="text-xs text-emerald-600">
                      That’s a great question...
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1">
                      M
                    </div>
                    <p className="text-xs font-medium text-emerald-800">
                      Main Idea
                    </p>
                    <p className="text-xs text-emerald-600">
                      'It&apos;s about solving problems...
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1">
                      C
                    </div>
                    <p className="text-xs font-medium text-emerald-800">
                      Connection
                    </p>
                    <p className="text-xs text-emerald-600">
                      As a Lasallian...
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1">
                      I
                    </div>
                    <p className="text-xs font-medium text-emerald-800">
                      Impact
                    </p>
                    <p className="text-xs text-emerald-600">
                      Not just a student of tech, but a servant-leader.
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer Input */}
              {selectedQuestion && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-emerald-700 mb-2">
                    Your Answer:
                  </h3>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here... (Try to follow the A→I→C→I framework)"
                    className="w-full h-40 p-3 border border-emerald-200 rounded-lg 
                 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                 text-black bg-white"
                    disabled={timerActive}
                  />
                </div>
              )}

              {/* Sample Answer Toggle */}
              {selectedQuestion && !timerActive && userAnswer && (
                <div className="text-center">
                  <button
                    onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-medium"
                  >
                    {showSampleAnswer
                      ? "Hide Sample Answer"
                      : "Show Sample Answer"}
                  </button>
                </div>
              )}
            </div>

            {/* Sample Answer */}
            {showSampleAnswer && selectedQuestion && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                  Sample Answer
                </h3>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedQuestion.sampleAnswer}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-emerald-700 mb-2">
                    Compare with your answer:
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>Did you directly answer the question first?</li>
                    <li>Did you provide a specific main idea?</li>
                    <li>Did you connect your experience to the role?</li>
                    <li>Did you remarkable impact?</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* CoreMessageBank Section */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 shadow-md">
        <CoreMessageBank userName="[Your Name]" />
      </div>
    </div>
  );
}
