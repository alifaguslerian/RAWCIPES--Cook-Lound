import { Category } from '../types';

interface FilterChipsProps {
  selected: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const categories: (Category | 'All')[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];

export default function FilterChips({ selected, onSelect }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            neu-button 
            ${selected === cat ? 'bg-primary-yellow translate-x-[2px] translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(26,28,28,1)]' : 'bg-white'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
