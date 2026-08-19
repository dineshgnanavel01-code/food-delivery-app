/**
 * WANDERPOST — Postcard Editorial theme
 * Asymmetric editorial hero: off-center text block left, overlapping tilted
 * postcard photo collage right. Dark ink text on dark hero image handled via
 * parchment overlay gradient on the text side.
 */
const HERO = "/manus-storage/hero-paris_9db7b423.jpg";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <img src={HERO} alt="Paris at golden hour" className="h-full w-full object-cover" />
        {/* Gradient: parchment on text side, gentle darkening on photo side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.972 0.012 85 / 0.97) 0%, oklch(0.972 0.012 85 / 0.92) 34%, oklch(0.972 0.012 85 / 0.45) 52%, oklch(0.24 0.02 170 / 0.28) 100%)",
          }}
        />
      </div>

      <div className="container relative grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
        <div className="max-w-xl">
          <p className="stamp-badge mb-6 reveal">
            <span aria-hidden>✦</span> Curated since 2024
          </p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.04] text-foreground">
            The world reads{" "}
            <em className="text-primary not-italic md:inline">
              <span className="italic">better</span>
            </em>{" "}
            <br className="hidden md:block" />
            in person.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/75 reveal" data-delay="80">
            Wanderpost plans literary, hand-crafted journeys for travelers who
            want stories, not checklists. One stamp in your passport at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 reveal" data-delay="160">
            <a
              href="#destinations"
              className="rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              Browse Destinations
            </a>
            <a
              href="#tours"
              className="ink-underline text-base font-semibold text-foreground"
            >
              Explore signature tours →
            </a>
          </div>

          {/* Editorial stats strip */}
          <div className="mt-14 flex items-center gap-8 border-t-2 border-dashed border-foreground/25 pt-6 reveal" data-delay="240">
            {[
              ["42", "curated trips"],
              ["14", "countries"],
              ["4.9★", "traveler rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-bold text-foreground">{n}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tilted postcard collage */}
        <div className="relative hidden h-[420px] lg:block">
          <figure className="postcard absolute left-[8%] top-0 w-[62%] rotate-[-3deg]" data-delay="120">
            <div className="postcard-inner aspect-[4/3]">
              <img src="/manus-storage/maldives_c01b8746.jpg" alt="Maldives overwater villa" />
            </div>
          </figure>
          <figure className="postcard absolute bottom-0 right-0 w-[58%] rotate-[2.5deg]" data-delay="220">
            <div className="postcard-inner aspect-[4/3]">
              <img src="/manus-storage/bali_f504f8a6.jpg" alt="Bali rice terraces" />
            </div>
          </figure>
          <span className="stamp-badge absolute -top-2 right-[10%] rotate-6 bg-background">
            <span aria-hidden>✈</span> 14 countries
          </span>
        </div>
      </div>
    </section>
  );
}
