/**
 * Wanderpost — WhyChooseUs (assignment brief)
 * 4 feature cards: Best Price Guarantee, Trusted Travel Partners,
 * 24/7 Customer Support, Easy & Secure Booking.
 */
import { BadgeDollarSign, Handshake, Headset, ShieldCheck } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description:
      "Find a lower price elsewhere and we'll match it — transparent pricing with no hidden fees, ever.",
  },
  {
    icon: Handshake,
    title: "Trusted Travel Partners",
    description:
      "We work only with verified airlines, hotels and local guides with proven safety records.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Real humans, any timezone. Before, during and after your trip, help is one message away.",
  },
  {
    icon: ShieldCheck,
    title: "Easy & Secure Booking",
    description:
      "Book in minutes with encrypted payments, free changes within 48 hours and instant confirmation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow reveal">Why Choose Us</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
            Travel with <em className="text-primary">total confidence</em>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
