/**
 * Wanderpost — AboutSection (assignment brief)
 * Travel image, company introduction, experience statistics (10K+ travelers,
 * 500+ destinations, 100+ packages, 24/7 support) and a Learn More button.
 */
const ABOUT_IMG = "/manus-storage/about-traveler_158b13b7.jpg";

const stats = [
  { value: "10K+", label: "Happy Travelers" },
  { value: "500+", label: "Destinations" },
  { value: "100+", label: "Travel Packages" },
  { value: "24/7", label: "Support" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-secondary/50 py-20 lg:py-28">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <figure className="postcard mx-auto w-full max-w-md rotate-[-2deg] reveal">
          <div className="postcard-inner aspect-[3/4]">
            <img src={ABOUT_IMG} alt="A traveler studying a map at a sunlit station" loading="lazy" />
          </div>
        </figure>

        <div>
          <p className="eyebrow reveal">Travel Experience</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
            A decade of journeys, <em className="text-primary">one promise</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/75 reveal" data-delay="120">
            Wanderpost began as a notebook of borrowed maps and dog-eared pages.
            Today we are a team of journey-makers who treat every trip as a story
            worth telling — planned with local partners, paced for real people,
            and backed by a promise that holds from booking to boarding.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="reveal rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-delay={180 + i * 70}
              >
                <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="reveal mt-10 inline-block rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            data-delay="400"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
