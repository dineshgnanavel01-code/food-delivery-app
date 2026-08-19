/**
 * Wanderpost — PackageSection (assignment brief)
 * Featured travel packages grid rendering the 6 named packages.
 */
import PackageCard from "./PackageCard";
import { packages } from "@/data/tours";

export default function PackageSection() {
  return (
    <section id="packages" className="bg-secondary/50 py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow reveal">Featured Packages</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
            Bestselling <em className="text-primary">travel packages</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 reveal" data-delay="120">
            Six signature journeys, priced per person and planned end-to-end —
            flights, stays, transfers and experiences included.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <div key={p.id} className="reveal" data-delay={i * 60}>
              <PackageCard pkg={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
