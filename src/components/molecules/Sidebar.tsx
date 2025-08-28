import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-48 bg-gray-100 h-screen p-4">
      <nav className="flex flex-col gap-3">
        <Link href="/">🏠 Home</Link>
        <Link href="/dashboard">📊 Dashboard</Link>
        <Link href="/practice">🃏 Practice</Link>
        <Link href="/advocacy">📖 Advocacy</Link>
        <Link href="/drills">💪 Drills</Link>
        <Link href="/mock">🎤 Mock Session</Link>
        <Link href="/admin">⚙️ Admin</Link>
      </nav>
    </aside>
  );
}
