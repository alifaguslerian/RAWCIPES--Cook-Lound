import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b-[4px] border-neublack sticky top-0 z-50 px-8 py-3 neu-shadow">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <Link to="/" className="h-title text-4xl hover:-translate-y-1 transition-transform">
          RAWCIPES
        </Link>
        <nav className="hidden md:flex gap-10">
          <Link to="/" className="font-h1 font-bold uppercase text-tertiary-blue underline decoration-[4px] underline-offset-4">Browse</Link>
          <button className="font-h1 font-bold uppercase hover:text-tertiary-blue transition-colors">Collections</button>
          <button className="font-h1 font-bold uppercase hover:text-tertiary-blue transition-colors">Community</button>
        </nav>
        <button className="bg-primary-yellow neu-button !py-2 !px-5 !text-sm">
          Submit Recipe
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t-[4px] border-neublack p-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="h-title text-3xl">RAWCIPES. COOK LOUD OR GO HOME.</div>
        <div className="flex gap-8 font-h1 font-bold uppercase text-sm">
          <button className="hover:text-tertiary-blue">Manifesto</button>
          <button className="hover:text-tertiary-blue">Terms</button>
          <button className="hover:text-tertiary-blue">Gear</button>
          <button className="hover:text-tertiary-blue">Support</button>
        </div>
        <div className="font-h1 font-bold text-xs uppercase opacity-40">
          &copy; 2024 RAWCIPES
        </div>
      </div>
    </footer>
  );
}
