/**
 * Standalone lightweight select (no Radix dependency).
 * Click-to-toggle list, closes on outside click / Escape.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = createContext({});

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, close, toggle: () => setOpen((o) => !o) }}>
      <div className="relative inline-block">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className }) {
  const { open, toggle, value } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      className={cn(
        "inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-shadow hover:bg-accent/50 focus:ring-2 focus:ring-ring/30",
        className
      )}
    >
      {children}
      <ChevronDown className={cn("size-4 opacity-60 transition-transform", open && "rotate-180")} />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext);
  return <span className="truncate">{value && value !== "all" ? value : placeholder || value}</span>;
}

export function SelectContent({ children, className }) {
  const { open, close } = useContext(SelectContext);
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
      role="listbox"
      className={cn(
        "animate-in-rise absolute z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({ children, value, className }) {
  const { value: selected, onValueChange, close } = useContext(SelectContext);
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected === value}
      onClick={() => {
        onValueChange?.(value);
        close();
      }}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-popover-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        selected === value && "bg-accent font-medium",
        className
      )}
    >
      {children}
    </button>
  );
}
