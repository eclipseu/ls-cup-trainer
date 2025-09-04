"use client";

import Link from "next/link";
import Button from "@/components/atoms/Buttons";
import {
  HiChartBar,
  HiAcademicCap,
  HiBookOpen,
  HiFire,
  HiMicrophone,
  HiCog,
  HiArrowRight,
  HiPlay,
  HiLightBulb,
  HiHeart,
  HiUsers,
  HiStar,
  HiAcademicCap as HiCap,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Array of 50+ Lasallian identity reminders
const lasallianReminders = [
  "Being a Lasallian means leading with heart, serving with purpose.",
  "Faith, service, and communion: the Lasallian way.",
  "Enter to learn, leave to serve.",
  "The Lasallian spirit: transforming lives through education.",
  "One heart, one commitment, one La Salle.",
  "Live the values of St. John Baptist de La Salle.",
  "Teaching minds, touching hearts, transforming lives.",
  "In the Lasallian tradition, every person matters.",
  "Serve with humility, lead with integrity.",
  "The Lasallian mission: education for all.",
  "Character formation is as important as academic excellence.",
  "Building a faith-filled community of learners.",
  "Lasallians: innovators in education and service.",
  "Creating inclusive communities where all belong.",
  "Educating for a more just and humane world.",
  "The Lasallian prayer: Let us remember that we are in the holy presence of God.",
  "Excellence with a heart, competence with conscience.",
  "Leadership rooted in service and compassion.",
  "Scholarship with a social dimension.",
  "Making a difference, one student at a time.",
  "The Lasallian graduate: academically competent, spiritually grounded.",
  "Fostering faith, zeal for service, and communion in mission.",
  "Education as a means to transform society.",
  "Walking with students on their educational journey.",
  "The Lasallian tradition: 300+ years of educational innovation.",
  "Concern for the poor and social justice.",
  "Nurturing the whole person: mind, body, and spirit.",
  "Character, competence, and compassion.",
  "Education that liberates and humanizes.",
  "Creating pathways of opportunity for all.",
  "Respect for the individual and community.",
  "Learning by doing and reflecting.",
  "Education as an act of hope.",
  "Building a culture of peace through education.",
  "The Lasallian family: united in mission and purpose.",
  "Faith in the presence of God.",
  "Concern for the whole person.",
  "Inclusive community.",
  "Respect for all persons.",
  "Quality education.",
  "Education for justice and peace.",
  "The Lasallian spirit: innovative, adaptive, responsive.",
  "Creating educational experiences that transform.",
  "Learning together and by association.",
  "Touching hearts before teaching minds.",
  "Seeing the potential in every student.",
  "Educators of the heart.",
  "Making God's love visible through education.",
  "Walking with the young on their journey of faith.",
  "Responding to the signs of the times.",
  "Building bridges of understanding and compassion.",
  "Lasallian education: a journey of transformation.",
  "From the classroom to the community: living our values.",
  "The Lasallian star: guiding our educational mission.",
  "Creating a better world through education.",
  "The Lasallian prayer: Live Jesus in our hearts, forever!",
  "Education as an instrument of change.",
  "Forming persons of faith and virtue.",
  "Academic excellence with a moral compass.",
];

export default function HomePage() {
  const [currentReminder, setCurrentReminder] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentReminder((prev) => (prev + 1) % lasallianReminders.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50">
      {/* Header/Navigation */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
          <HiLightBulb className="text-red-600" />
          Your all-in-one preparation companion
        </div>

        <h1 className="text-5xl font-bold text-red-800 mb-6 leading-tight">
          Master Your <span className="text-red-500">LASALLIAN CUP</span> with
          Confidence
        </h1>

        <p className="mt-4 text-xl text-gray-600 max-w-2xl leading-relaxed">
          Your comprehensive platform for Q&A practice, 6-week review planning,
          advocacy development, and performance drills — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                className="flex items-center justify-center gap-2 px-6 py-4 text-lg"
              >
                Explore Dashboard{" "}
                <span className="flex items-center justify-center">
                  <HiArrowRight />
                </span>
              </Button>
            </motion.div>
          </Link>

          <Link href="/practice">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 px-6 py-4 text-lg"
              >
                Start Practice{" "}
                <span className="flex items-center justify-center">
                  <HiPlay />
                </span>
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-3xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-red-600">100+</div>
            <div className="text-gray-600">Practice Questions</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-red-600">6</div>
            <div className="text-gray-600">Week Program</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-800 mb-4">
            Everything You Need to Succeed
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<HiChartBar className="text-3xl text-red-500" />}
              title="Dashboard"
              description="Track your 6-week plan progress and daily study tasks with intuitive visualizations."
            />
            <FeatureCard
              icon={<HiAcademicCap className="text-3xl text-red-500" />}
              title="Practice Q&A"
              description="Flashcards and guided formula: Acknowledge → Idea → Connect → Impact."
            />
            <FeatureCard
              icon={<HiBookOpen className="text-3xl text-red-500" />}
              title="Advocacy Planning"
              description="Plan your advocacy with goals, KPIs, and timelines for maximum impact."
            />
            <FeatureCard
              icon={<HiFire className="text-3xl text-red-500" />}
              title="Drills"
              description="Daily speaking, breathing, and stage presence practice routines."
            />
            <FeatureCard
              icon={<HiMicrophone className="text-3xl text-red-500" />}
              title="Mock Sessions"
              description="Simulate live Q&A with a timer and judge scoring rubric for realistic practice."
            />
            <FeatureCard
              icon={<HiCog className="text-3xl text-red-500" />}
              title="User Tools"
              description="Import content (Q&A banks, reviewers) and manage your data efficiently."
            />
          </div>
        </div>
      </section>

      {/* Lasallian Identity Reminders Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <HiHeart className="text-3xl text-yellow-300" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">
            Lasallian Identity Reminder
          </h2>

          <div className="relative h-32 flex items-center justify-center">
            <div
              className={`transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <blockquote className="text-2xl italic font-light leading-relaxed">
                &quot;{lasallianReminders[currentReminder]}&quot;
              </blockquote>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-10 opacity-20">
              <HiStar className="text-yellow-200 text-4xl" />
            </div>
            <div className="absolute bottom-0 right-10 opacity-20">
              <HiCap className="text-yellow-200 text-4xl" />
            </div>
            <div className="absolute top-10 right-1/4 opacity-20">
              <HiUsers className="text-yellow-200 text-4xl" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
              {lasallianReminders.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentReminder % 5 === index
                      ? "bg-yellow-300"
                      : "bg-white/30"
                  }`}
                  onClick={() => {
                    setFade(false);
                    setTimeout(() => {
                      setCurrentReminder(index);
                      setFade(true);
                    }, 500);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} LS Cup Trainer App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      className="p-6 rounded-xl border border-red-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 group hover:border-red-300"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="mb-4 p-2 bg-red-50 rounded-lg w-fit group-hover:bg-red-100 transition-colors"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-red-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
