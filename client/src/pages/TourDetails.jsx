/**
 * Wanderpost — TourDetails page (assignment bonus)
 * Full package details: itinerary highlights, inclusions, price and booking CTA.
 * Uses mock data only (no backend).
 */
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Star, MapPin, Clock, Check, Sparkles, BadgeDollarSign, Headset } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import NotFound from "@/pages/NotFound";
import { packages } from "@/data/tours";
import { useReveal } from "@/hooks/useReveal";

const inclusions = [
  "Return flights from major hubs",
  "Hand-picked boutique accommodation",
  "All airport and intercity transfers",
  "Guided local experiences per itinerary",
  "Travel insurance guidance",
];

const dayPlans = [
  { day: "Day 1–2", title: "Arrival & Orientation", body: "Settle in, meet your local host, and ease into the rhythm of the destination with a light first evening." },
  { day: "Day 3–5", title: "The Heart of the Journey", body: "Signature experiences: guided walks, local workshops and the sights you came for, paced with breathing room." },
  { day: "Final Days", title: "Souvenirs & Farewells", body: "Free mornings for markets and cafes, a farewell dinner, and a smooth, supported journey home." },
];

export default function TourDetails() {
  const [, params] = useRoute("/tour/:id");
  const pkg = packages.find((p) => p.id === params?.id);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pkg?.id]);

  if (!pkg) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        {/* Banner */}
        <section className="relative h-[46vh] min-h-[320px]">
          <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
          <div className="container relative z-10 flex h-full flex-col justify-end pb-10">
            <Link href="/#packages" className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Packages
            </Link>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-4.5 w-4.5 text-[oklch(0.78_0.13_40)]" aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-wider">{pkg.duration}</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-extrabold text-white">{pkg.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-white/85">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden /> {pkg.destination}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden /> {pkg.rating} ({pkg.reviews} reviews)
              </span>
            </div>
          </div>
        </section>

        <section className="container py-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow reveal">Itinerary at a Glance</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold reveal" data-delay="60">
              How the journey <em className="text-primary">unfolds</em>
            </h2>
            <div className="mt-8 space-y-0">
              {dayPlans.map((d, i) => (
                <div key={d.day} className="reveal flex gap-5 pb-8" data-delay={i * 70}>
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/60 font-display text-xs font-bold text-primary">{d.day.replace("Day ", "")}</span>
                    {i < dayPlans.length - 1 && <span className="mt-2 h-full w-0 border-l-2 border-dashed border-primary/40" aria-hidden />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="reveal sticky top-28 rounded-2xl border border-border bg-card p-7 shadow-lg">
              <h3 className="font-display text-2xl font-bold">Book this journey</h3>
              <div className="route-line my-5" aria-hidden />
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-primary">${pkg.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/ person</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.duration} · {pkg.destination}</p>

              <ul className="mt-6 space-y-2.5">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => alert(`${pkg.name} booking — demo`)}
                className="mt-7 w-full rounded-full bg-primary py-3.5 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                Book Now
              </button>

              <div className="mt-5 flex items-center justify-center gap-5 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5"><BadgeDollarSign className="h-4 w-4" aria-hidden /> Best Price</span>
                <span className="flex items-center gap-1.5"><Headset className="h-4 w-4" aria-hidden /> 24/7 Support</span>
                <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4" aria-hidden /> Curated</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
