/**
 * Soft Atelier — Overview stat cards
 * Warm white cards with soft diffused shadows, jewel-toned top accent strips,
 * icon chips, Fraunces stat numerals, pill-shaped deltas.
 */
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { overviewStats } from "@/data/dashboard";

const icons = {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
};

const accentMap = {
  "chart-1": "oklch(0.38 0.09 155)",
  "chart-2": "oklch(0.65 0.14 40)",
  "chart-3": "oklch(0.78 0.13 85)",
  "chart-4": "oklch(0.55 0.13 300)",
  "chart-5": "oklch(0.65 0.12 140)",
};

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {overviewStats.map((s, i) => {
        const Icon = icons[s.icon];
        const positive = s.delta >= 0;
        const color = accentMap[s.accent];
        return (
          <div
            key={s.label}
            className="animate-in-rise card-soft card-soft-lift relative overflow-hidden rounded-2xl bg-card p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Jewel accent strip */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            />
            <div className="flex items-start justify-between">
              <span
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ background: `${color}14`, color }}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${
                  positive ? "bg-[oklch(0.94_0.04_145)] text-[oklch(0.42_0.09_145)]" : "bg-[oklch(0.94_0.03_28)] text-[oklch(0.48_0.14_28)]"
                }`}
              >
                {positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                {Math.abs(s.delta)}%
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-semibold tracking-tight tabular-nums">{s.value}</p>
            <div className="mt-1 flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground/70">{s.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
