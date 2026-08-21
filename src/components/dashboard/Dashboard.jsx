/**
 * Soft Atelier — Dashboard page composition
 * Asymmetric editorial layout: stat cards → 7:5 analytics band
 * (weekly sales wide, stacked pies narrow) → 8:4 orders + product panel.
 */
import { useEffect } from "react";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import OverviewCards from "./OverviewCards";
import WeeklySales from "./WeeklySales";
import { CategoryPie, PaymentDoughnut } from "./SalesPieChart";
import RecentOrders from "./RecentOrders";
import ProductPerformance from "./ProductPerformance";

export default function Dashboard() {
  // Greeting toast once per session
  useEffect(() => {
    const key = "verdant-greeted";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      const t = setTimeout(() => toast("Good morning, Ava — your store is quietly thriving today."), 900);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <Sidebar>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="animate-in-rise flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[oklch(0.55_0.13_300)] uppercase">Commerce console</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight lg:text-4xl">
              Your store, <em className="text-[var(--terracotta)]">quietly thriving.</em>
            </h1>
          </div>
          <p className="font-display text-sm italic text-muted-foreground">Thursday, Aug 20 · sync 2 min ago</p>
        </div>

        {/* Overview stats */}
        <OverviewCards />

        {/* Asymmetric analytics band: weekly sales wide + stacked pies narrow (3:2 rhythm) */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <WeeklySales />
          </div>
          <div className="flex flex-col gap-6 xl:col-span-5">
            <CategoryPie />
            <PaymentDoughnut />
          </div>
        </div>

        {/* Orders + product performance */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <RecentOrders />
          </div>
          <div className="xl:col-span-4">
            <ProductPerformance />
          </div>
        </div>

        <footer className="pb-2 pt-2 text-center text-xs text-muted-foreground/70">
          Verdant Commerce · Demo data shown for illustration
        </footer>
      </div>
    </Sidebar>
  );
}
