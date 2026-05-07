import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart3 } from 'lucide-react';
import { Recipe } from '../types';

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const diffColor = {
    'Easy': 'bg-primary-yellow',
    'Intermediate': 'bg-tertiary-blue text-white',
    'Hardcore': 'bg-secondary-red text-white'
  }[recipe.difficulty];

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="neu-card neu-shadow-hover flex flex-col group"
    >
      <div className={`h-2 border-b-[3px] border-neublack ${diffColor.split(' ')[0]}`}></div>
      <div className="aspect-[4/3] border-b-[3px] border-neublack relative overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white neu-border px-3 py-1 font-h1 font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(26,28,28,1)]">
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="h-title text-2xl mb-4 group-hover:text-tertiary-blue transition-colors">
          {recipe.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-3">
          <span className="neu-border bg-gray-100 flex items-center gap-1.5 px-3 py-1 font-h1 text-xs font-bold uppercase">
            <Clock className="w-3 h-3 stroke-[3px]" />
            {recipe.cookTime + recipe.prepTime} MINS
          </span>
          <span className={`neu-border flex items-center gap-1.5 px-3 py-1 font-h1 text-xs font-bold uppercase ${diffColor}`}>
            <BarChart3 className="w-3 h-3 stroke-[3px]" />
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
