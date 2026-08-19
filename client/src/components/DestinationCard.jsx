/**
 * Wanderpost — DestinationCard (assignment brief)
 * Image, name, country, short description, starting price, Explore button.
 */
import { MapPin, ArrowRight } from "lucide-react";

export default function DestinationCard({ destination }) {
  const { name, country, description, image, price } = destination;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute right-3 top-3 rounded-full bg-card/95 px-3.5 py-1.5 text-xs font-bold text-foreground backdrop-blur-sm">
          From <span className="text-primary">${price.toLocaleString()}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
          {country}
        </div>
        <h3 className="font-display text-xl font-bold">{name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-foreground/70">{description}</p>
        <button
          onClick={() => alert(`Exploring ${name} — demo`)}
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border-2 border-primary px-5 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground group-hover:gap-3"
        >
          Explore <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
