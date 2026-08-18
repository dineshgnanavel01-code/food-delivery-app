/*
 * DINA FOOD — "Emerald Harvest" Dishes catalog
 * All dishes across all restaurants: search + category filter chips + grid.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import { restaurants } from "../data/restaurants";
import { foods } from "../data/foods";

const ALL = "";
const CATEGORIES = [ALL, ...Array.from(new Set(foods.map((f) => f.category)))];

export default function Dishes() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const filtered = useMemo(() => {
    let list = [...foods];
    if (category) list = list.filter((f) => f.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, category]);

  const rMap = useMemo(() => Object.fromEntries(restaurants.map((r) => [r.id, r])), []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center fade-up lg:text-left">
          <span className="eyebrow mb-2 justify-center sm:justify-start">— Every dish, one place</span>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Dishes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse {filtered.length} dish{filtered.length === 1 ? "" : "es"} from {restaurants.length} kitchens
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={query} onChange={setQuery} placeholder="Search dishes…" />
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((c) => (
              <button
                key={c === ALL ? "__all" : c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === c
                    ? "border-emerald bg-emerald text-white"
                    : "border-border bg-card text-foreground/70 hover:border-emerald/40"
                }`}>
                {c === ALL ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-semibold">No dishes found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((f) => (
              <div key={f.id} className="flex flex-col">
                <FoodCard food={f} />
                <Link
                  href={`/restaurant/${f.restaurantId}`}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-center text-xs font-medium text-muted-foreground hover:border-emerald/40 hover:text-emerald transition-colors">
                  {rMap[f.restaurantId]?.name ?? "Restaurant"}
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
