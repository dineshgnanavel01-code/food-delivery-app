/*
 * DINA FOOD — "Emerald Harvest" OrderSummary
 * Receipt-style breakdown: items, promo, subtotal, delivery, tax, discount, total.
 */
import { useState } from "react";
import { BsTag } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function OrderSummary({ checkout = false }) {
  const {
    items,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    promoCode,
    applyPromo,
  } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <aside className="rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm overflow-x-clip">
      <h3 className="eyebrow mb-4">Order summary</h3>

      <ul className="space-y-3 border-b border-dashed border-border pb-4">
        {items.map((entry) => (
          <CartItem key={entry.food.id} entry={entry} horizontal />
        ))}
      </ul>

      {/* Promo code */}
      <div className="flex flex-wrap items-center gap-2 py-4">
        <div className="relative flex-1 min-w-0">
          <BsTag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && code && applyPromo(code)}
            placeholder="Promo code"
            className="w-full h-9 rounded-full border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-emerald/60 focus:ring-2 focus:ring-emerald/15 disabled:opacity-60"
            disabled={!!promoCode}
          />
        </div>
        <button
          onClick={() => {
            if (!code.trim()) {
              setError("Enter a promo code first");
              return;
            }
            const ok = applyPromo(code);
            if (!ok) setError("Invalid code");
            else setError("");
          }}
          className="h-9 rounded-full border border-emerald/40 px-4 text-sm font-semibold text-emerald hover:bg-emerald hover:text-white transition-colors duration-150 active:scale-[0.96] shrink-0">
          Apply
        </button>
      </div>
      {promoCode && (
        <p className="-mt-2 mb-3 text-xs font-semibold text-emerald">
          ✓ Code {promoCode} applied
        </p>
      )}
      {error && <p className="-mt-2 mb-3 text-xs font-semibold text-destructive">{error}</p>}

      {/* Breakdown */}
      <dl className="space-y-2 text-sm min-w-0">
        <div className="flex justify-between text-foreground/70">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between text-foreground/70">
          <dt>Delivery fee</dt>
          <dd className="tabular-nums">
            {deliveryFee === 0 ? (
              <span className="font-semibold text-emerald">Free</span>
            ) : (
              `$${deliveryFee.toFixed(2)}`
            )}
          </dd>
        </div>
        <div className="flex justify-between text-foreground/70">
          <dt>Tax (8%)</dt>
          <dd className="tabular-nums">${tax.toFixed(2)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-semibold text-emerald">
            <dt>Discount</dt>
            <dd className="tabular-nums">−${discount.toFixed(2)}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4">
        <span className="font-display text-lg font-bold">Total</span>
        <span className="font-display text-2xl font-extrabold text-papaya tabular-nums">
          ${total.toFixed(2)}
        </span>
      </div>

      {checkout && (
        <p className="mt-3 text-xs text-muted-foreground">
          Hint: try promo code <strong>DINA10</strong> or <strong>FREEDELIVERY</strong>
        </p>
      )}
    </aside>
  );
}
