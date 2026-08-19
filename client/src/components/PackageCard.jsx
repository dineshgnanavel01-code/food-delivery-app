/**
 * Wanderpost — PackageCard (assignment brief)
 * Package image, name, destination, duration, rating, price, View Details button.
 */
import { Star, Clock, MapPin } from "lucide-react";

export default function PackageCard({ pkg }) {
  const { name, destination, image, duration, rating, reviews, price } = pkg;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="stamp-badge absolute left-3 top-3 rotate-[-2deg] bg-card/95">
          <Clock className="h-3 w-3" aria-hidden /> {duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
          {destination}
        </div>
        <h3 className="font-display text-xl font-bold">{name}</h3>
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
          {rating}
          <span className="text-muted-foreground">({reviews} reviews)</span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t-2 border-dashed border-border pt-4">
          <div>
            <span className="font-display text-2xl font-bold text-primary">${price.toLocaleString()}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ person</span>
          </div>
          <button
            onClick={() => alert(`${name} — details preview`)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
