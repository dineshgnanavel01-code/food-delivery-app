/**
 * Wanderpost — BackToTop (assignment bonus)
 * Floating back-to-top button that appears after scrolling down.
 */
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{ animation: "fade-up 0.3s cubic-bezier(0.23,1,0.32,1)" }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
