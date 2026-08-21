/**
 * Soft Atelier — Product Performance
 * Asymmetric cards with product imagery, sales volume bars,
 * trend chips, stock indicators, and hover lift.
 */
import { ArrowDown, ArrowUp } from "lucide-react";
import { products, formatCurrency } from "@/data/dashboard";

const maxSold = Math.max(...products.map((p) => p.sold));

export default function ProductPerformance() {
  return (
    <section className="card-soft card-soft-lift flex h-full flex-col overflow-hidden rounded-2xl bg-card">
      <div className="relative flex items-end justify-between border-b border-border bg-[oklch(0.30_0.06_155)] px-5 pb-3.5 pt-4 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[oklch(0.65_0.12_140)] via-[oklch(0.78_0.13_85)] to-[oklch(0.65_0.14_40)]" />
        <div>
          <h3 className="font-display text-lg font-semibold">Product Performance</h3>
          <p className="text-xs text-white/60">Units sold this month</p>
        </div>
        <button
          onClick={() => alert("Product catalog coming soon")}
          className="text-xs font-medium text-white/80 underline-offset-2 hover:text-white hover:underline"
        >
          View catalog
        </button>
      </div>

      <div className="space-y-5 p-5">
        {products.map((p) => {
          const pct = (p.sold / maxSold) * 100;
          const positive = p.trend >= 0;
          const lowStock = p.stock < 25;
          return (
            <div key={p.id} className="group flex gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category} · {p.sold} units</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <p className="text-sm font-semibold tabular-nums">{formatCurrency(p.revenue)}</p>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        positive
                          ? "bg-[oklch(0.94_0.04_145)] text-[oklch(0.42_0.09_145)]"
                          : "bg-[oklch(0.94_0.03_28)] text-[oklch(0.48_0.14_28)]"
                      }`}
                    >
                      {positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      {Math.abs(p.trend)}%
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-2.5">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[oklch(0.55_0.12_140)] to-[oklch(0.38_0.09_155)] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`shrink-0 text-[11px] font-medium ${lowStock ? "text-[var(--terracotta)]" : "text-muted-foreground"}`}>
                    {lowStock ? `Low stock: ${p.stock}` : `${p.stock} in stock`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
