/**
 * Wanderpost — Footer (assignment brief)
 * Logo, about info, quick links, popular destinations, contact info,
 * social media icons, copyright.
 */
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const LOGO = "/manus-storage/logo-stamp_3c7f21d6.png";

const quickLinks = [
  { label: "Home", href: "/#" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/#packages" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

const popularDestinations = [
  { label: "Bali", href: "/destination/bali" },
  { label: "Dubai", href: "/destination/dubai" },
  { label: "Paris", href: "/destination/paris" },
  { label: "Maldives", href: "/destination/maldives" },
  { label: "Swiss Alps", href: "/destination/swiss-alps" },
  { label: "Singapore", href: "/destination/singapore" },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const socialClick = (label) => {
    toast(`${label} — coming soon`, { description: "Social links are placeholders for this demo." });
  };

  return (
    <footer id="contact" className="bg-ink pb-10 pt-16 text-parchment">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand / About */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <img src={LOGO} alt="Wanderpost logo" className="h-11 w-11" />
              <span className="font-display text-2xl font-bold">
                Wander<span className="italic text-[oklch(0.7_0.12_40)]">post</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/65">
              Curated journeys for travelers who read the world before they
              stamp it. Hand-planned, small-group, story-first — with trusted
              partners and 24/7 support behind every trip.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => socialClick(label)}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-parchment/25 text-parchment/75 transition-all hover:border-[oklch(0.7_0.12_40)] hover:text-[oklch(0.75_0.12_40)] hover:-translate-y-0.5"
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h3 className="eyebrow text-[oklch(0.7_0.12_40)]">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ink-underline text-sm text-parchment/75 hover:text-parchment">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular Destinations */}
          <nav aria-label="Popular Destinations">
            <h3 className="eyebrow text-[oklch(0.7_0.12_40)]">Popular Destinations</h3>
            <ul className="mt-5 space-y-3">
              {popularDestinations.map((d) => (
                <li key={d.label}>
                  <Link href={d.href} className="ink-underline text-sm text-parchment/75 hover:text-parchment">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-[oklch(0.7_0.12_40)]">Contact Us</h3>
            <ul className="mt-5 space-y-4 text-sm text-parchment/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.7_0.12_40)]" aria-hidden />
                12 Explorer Lane, Marina Bay, Singapore 018956
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[oklch(0.7_0.12_40)]" aria-hidden />
                +65 6123 4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[oklch(0.7_0.12_40)]" aria-hidden />
                hello@wanderpost.travel
              </li>
            </ul>
          </div>
        </div>

        <div className="route-line mt-14" aria-hidden />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-parchment/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Wanderpost. All rights reserved.</p>
          <p className="font-display italic">"Explore the world, one journey at a time."</p>
        </div>
      </div>
    </footer>
  );
}
