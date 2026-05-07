/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import recipesData from './data/recipes.json';
import { Recipe, Category } from './types';

const recipes = recipesData as Recipe[];

function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const filteredRecipes = useMemo<Recipe[]>(() => {
    return (recipesData as Recipe[]).filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || recipe.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="max-w-[1280px] mx-auto px-8 py-12 space-y-12">
      {/* Hero Header */}
      <section className="bg-primary-yellow neu-border p-12 neu-shadow flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <h1 className="h-title text-8xl">COOK LOUD.</h1>
          <p className="text-2xl font-medium max-w-xl text-gray-800 leading-relaxed">
            No delicate garnishes. No apologies. Just high-impact, face-melting recipes for people who actually eat.
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="md:w-1/3 aspect-square neu-border bg-white neu-shadow overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" 
            alt="Hero Noodle" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="space-y-4">
        <h2 className="font-h1 font-black text-sm uppercase tracking-widest text-center opacity-50">Filter by Vibe</h2>
        <FilterChips selected={category} onSelect={setCategory} />
      </section>

      {/* Grid Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b-[4px] border-neublack pb-4">
          <h2 className="h-title text-5xl italic">Heavy Hitters</h2>
          <div className="h-title text-lg opacity-40">{filteredRecipes.length} RESULTS</div>
        </div>
        
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="h-title text-4xl text-gray-400">Nothing found for your chaos.</h3>
          </div>
        )}
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
