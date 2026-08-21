/**
 * Soft Atelier — Verdant sidebar
 * Deep forest fixed panel (desktop) with slide-in drawer on mobile,
 * leaf logo, wordmark, boutique hero image, nav with active state,
 * and help link. Composes the Header for the main area.
 */
import { useEffect, useState } from "react";
import { HelpCircle, LayoutDashboard, Package, Settings, ShoppingBag, Users, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Header from "./Header";

const LOGO = "/manus-storage/verdant-logo_34670e17.png";
const HERO = "/manus-storage/hero-store_dd577520.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 py-5">
        <img src={LOGO} alt="Verdant logo" className="size-10 rounded-xl object-contain" />
        <div className="sidebar-slide">
          <span className="font-display text-lg font-semibold tracking-tight text-white">Verdant</span>
          <span className="block text-[11px] tracking-widest text-white/50 uppercase">Commerce</span>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="overflow-hidden rounded-xl">
          <img src={HERO} alt="Boutique storefront illustration" className="aspect-[16/9] w-full object-cover" />
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              onNavigate?.();
              if (!item.active) toast(`${item.label} section coming soon`);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              item.active
                ? "bg-[oklch(0.33_0.07_155)] text-white shadow-[inset_0_0_0_1px_oklch(0.4_0.08_155)]"
                : "text-white/65 hover:bg-[oklch(0.33_0.07_155)] hover:text-white"
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-5">
        <button
          onClick={() => toast("Help center coming soon")}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-xs text-white/55 transition-colors hover:text-white"
        >
          <HelpCircle className="size-4" />
          Help &amp; support
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on larger screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="sidebar-slide absolute left-0 top-0 h-full w-64 border-r border-sidebar-border bg-sidebar p-3">
            <div className="flex justify-end">
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-[oklch(0.33_0.07_155)] hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
