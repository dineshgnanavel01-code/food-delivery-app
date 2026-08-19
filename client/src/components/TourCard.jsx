/**
 * WANDERPOST — Postcard Editorial theme
 * Signature tour card: tilted photo header, editorial title, highlight list
 * with dashed lead-ins, price in terracotta serif.
 */
import { Star, Clock, MapPin } from "lucide-react";

export default function TourCard({ tour }) {
  const { title, destination, image, duration, price, rating, reviews, highlights, rotation } = tour;
  return (
    <article className={`postcard flex flex-col bg-card ${rotation}`}>
      <div className="postcard-inner relative h-52 shrink-0">
        <img src={image} alt={title} loading="lazy" />
        <span className="stamp-badge absolute left-3 top-3 bg-card/95">
          <Clock className="h-3 w-3" aria-hidden /> {duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
          {destination}
        </div>
        <h3 className="font-display text-2xl font-bold leading-snug">{title}</h3>
        <ul className="space-y-1.5 text-sm text-foreground/75">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="route-line mt-[0.62rem] w-4 shrink-0" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t-2 border-dashed border-border pt-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
            {rating}
            <span className="text-muted-foreground">({reviews})</span>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl font-bold text-primary">${price.toLocaleString()}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ person</span>
          </div>
        </div>
      </div>
    </article>
  );
}
