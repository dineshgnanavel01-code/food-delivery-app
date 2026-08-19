/**
 * Wanderpost — Navbar (assignment brief)
 * Logo, Home / Destinations / Tours / About / Contact links, Login/Sign Up button,
 * sticky behavior, hover & active states, mobile hamburger menu.
 */
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const LOGO = "/manus-storage/logo-stamp_3c7f21d6.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Tours", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isHome
          ? "bg-background/92 backdrop-blur-xl shadow-md border-b border-border"
          : "bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2.5">
          <img src={LOGO} alt="Wanderpost logo" className="h-10 w-10" />
          <span
            className={`font-display text-2xl font-bold tracking-tight transition-colors ${
              isHome ? "text-foreground" : "text-white"
            }`}
          >
            Wander<span className="italic text-primary">post</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`ink-underline text-sm font-semibold transition-colors ${
                  isHome ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            Login / Sign Up
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-md lg:hidden ${
            isHome ? "text-foreground" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-semibold text-foreground/85 hover:bg-secondary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground"
              >
                <Globe className="h-4 w-4" />
                Login / Sign Up
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
