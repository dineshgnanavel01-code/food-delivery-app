/**
 * Standalone lightweight dropdown menu (no Radix dependency).
 * Click-to-toggle, closes on outside click / Escape.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MenuContext = createContext({ open: false, close: () => {} });

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <MenuContext.Provider value={{ open, close, toggle: () => setOpen((o) => !o) }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }) {
  const { open, toggle } = useContext(MenuContext);
  const child = asChild && Array.isArray(children) ? children[0] : children;
  return (
    <div
      onClick={toggle}
      className="inline-block cursor-pointer"
      aria-expanded={open}
      aria-haspopup
    >
      {child}
    </div>
  );
}

export function DropdownMenuContent({ children, align = "end", className }) {
  const { open, close } = useContext(MenuContext);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    document.addEventListener("keydown", onKey);
    // small delay avoids immediately closing on the trigger click
    const t = setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.removeEventListener("click", onClick);
    };
  }, [open, close]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        "animate-in-rise absolute z-50 mt-1.5 min-w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className }) {
  return (
    <div role="presentation" className={cn("px-2 py-1.5", className)}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} />;
}

export function DropdownMenuItem({ children, className, onClick, ...rest }) {
  const { close } = useContext(MenuContext);
  return (
    <button
      role="menuitem"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-popover-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
      , className)}
    >
      {children}
    </button>
  );
}
