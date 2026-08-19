/**
 * Wanderpost — Testimonials section (assignment brief)
 * Grid of TestimonialCard components from mock data.
 * NOTE: mock testimonials used for the assignment UI demo; labeled as such.
 */
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow reveal">Testimonials</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight reveal" data-delay="60">
            Stories from <em className="text-primary">our travelers</em>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground reveal" data-delay="100">
            Illustrative sample testimonials created for this demo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <div key={t.id} className="reveal" data-delay={i * 70}>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
