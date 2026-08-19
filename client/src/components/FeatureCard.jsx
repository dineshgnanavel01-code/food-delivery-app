/**
 * Wanderpost — FeatureCard (assignment brief)
 * Icon, title, description with hover lift animation.
 */
export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <div
      className="reveal group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
      data-delay={delay}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h3 className="font-display mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{description}</p>
    </div>
  );
}
