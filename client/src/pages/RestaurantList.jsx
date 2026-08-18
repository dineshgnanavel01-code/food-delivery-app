/*
 * DINA FOOD — "Emerald Harvest" RestaurantList
 * Search + category filter chips + sort + restaurant cards grid + empty state.
 */
import { useMemo, useState } from "react";
import { useSearch } from "wouter";
import { FiFilter } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";
import { categories } from "../data/categories";
import { restaurants } from "../data/restaurants";

export default function RestaurantList() {
  const search = useSearch();
  const initialCategory = useMemo(
    () => new URLSearchParams(search).get("category") ?? "",
    [search],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sortKey, setSortKey] = useState("rating");

  const filtered = useMemo(() => {
    let list = [...restaurants];
    if (category) list = list.filter((r) => r.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    list.sort((a, b) => {
      if (sortKey === "rating") return b.rating - a.rating;
      if (sortKey === "deliveryTime") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return a.deliveryFee - b.deliveryFee;
    });
    return list;
  }, [query, category, sortKey]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center fade-up lg:text-left">
          <span className="eyebrow mb-2 justify-center sm:justify-start">— Where the good stuff lives</span>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Restaurants near you
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} kitchen{filtered.length === 1 ? "" : "s"} around Downtown
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={query} onChange={setQuery} placeholder="Search by name, cuisine or tag…" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <FiFilter className="h-4 w-4" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2.5 outline-none focus:border-emerald/50">
              <option value="rating">Top rated</option>
              <option value="deliveryTime">Fastest delivery</option>
              <option value="deliveryFee">Lowest fee</option>
            </select>
          </label>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          <button
            onClick={() => setCategory("")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.96] ${
              !category ? "bg-emerald text-white shadow-sm" : "border border-border bg-card hover:border-emerald/40"
            }`}>
            All cuisines
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(category === c.id ? "" : c.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.96] ${
                category === c.id
                  ? "bg-emerald text-white shadow-sm"
                  : "border border-border bg-card hover:border-emerald/40"
              }`}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
            {filtered.map((r, i) => (
              <div key={r.id} className="fade-up" style={{ animationDelay: `${(i % 8) * 50}ms` }}>
                <RestaurantCard restaurant={r} tilt={i % 2 === 0 ? -0.75 : 0.75} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-5xl">🍽️</span>
            <h2 className="font-display text-xl font-extrabold">No kitchens match that</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Try a different search or clear the filters — there's always
              something delicious around the corner.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
              className="mt-2 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.97]">
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
