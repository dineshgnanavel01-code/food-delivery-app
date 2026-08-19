/**
 * WANDERPOST — Postcard Editorial theme
 * Asymmetric about spread: tilted traveler photo left, editorial copy right,
 * dashed route line connecting feature stamps.
 */
const ABOUT_IMG = "/manus-storage/about-traveler_158b13b7.jpg";

const features = [
  {
    title: "Written by travelers, planned by locals",
    body: "Every itinerary is drafted with the people who live the destination — not a template pulled from a boardroom.",
  },
  {
    title: "Small editions, never mass print runs",
    body: "Groups cap at eight travelers so every journey keeps the intimacy of a personal letter.",
  },
  {
    title: "A chapter left blank on purpose",
    body: "Each trip reserves unplanned hours, because the best stories are the ones you didn't schedule.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <figure className="postcard mx-auto w-full max-w-md rotate-[-2deg] lg:order-2 reveal">
          <div className="postcard-inner aspect-[3/4]">
            <img src={ABOUT_IMG} alt="A traveler reading a map at a sunlit station" loading="lazy" />
          </div>
        </figure>

        <div className="lg:order-1">
          <p className="eyebrow reveal">About the journal</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
            We believe travel should{" "}
            <em className="text-primary">read like a novel</em>, not a spreadsheet.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/75 reveal" data-delay="120">
            Wanderpost began as a notebook of borrowed maps and dog-eared pages.
            Today it is a small atelier of journey-makers who treat every trip as
            a story waiting to be lived — paced, curated, and bound with care.
          </p>

          <div className="mt-10 space-y-0">
            {features.map((f, i) => (
              <div key={f.title} className="reveal" data-delay={180 + i * 80}>
                <div className="flex gap-5">
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/60 font-display text-sm font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < features.length - 1 && <span className="route-line mt-2 h-full w-0 border-l-2 border-dashed border-primary/40" aria-hidden />}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-display text-lg font-bold">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
