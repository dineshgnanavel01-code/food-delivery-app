/**
 * Wanderpost — DestinationSection (assignment brief + bonus)
 * Popular destinations grid with category filtering and 6 destination cards.
 */
import { useMemo, useState } from "react";
import DestinationCard from "./DestinationCard";
import { destinations, categories } from "@/data/destinations";

export default function DestinationSection() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? destinations : destinations.filter((d) => d.category === category)),
    [category]
  );

  return (
    <section id="destinations" className="py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow reveal">Popular Destinations</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
              Places worth <em className="text-primary">your next story</em>
            </h2>
          </div>
          <span className="stamp-badge hidden rotate-2 sm:inline-flex">✦ 6 destinations</span>
        </div>

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2 reveal" data-delay="100">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                category === c
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <div key={d.id} className="reveal" data-delay={i * 60}>
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground">No destinations in this category yet.</p>
        )}
      </div>
    </section>
  );
}
