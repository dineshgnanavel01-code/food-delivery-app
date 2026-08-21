/**
 * Soft Atelier — Verdant header
 * Warm ivory sticky bar with global search, notification dropdown
 * (jewel-toned kind dots, mark-all-read), and user profile dropdown.
 */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { notifications } from "@/data/dashboard";

// ---- Inline helpers (keeps this file self-contained) ----
const cn = (...inputs) => twMerge(clsx(inputs));

const MenuContext = createContext({});

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <MenuContext.Provider value={{ open, close, toggle: () => setOpen((o) => !o) }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
}

function DropdownMenuTrigger({ asChild, children }) {
  const { open, toggle } = useContext(MenuContext);
  const child = asChild && Array.isArray(children) ? children[0] : children;
  return (
    <div onClick={() => toggle()} className="inline-block cursor-pointer" aria-expanded={open} aria-haspopup>
      {child}
    </div>
  );
}

function DropdownMenuContent({ children, align = "end", className }) {
  const { open, close } = useContext(MenuContext);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => { document.removeEventListener("keydown", onKey); clearTimeout(t); document.removeEventListener("click", onClick); };
  }, [open, close]);
  if (!open) return null;
  return (
    <div ref={ref} role="menu" className={cn("animate-in-rise absolute z-50 mt-1.5 min-w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg", align === "end" ? "right-0" : "left-0", className)}>
      {children}
    </div>
  );
}

function DropdownMenuLabel({ children, className }) {
  return <div role="presentation" className={cn("px-2 py-1.5", className)}>{children}</div>;
}

function DropdownMenuSeparator({ className }) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} />;
}

function DropdownMenuItem({ children, className, onClick, ...rest }) {
  const { close } = useContext(MenuContext);
  return (
    <button role="menuitem" {...rest}
      onClick={(e) => { onClick?.(e); close(); }}
      className={cn("flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground", className)}
    >
      {children}
    </button>
  );
}
// ---- end inline helpers ----

function NotificationBell() {
  const [list, setList] = useState(notifications);
  const unread = list.filter((n) => n.unread).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[var(--terracotta)] text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2">
        <DropdownMenuLabel className="flex items-center justify-between px-1 pt-1">
          <span className="font-display text-sm font-semibold">Notifications</span>
          {list.some((n) => n.unread) && (
            <button
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => setList((l) => l.map((n) => ({ ...n, unread: false })))}
            >
              Mark all read
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 space-y-1 overflow-y-auto pr-1">
          {list.map((n) => (
            <div
              key={n.id}
              className={cn(
                "rounded-lg px-2 py-2.5 transition-colors hover:bg-accent",
                n.unread && "bg-accent/50"
              )}
              onClick={() => setList((l) => l.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    n.kind === "order" && "bg-[var(--chart-2)]",
                    n.kind === "stock" && "bg-[var(--saffron)]",
                    n.kind === "review" && "bg-[var(--plum)]",
                    n.kind === "promo" && "bg-[var(--moss)]"
                  )}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition-colors hover:bg-accent">
          <span
            className="flex size-9 items-center justify-center rounded-full font-display text-sm font-semibold text-primary-foreground"
            style={{ background: "oklch(0.38 0.09 155)" }}
          >
            AV
          </span>
          <span className="hidden text-left md:block">
            <span className="block text-sm font-semibold leading-tight">Ava Reed</span>
            <span className="block text-xs text-muted-foreground">Store Owner</span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="px-3 pt-2">
          <span className="block text-sm font-semibold">Ava Reed</span>
          <span className="block text-xs text-muted-foreground">ava@verdant.shop</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast("Profile page coming soon")}>My profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast("Billing coming soon")}>Billing &amp; plans</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast("Settings coming soon")}>Preferences</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[var(--terracotta)]" onClick={() => toast("Signed out (demo)")}>
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header({ onMenuOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <button
          aria-label="Open menu"
          onClick={onMenuOpen}
          className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="relative flex-1 max-w-md">
          <span className="pointer-events-none absolute left-3 top-1/2 block -translate-y-1/2 text-sm font-medium tracking-widest text-muted-foreground/60 uppercase">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search orders, products, customers…"
            className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30"
            onFocus={() => toast("Search is powered by the Orders & Products filters below")}
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <NotificationBell />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
