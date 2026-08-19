/**
 * Wanderpost — HeroSection (assignment brief)
 * Heading "Explore the World, One Journey at a Time", short description,
 * background travel image, CTA linking to the search box.
 */
const HERO = "/manus-storage/hero-globe_764475cf.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-end">
      {/* Background travel image */}
      <div className="absolute inset-0">
        <img
          src={HERO}
          alt="Travelers overlooking a golden mountain valley"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />
      </div>

      <div className="container relative z-10 pb-28 pt-40 lg:pb-36">
        <p className="eyebrow mb-5 text-white/80" style={{ color: "oklch(0.75 0.12 40)" }}>
          ✦ Curated journeys worldwide
        </p>
        <h1 className="font-display max-w-3xl text-[clamp(2.6rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] text-white">
          Explore the World, <br />
          <em className="text-[oklch(0.78_0.13_40)]">One Journey at a Time</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Hand-crafted travel packages to the planet's most beautiful
          destinations — planned by locals, priced fairly, and booked in minutes.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <a
            href="#search"
            className="rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          >
            Plan Your Trip
          </a>
          <a
            href="#destinations"
            className="ink-underline text-base font-semibold text-white"
          >
            View Destinations →
          </a>
        </div>
      </div>
    </section>
  );
}
