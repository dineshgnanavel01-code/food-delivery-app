/**
 * Wanderpost — Contact page (assignment bonus)
 * Contact form with validation + contact information cards. Static demo, no backend.
 */
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      toast.success("Message sent!", { description: "Our team will reply within 24 hours (demo)." });
      setForm({ name: "", email: "", message: "" });
    }
  };

  const field = (id, error) =>
    `w-full rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-red-400" : "border-input"}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow reveal">Contact Us</p>
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold reveal" data-delay="60">
              Let's plan your <em className="text-primary">next chapter</em>
            </h1>
            <p className="mt-4 text-base text-foreground/70 reveal" data-delay="120">
              Questions about a package or a custom itinerary? Send us a note —
              a real human reads every message.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                { icon: MapPin, title: "Visit Us", text: "12 Explorer Lane, Marina Bay, Singapore 018956" },
                { icon: Phone, title: "Call Us", text: "+65 6123 4567 (Mon–Sun)" },
                { icon: Mail, title: "Email Us", text: "hello@wanderpost.travel" },
                { icon: Clock, title: "Working Hours", text: "24/7 support for booked travelers" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="reveal flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={submit} className="reveal rounded-2xl border border-border bg-card p-7 shadow-xl" data-delay="120">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="eyebrow" htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" type="text" value={form.name} onChange={set("name")} placeholder="Jane Explorer" className={field("contact-name", errors.name)} aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="eyebrow" htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={field("contact-email", errors.email)} aria-invalid={!!errors.email} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="eyebrow" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about the journey you have in mind…"
                    className={field("contact-message", errors.message)}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" aria-hidden /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
