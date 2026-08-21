/**
 * Soft Atelier — Sales distribution charts
 * Editorial ink header bands, jewel pie segments with accent outline on hover,
 * soft dot legends with jeweled swatches, interactive center label on doughnut.
 */
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categorySales, paymentMethods, formatCurrency } from "@/data/dashboard";

function JewelTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="card-soft rounded-lg bg-popover px-3 py-2 text-sm">
      <p className="font-display font-medium">{d.name}</p>
      <p className="tabular-nums text-muted-foreground">
        {typeof d.sales === "number" ? formatCurrency(d.sales) : `${d.value}% of sales`}
      </p>
    </div>
  );
}

function InkHeader({ title, sub, right }) {
  return (
    <div className="relative flex items-end justify-between border-b border-border bg-[oklch(0.30_0.06_155)] px-5 pb-3.5 pt-4 text-white">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[oklch(0.65_0.12_140)] via-[oklch(0.78_0.13_85)] to-[oklch(0.65_0.14_40)]" />
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-xs text-white/60">{sub}</p>
      </div>
      {right}
    </div>
  );
}

function LegendRow({ color, name, value, total, active, onClick }) {
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent"
    >
      <span
        aria-hidden
        className="size-3 shrink-0 rounded-[4px] transition-transform"
        style={{ background: color, transform: active ? "scale(1.25)" : "scale(1)" }}
      />
      <span className="flex-1 truncate text-sm">{name}</span>
      <span className="text-sm font-semibold tabular-nums">
        {typeof value === "number" && value < 100 ? `${value}%` : formatCurrency(value)}
      </span>
      <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">{pct}%</span>
    </button>
  );
}

export function CategoryPie() {
  const [activeIndex, setActiveIndex] = useState(null);
  const total = categorySales.reduce((s, c) => s + c.value, 0);
  return (
    <div className="animate-in-rise card-soft card-soft-lift flex h-full flex-col overflow-hidden rounded-2xl bg-card" style={{ animationDelay: "120ms" }}>
      <InkHeader
        title="Sales by Category"
        sub="Distribution of revenue this month"
        right={<p className="text-right font-display text-xl font-semibold tabular-nums">{formatCurrency(total)}</p>}
      />
      <div className="flex flex-1 flex-col gap-2 p-4 sm:flex-row sm:items-center">
        <div className="h-52 w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={78}
                paddingAngle={2}
                strokeWidth={0}
                onMouseEnter={(_, i) => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {categorySales.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                    stroke={activeIndex === i ? "oklch(0.30 0.06 155)" : "oklch(0.995 0.004 90)"}
                    strokeWidth={activeIndex === i ? 3 : 1.5}
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.45}
                    style={{ transition: "opacity 200ms cubic-bezier(0.23,1,0.32,1)" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<JewelTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-0.5 sm:max-h-52 sm:overflow-y-auto">
          {categorySales.map((c, i) => (
            <LegendRow
              key={c.name}
              color={c.fill}
              name={c.name}
              value={c.value}
              total={total}
              active={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PaymentDoughnut() {
  const [activeIndex, setActiveIndex] = useState(null);
  const topMethod = paymentMethods[0];
  return (
    <div className="animate-in-rise card-soft card-soft-lift flex h-full flex-col overflow-hidden rounded-2xl bg-card" style={{ animationDelay: "150ms" }}>
      <InkHeader
        title="Payment Methods"
        sub="Share of transactions by method"
        right={
          <p className="text-right">
            <span className="font-display text-xl font-semibold tabular-nums">{topMethod.value}%</span>
            <span className="ml-1.5 text-xs text-white/60">{topMethod.name} leads</span>
          </p>
        }
      />
      <div className="flex flex-1 flex-col items-center gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethods}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
                strokeWidth={0}
                onMouseEnter={(_, i) => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {paymentMethods.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                    stroke={activeIndex === i ? "oklch(0.30 0.06 155)" : "oklch(0.995 0.004 90)"}
                    strokeWidth={activeIndex === i ? 3 : 1.5}
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.45}
                    style={{ transition: "opacity 200ms cubic-bezier(0.23,1,0.32,1)" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<JewelTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-semibold tabular-nums">
              {activeIndex !== null ? `${paymentMethods[activeIndex].value}%` : `${topMethod.value}%`}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {activeIndex !== null ? paymentMethods[activeIndex].name : topMethod.name}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-0.5">
          {paymentMethods.map((p, i) => (
            <LegendRow
              key={p.name}
              color={p.fill}
              name={p.name}
              value={p.value}
              total={100}
              active={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
