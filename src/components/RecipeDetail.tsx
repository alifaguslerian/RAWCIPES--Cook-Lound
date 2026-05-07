import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart3, Plus, Minus, Check, Heart, Share2 } from 'lucide-react';
import recipes from '../data/recipes.json';
import { Recipe } from '../types';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === id) as Recipe | undefined;
  
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  if (!recipe) {
    return (
      <div className="max-w-[1280px] mx-auto px-8 py-20 text-center">
        <h1 className="h-title text-6xl mb-8">Recipe Not Found</h1>
        <Link to="/" className="neu-button bg-primary-yellow">Back to Browse</Link>
      </div>
    );
  }

  const scale = servings / recipe.servings;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-2 mb-8 font-h1 font-bold uppercase hover:text-tertiary-blue group">
        <ArrowLeft className="w-5 h-5 stroke-[3px] group-hover:-translate-x-1 transition-transform" />
        Back to browse
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Hero Image & Info */}
        <div className="flex-1">
          <div className="neu-card neu-shadow relative aspect-video lg:aspect-auto lg:h-[600px]">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
              <span className="bg-secondary-red text-white neu-border px-4 py-1.5 font-h1 font-bold uppercase shadow-sm">
                {recipe.category}
              </span>
              <span className="bg-primary-yellow neu-border px-4 py-1.5 font-h1 font-bold uppercase shadow-sm">
                {recipe.cookTime + recipe.prepTime} MIN
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:w-[400px] flex flex-col gap-8">
          <div>
            <h1 className="h-title text-6xl break-words mb-4">{recipe.title}</h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="bg-secondary-red text-white neu-border neu-shadow p-6 space-y-4">
            <div className="flex justify-between items-center border-b-[3px] border-black pb-3">
              <span className="font-h1 font-bold uppercase text-sm opacity-80">Prep Time</span>
              <span className="h-title text-3xl italic">{recipe.prepTime}m</span>
            </div>
            <div className="flex justify-between items-center border-b-[3px] border-black pb-3">
              <span className="font-h1 font-bold uppercase text-sm opacity-80">Cook Time</span>
              <span className="h-title text-3xl italic">{recipe.cookTime}m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-h1 font-bold uppercase text-sm opacity-80">Difficulty</span>
              <span className="h-title text-3xl italic">{recipe.difficulty}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex-1 bg-primary-yellow neu-button flex items-center justify-center gap-3 !py-5 !text-2xl shadow-none hover:shadow-sm">
              <Heart className="w-8 h-8 fill-neublack stroke-[3px]" />
              SAVE
            </button>
            <button className="w-20 bg-white neu-button flex items-center justify-center shadow-none hover:shadow-sm">
              <Share2 className="w-8 h-8 stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-t-[4px] border-neublack mb-16" />

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Ingredients Column */}
        <div className="w-full lg:w-1/3 neu-card neu-shadow sticky top-24">
          <div className="bg-tertiary-blue text-white p-6 border-b-[4px] border-neublack">
            <h2 className="h-title text-4xl italic">Ingredients</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between bg-gray-100 neu-border p-3">
              <span className="font-h1 font-bold uppercase text-sm pl-2">Servings</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setServings(s => Math.max(1, s - 1))}
                  className="w-10 h-10 bg-white neu-border flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5 stroke-[4px]" />
                </button>
                <span className="h-title text-3xl w-8 text-center">{servings}</span>
                <button 
                  onClick={() => setServings(s => s + 1)}
                  className="w-10 h-10 bg-primary-yellow neu-border flex items-center justify-center hover:bg-primary-yellow/80 transition-colors"
                >
                  <Plus className="w-5 h-5 stroke-[4px]" />
                </button>
              </div>
            </div>

            <ul className="space-y-4">
              {recipe.ingredients.map((ing, idx) => (
                <li 
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`
                    flex gap-4 items-start pb-4 border-b-2 border-neublack border-dashed cursor-pointer select-none group
                    ${checkedIngredients[idx] ? 'opacity-40' : ''}
                  `}
                >
                  <div className={`
                    w-7 h-7 shrink-0 neu-border flex items-center justify-center transition-colors
                    ${checkedIngredients[idx] ? 'bg-primary-yellow' : 'bg-white group-hover:bg-gray-100'}
                  `}>
                    {checkedIngredients[idx] && <Check className="w-5 h-5 stroke-[4px]" />}
                  </div>
                  <div className="text-xl font-medium">
                    <span className="font-h1 font-black">
                      {ing.amount > 0 ? (ing.amount * scale).toFixed(ing.amount % 1 === 0 ? 0 : 1) : ''} {ing.unit}{' '}
                    </span>
                    {ing.item}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Column */}
        <div className="w-full lg:w-2/3 space-y-12">
          <h2 className="h-title text-5xl py-2 border-b-[4px] border-neublack inline-block">Instructions</h2>
          <div className="space-y-8">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="bg-white neu-border flex flex-col md:flex-row relative">
                <div className="bg-primary-yellow text-neublack h-title text-7xl md:w-32 flex items-center justify-center p-8 border-b-[4px] md:border-b-0 md:border-r-[4px] border-neublack md:shrink-0">
                  {idx + 1}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="h-title text-3xl mb-4 italic">{step.title}</h3>
                  <p className="text-xl leading-relaxed font-medium text-gray-700">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
