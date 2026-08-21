/**
 * Soft Atelier — Recent Orders table
 * Search + status + payment filters, warm row highlights,
 * status pills in jewel tones, responsive (columns stack to cards on mobile).
 */
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders, statusTone } from "@/data/dashboard";
import { cn } from "@/lib/utils";

function StatusPill({ status }) {
  const t = statusTone[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", t.bg, t.fg)}>
      <span className={cn("size-1.5 rounded-full", t.dot)} />
      {status}
    </span>
  );
}

const PAGE_SIZE = 5;

export default function RecentOrders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (payment !== "all" && o.payment !== payment) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    });
  }, [query, status, payment]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const rows = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  return (
    <section className="animate-in-rise card-soft card-soft-lift flex h-full flex-col overflow-hidden rounded-2xl bg-card" style={{ animationDelay: "240ms" }}>
      <div className="relative flex flex-wrap items-end gap-3 border-b border-border bg-[oklch(0.30_0.06_155)] px-5 pb-4 pt-4 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[oklch(0.65_0.12_140)] via-[oklch(0.78_0.13_85)] to-[oklch(0.65_0.14_40)]" />
        <div>
          <h3 className="font-display text-lg font-semibold">Recent Orders</h3>
          <p className="text-xs text-white/60">{filtered.length} of {orders.length} orders</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search order, customer…"
              className="h-9 w-44 rounded-lg border border-white/15 bg-white/10 pl-8 pr-3 text-sm text-white outline-none transition-shadow placeholder:text-white/50 focus:ring-2 focus:ring-ring/40 sm:w-56"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(0); }}>
            <SelectTrigger className="h-9 w-32 rounded-lg border-white/15 bg-white/10 text-sm text-white [&_span]:text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={payment} onValueChange={(v) => { setPayment(v); setPage(0); }}>
            <SelectTrigger className="h-9 w-40 rounded-lg border-white/15 bg-white/10 text-sm text-white [&_span]:text-white">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All payments</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
              <SelectItem value="Apple Pay">Apple Pay</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Gift Card">Gift Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-border p-0">
        {/* Desktop table */}
        <table className="hidden w-full min-w-[720px] table-auto md:table">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No orders match your filters. Try clearing the search.
                </td>
              </tr>
            ) : (
              rows.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-border/60 last:border-0 transition-colors hover:bg-accent/50"
                >
                  <td className="px-4 py-3 text-sm font-semibold tabular-nums">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                        style={{ background: o.avatarColor }}
                      >
                        {o.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{o.customer}</p>
                        <p className="truncate text-xs text-muted-foreground">{o.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{o.product}</td>
                  <td className="px-4 py-3 text-sm font-semibold tabular-nums">${o.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{o.payment}</td>
                  <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{o.date}</td>
                  <td className="px-4 py-3">
                    <button
                      aria-label={`View ${o.id}`}
                      onClick={() => setSelected(o)}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="divide-y divide-border/60 md:hidden">
          {rows.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">No orders match your filters.</p>
          ) : (
            rows.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelected(o)}
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/50"
              >
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{ background: o.avatarColor }}
                >
                  {o.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{o.customer}</p>
                    <p className="shrink-0 text-sm font-semibold tabular-nums">${o.amount.toFixed(2)}</p>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {o.id} · {o.product}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <StatusPill status={o.status} />
                    <span className="text-[11px] text-muted-foreground">{o.date}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-xs text-muted-foreground">
          Page {safePage + 1} of {pages}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={safePage >= pages - 1}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Order detail dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card-soft animate-in-rise w-full max-w-sm rounded-2xl bg-card p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-semibold">{selected.id}</h4>
              <StatusPill status={selected.status} />
            </div>
            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                ["Customer", selected.customer],
                ["Email", selected.email],
                ["Product", selected.product],
                ["Amount", `$${selected.amount.toFixed(2)}`],
                ["Payment", selected.payment],
                ["Date", selected.date],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => setSelected(null)}
              className="mt-5 h-9 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
