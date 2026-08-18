/*
 * DINA FOOD — "Emerald Harvest" Footer
 * Deep forest band, pill links, warm cream text.
 */
import { Link } from "wouter";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

// Inline brand mark: emerald bowl with steam and papaya accent (same as Navbar, dark-footer variant).
const LOGO_MARK = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <path d="M6 16h28c0 9-6.3 16-14 16S6 25 6 16z" fill="oklch(0.55 0.1 165)" />
    <path d="M4 16h32" stroke="oklch(0.55 0.1 165)" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M13 9c1.5-2.5 0.5-5 0.5-5M20 7c1.5-2.5 0.5-5 0.5-5M27 9c1.5-2.5 0.5-5 0.5-5"
      stroke="oklch(0.75 0.08 165)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <circle cx="30" cy="9" r="4.5" fill="oklch(0.72 0.19 45)" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-[oklch(0.26_0.05_165)] text-[oklch(0.94_0.02_90)]">
      <div className="container py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:text-left text-center">
          <div className="flex items-center gap-2.5 mb-4 justify-center sm:justify-start">
            {LOGO_MARK}
            <span className="sr-only">Dina Food</span>
            <span className="font-display text-2xl font-extrabold">Dina Food</span>
          </div>
          <p className="text-sm text-[oklch(0.82_0.03_85)] leading-relaxed">
            Fresh from the market, straight to your table. Honest food delivered
            from the best kitchens in your neighborhood.
          </p>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4 justify-center sm:justify-start">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4 justify-center sm:justify-start">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="hover:text-white transition-colors">About us</span></li>
            <li><span className="hover:text-white transition-colors">Careers</span></li>
            <li><span className="hover:text-white transition-colors">Partner with us</span></li>
            <li><span className="hover:text-white transition-colors">Blog</span></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4 justify-center sm:justify-start">Contact</h4>
          <ul className="space-y-2.5 text-sm text-[oklch(0.82_0.03_85)]">
            <li className="flex items-center gap-2 justify-center sm:justify-start"><FiMapPin className="h-4 w-4 text-papaya shrink-0" /> Downtown, New York</li>
            <li className="flex items-center gap-2 justify-center sm:justify-start"><FiPhone className="h-4 w-4 text-papaya shrink-0" /> +1 (555) 010-2468</li>
            <li className="flex items-center gap-2 justify-center sm:justify-start"><FiMail className="h-4 w-4 text-papaya shrink-0" /> hello@dinafood.app</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[oklch(0.7_0.02_85)]">
          <span>© {new Date().getFullYear()} Dina Food. All rights reserved.</span>
          <span>Freshly made with 🌿</span>
        </div>
      </div>
    </footer>
  );
}
