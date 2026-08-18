/*
 * DINA FOOD — "Emerald Harvest" fresh market style
 * Navbar: sticky, emerald wordmark, location pill, search, cart badge bounce.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FiMapPin, FiShoppingCart, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useTheme } from "../contexts/ThemeContext";

// Plain inline magnifier SVG (no icon library dependency — guaranteed to render on Vercel builds).
const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.6-4.6" />
  </svg>
);

// Inline brand mark: emerald bowl with a papaya accent (new Dina Food logo — different from the old leaf).
const LOGO_MARK = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    {/* bowl */}
    <path
      d="M6 16h28c0 9-6.3 16-14 16S6 25 6 16z"
      fill="oklch(0.47 0.1 165)"
    />
    {/* bowl rim */}
    <path
      d="M4 16h32"
      stroke="oklch(0.47 0.1 165)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* steam */}
    <path d="M13 9c1.5-2.5 0.5-5 0.5-5M20 7c1.5-2.5 0.5-5 0.5-5M27 9c1.5-2.5 0.5-5 0.5-5"
      stroke="oklch(0.68 0.09 165)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    {/* papaya accent dot */}
    <circle cx="30" cy="9" r="4.5" fill="oklch(0.72 0.19 45)" />
  </svg>
);

const LOCATIONS = ["Downtown", "Uptown", "Westside", "Eastville"];

export default function Navbar() {
  const [location] = useLocation();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Downtown");
  const [bounce, setBounce] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count > prevCount) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 400);
      return () => clearTimeout(t);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/dishes", label: "Dishes" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/92 backdrop-blur-xl shadow-[0_4px_20px_-6px_rgba(14,60,45,0.18)]"
          : "bg-background/70 backdrop-blur-md"
      }`}>
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {LOGO_MARK}
          <span className="sr-only">Dina Food logo</span>
          <span className="font-display text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Dina Food
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                location === l.href
                  ? "bg-emerald text-white shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-blush"
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLocationOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-foreground/80 hover:border-emerald/40 transition-colors">
              <FiMapPin className="h-4 w-4 text-emerald" />
              <span className="max-w-24 truncate">{selectedLocation}</span>
              <span className="text-xs text-muted-foreground">▾</span>
            </button>
            {locationOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      loc === selectedLocation
                        ? "bg-blush text-foreground font-semibold"
                        : "hover:bg-secondary"
                    }`}>
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/restaurants"
            className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground hover:border-emerald/40 transition-colors"
            aria-label="Search food and restaurants">
            <SearchIcon className="h-4 w-4 text-emerald shrink-0" />
            <span className="hidden xl:inline">Search food & restaurants…</span>
          </Link>

          {/* Compact search icon for small screens (between desktop pill and theme toggle) */}
          <Link
            href="/restaurants"
            className="lg:hidden p-1.5 sm:p-2.5 rounded-full text-foreground hover:bg-secondary transition-colors"
            aria-label="Search">
            <SearchIcon className="h-5 w-5 shrink-0" />
          </Link>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2.5 rounded-full hover:bg-secondary transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? (
              <FiMoon className="h-5 w-5" />
            ) : (
              <FiSun className="h-5 w-5 text-butter" />
            )}
          </button>

          <Link href="/cart" className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-secondary transition-colors">
            <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {count > 0 && (
              <span
                key={count}
                className={`absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-papaya text-[11px] font-bold text-white ${
                  bounce ? "cart-bounce" : ""
                }`}>
                {count}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-1.5 sm:p-2.5 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu">
            {mobileOpen ? <FiX className="h-4 w-4 sm:h-5 sm:w-5" /> : <FiMenu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 flex flex-col gap-1 fade-up">
          <div className="flex items-center gap-2 py-2 px-2 text-sm text-foreground/70 border-b border-border mb-1">
            <FiMapPin className="h-4 w-4 text-emerald" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent flex-1 outline-none">
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location === l.href
                  ? "bg-emerald text-white"
                  : "text-foreground/70 hover:bg-secondary"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
