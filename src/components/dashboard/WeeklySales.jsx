/**
 * Soft Atelier — Weekly Sales
 * Editorial ink header band, jewel multi-color bars,
 * best-day highlight, soft hover details.
 */
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency, weeklySales } from "@/data/dashboard";

const barColors = [
  "oklch(0.55 0.12 140)",
  "oklch(0.72 0.13 85)",
  "oklch(0.78 0.13 85)",
  "oklch(0.65 0.14 40)",
  "oklch(0.62 0.19 40)",
  "oklch(0.55 0.13 300)",
  "oklch(0.38 0.09 155)",
];

function JewelTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="card-soft rounded-lg bg-popover px-3 py-2 text-sm">
      <p className="font-display font-medium">{d.day}</p>
      <p className="tabular-nums text-muted-foreground">
        {formatCurrency(d.sales)} · {d.orders} orders
      </p>
    </div>
  );
}

export default function WeeklySales() {
  const total = weeklySales.reduce((s, w) => s + w.sales, 0);
  const bestDay = weeklySales.reduce((a, b) => (b.sales > a.sales ? b : a));

  return (
    <section className="card-soft card-soft-lift flex h-full flex-col overflow-hidden rounded-2xl bg-card" style={{ animationDelay: "120ms" }}>
      <div className="relative flex items-end justify-between border-b border-border bg-[oklch(0.30_0.06_155)] px-5 pb-3.5 pt-4 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[oklch(0.65_0.12_140)] via-[oklch(0.78_0.13_85)] to-[oklch(0.65_0.14_40)]" />
        <div>
          <h3 className="font-display text-lg font-semibold">Weekly Sales</h3>
          <p className="text-xs text-white/60">Revenue and order volume, last 7 days</p>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-semibold tabular-nums">{formatCurrency(total)}</p>
          <p className="text-xs text-white/60">
            {weeklySales.reduce((s, w) => s + w.orders, 0)} orders · best day {bestDay.day}
          </p>
        </div>
      </div>
      <div className="flex-1 p-5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySales} barCategoryGap="28%">
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "oklch(0.552 0.016 285.938)" }}
              />
              <YAxis hide />
              <Tooltip content={<JewelTooltip />} cursor={{ fill: "oklch(0.30 0.06 155 / 0.06)" }} />
              <Bar
                dataKey="sales"
                radius={[8, 8, 3, 3]}
                label={false}
                shape={(props) => {
                  const { x, y, width, height, payload, index } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={8}
                      ry={3}
                      fill={barColors[index % barColors.length]}
                      opacity={payload.day === bestDay.day ? 1 : 0.85}
                      style={{ transition: "opacity 200ms cubic-bezier(0.23,1,0.32,1)" }}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
