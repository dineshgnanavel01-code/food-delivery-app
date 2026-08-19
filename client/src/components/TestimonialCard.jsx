/**
 * Wanderpost — TestimonialCard (assignment brief)
 * Avatar, name, star rating, review and destination visited.
 * NOTE: placeholder testimonials for the assignment UI demo only.
 */
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  const { name, avatar, rating, review, destination } = testimonial;
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Quote className="h-8 w-8 text-primary/30" aria-hidden />
      <div className="mt-4 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className="h-14 w-14 rounded-full border-2 border-primary/30 object-cover"
        />
        <div>
          <h3 className="font-display text-lg font-bold">{name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {destination}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/75 italic">"{review}"</p>
    </article>
  );
}
