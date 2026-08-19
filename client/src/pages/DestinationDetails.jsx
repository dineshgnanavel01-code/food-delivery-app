/**
 * Wanderpost — DestinationDetails page (assignment bonus)
 * Shows destination info, related packages, and a booking CTA.
 * Uses mock data only (no backend).
 */
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, MapPin, Star, Clock, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import NotFound from "@/pages/NotFound";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/tours";
import { useReveal } from "@/hooks/useReveal";

export default function DestinationDetails() {
  const [, params] = useRoute("/destination/:id");
  const destination = destinations.find((d) => d.id === params?.id);
  const related = packages.filter((p) => p.destination.toLowerCase().includes(destination?.country.toLowerCase() || ""));
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destination?.id]);

  if (!destination) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        {/* Hero banner */}
        <section className="relative h-[46vh] min-h-[320px]">
          <img src={destination.image} alt={`${destination.name}, ${destination.country}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
          <div className="container relative z-10 flex h-full flex-col justify-end pb-10">
            <Link href="/#destinations" className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Destinations
            </Link>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5 text-[oklch(0.78_0.13_40)]" aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-wider">{destination.country}</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-extrabold text-white">{destination.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-white/85">{destination.description}</p>
          </div>
        </section>

        {/* Overview stats */}
        <section className="container py-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Package, label: "Starting from", value: `$${destination.price.toLocaleString()} / person` },
              { icon: MapPin, label: "Region", value: destination.category },
              { icon: Star, label: "Rated", value: "4.9 / 5 by travelers" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <Icon className="mx-auto h-7 w-7 text-primary" aria-hidden />
                <div className="mt-3 font-display text-xl font-bold">{value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="eyebrow reveal">Featured Packages</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold reveal" data-delay="60">
              Tours departing to <em className="text-primary">{destination.name}</em>
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.length > 0 ? (
                related.map((p, i) => (
                  <div key={p.id} className="reveal" data-delay={i * 70}>
                    <PackageCard pkg={p} />
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                  <Clock className="mx-auto h-8 w-8" aria-hidden />
                  <p className="mt-3">No featured packages listed for this destination yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
