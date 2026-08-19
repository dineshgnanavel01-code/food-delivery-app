/**
 * Wanderpost — Newsletter (assignment brief)
 * Attractive background, heading, description, email input with validation,
 * Subscribe button.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Please enter a valid email (e.g. name@example.com).");
      return;
    }
    setError("");
    toast.success("You're subscribed!", {
      description: `Travel deals and destination stories will arrive at ${trimmed}.`,
    });
    setEmail("");
  };

  return (
    <section className="paper-grain relative overflow-hidden bg-ink py-20 text-parchment lg:py-24">
      {/* Decorative glowing orbs */}
      <span className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />
      <span className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[oklch(0.5_0.07_195)]/25 blur-3xl" aria-hidden />

      <div className="container relative max-w-3xl text-center">
        <span className="stamp-badge mx-auto mb-6 rotate-2 bg-ink" style={{ borderColor: "oklch(0.7 0.12 40)", color: "oklch(0.75 0.12 40)" }}>
          <Mail className="h-3.5 w-3.5" aria-hidden /> The Weekly Dispatch
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight">
          Subscribe to <em className="text-[oklch(0.75_0.12_40)]">travel inspiration</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-parchment/70">
          One letter a week: destination stories, hidden gems and exclusive
          offers worth packing for. No spam — just stamps.
        </p>
        <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            aria-invalid={!!error}
            aria-describedby={error ? "nl-error" : undefined}
            className={`h-12 flex-1 rounded-full border bg-parchment/10 px-5 text-base text-parchment placeholder:text-parchment/40 focus:outline-none focus:ring-2 focus:ring-[oklch(0.75_0.12_40)] ${
              error ? "border-red-400" : "border-parchment/30"
            }`}
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-[oklch(0.63_0.15_40)] px-7 text-base font-bold text-primary-foreground transition-all hover:bg-[oklch(0.68_0.15_40)]"
          >
            Subscribe
          </button>
        </form>
        {error && (
          <p id="nl-error" className="mt-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
