/*
 * DINA FOOD — "Emerald Harvest" OrderConfirmation
 * Success message, order ID, estimated delivery time, ordered items,
 * total, order tracking UI, back to home.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { FiArrowRight, FiCheckCircle, FiMapPin, FiPackage } from "react-icons/fi";

const STEPS = [
  { id: "confirmed", label: "Order confirmed", time: "Just now" },
  { id: "preparing", label: "Kitchen is preparing", time: "~5 min" },
  { id: "picked", label: "Rider picked up", time: "~15 min" },
  { id: "delivered", label: "Delivered", time: "~30 min" },
];

function formatEstimate() {
  const d = new Date(Date.now() + 35 * 60 * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function OrderConfirmation() {
  const order = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("harveat-last-order") || "null");
    } catch {
      return null;
    }
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  // Simulated order progress
  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStep(1), 4000),
      setTimeout(() => setActiveStep(2), 10000),
      setTimeout(() => setActiveStep(3), 20000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="container flex-1 flex flex-col items-center justify-center gap-4 py-20 text-center">
          <span className="text-5xl">🍽️</span>
          <h1 className="font-display text-2xl font-extrabold">No recent order found</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Place an order from the checkout page to see your confirmation here.
          </p>
          <Link
            href="/restaurants"
            className="mt-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white transition-all active:scale-[0.97]">
            Browse restaurants
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-10">
        <div className="mx-auto max-w-2xl fade-up">
          {/* Success header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
              <FiCheckCircle className="h-12 w-12 text-emerald" />
            </span>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              Order placed — deliciousness incoming!
            </h1>
            <p className="text-muted-foreground">
              Thanks for ordering with Dina Food. Your food is being prepared with care.
            </p>
          </div>

          {/* Order meta */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <span className="eyebrow mb-1.5">Order ID</span>
              <p className="font-display text-lg font-bold">{order.id}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <span className="eyebrow mb-1.5">Estimated delivery</span>
              <p className="font-display text-lg font-bold">~35 min</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <span className="eyebrow mb-1.5">Arriving by</span>
              <p className="font-display text-lg font-bold">{formatEstimate()}</p>
            </div>
          </div>

          {/* Tracking UI */}
          <section className="mt-8 rounded-3xl border border-border bg-card p-6">
            <h2 className="eyebrow mb-5 justify-center sm:justify-start">
              <FiMapPin className="h-3.5 w-3.5" /> Track your order
            </h2>
            <ol className="relative space-y-6">
              <span className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
              {STEPS.map((s, i) => {
                const done = i <= activeStep;
                return (
                  <li key={s.id} className="relative flex items-start gap-4">
                    <span
                      className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                        done
                          ? "border-emerald bg-emerald text-white"
                          : "border-border bg-card"
                      }`}>
                      {done && <FiCheckCircle className="h-4 w-4" />}
                    </span>
                    <div className="pt-0.5">
                      <p className={`text-sm font-semibold ${done ? "" : "text-muted-foreground"}`}>
                        {s.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.time}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Ordered items + total */}
          <section className="mt-6 rounded-3xl border border-border bg-card p-6">
            <h2 className="eyebrow mb-4 justify-center sm:justify-start">
              <FiPackage className="h-3.5 w-3.5" /> Ordered items
            </h2>
            <ul className="space-y-3 border-b border-dashed border-border pb-4">
              {order.items.map(({ food, quantity }) => (
                <li key={food.id} className="flex items-center gap-3">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <span className="flex-1 text-sm">
                    {food.name} <span className="text-muted-foreground">×{quantity}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    ${(food.price * quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-lg font-bold">Total paid</span>
              <span className="font-display text-2xl font-extrabold text-papaya tabular-nums">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </section>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex-1 rounded-full bg-emerald px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-all active:scale-[0.97] hover:bg-[oklch(0.47_0.1_165)]">
              Back to Home
            </Link>
            <Link
              href="/restaurants"
              className="flex-1 rounded-full border border-emerald/40 px-6 py-3.5 text-center text-sm font-semibold text-emerald transition-colors hover:bg-emerald hover:text-white">
              Order more <FiArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
