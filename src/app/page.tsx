// src/app/page.tsx
import Link from "next/link";
import Button from "@/components/atoms/Buttons";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-green-700">
        Welcome to Mr. La Sallian App
      </h1>
      <p className="mt-4 max-w-xl text-gray-600">
        Your companion for Q&A practice, 6-week reviewer, advocacy planning, and
        drills — all in one place.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
        <Link href="/practice">
          <Button variant="secondary">Start Practice</Button>
        </Link>
      </div>

      {/* Quick Features Preview */}
      <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
          <p className="text-gray-600">
            Track your 6-week plan progress and daily study tasks.
          </p>
        </div>
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">🃏 Practice Q&A</h2>
          <p className="text-gray-600">
            Flashcards and guided formula: Acknowledge → Idea → Connect →
            Impact.
          </p>
        </div>
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">📖 Advocacy</h2>
          <p className="text-gray-600">
            Plan your advocacy with goals, KPIs, and timelines.
          </p>
        </div>
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">💪 Drills</h2>
          <p className="text-gray-600">
            Daily speaking, breathing, and stage presence practice.
          </p>
        </div>
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">🎤 Mock Session</h2>
          <p className="text-gray-600">
            Simulate live Q&A with a timer and judge scoring rubric.
          </p>
        </div>
        <div className="p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">⚙️ Admin</h2>
          <p className="text-gray-600">
            Import content (Q&A banks, reviewers) and manage data.
          </p>
        </div>
      </div>
    </section>
  );
}
