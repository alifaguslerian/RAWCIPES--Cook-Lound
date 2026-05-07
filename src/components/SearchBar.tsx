import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="FIND SOMETHING SPICY..."
        className="w-full bg-white neu-border p-5 pl-14 font-h1 text-2xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-tertiary-blue/20"
      />
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-neublack stroke-[3px]" />
    </div>
  );
}
