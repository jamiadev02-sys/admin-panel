import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/80 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white hover:text-amber-400 transition">
          Book Store Admin
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition">Orders</Link>
          <Link to="/add" className="text-slate-400 hover:text-white transition">Add Book</Link>
        </nav>
      </div>
    </header>
  );
}
