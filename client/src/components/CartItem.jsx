/*
 * DINA FOOD — "Emerald Harvest" CartItem
 * Photo thumbnail, name, quantity controls, price, remove button.
 */
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CartItem({ entry, horizontal = false }) {
  const { food, quantity } = entry;
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  if (horizontal) {
    return (
      <li key={food.id} className="flex items-center justify-between text-sm gap-3">
        <img src={food.image} alt={food.name} className="h-10 w-10 rounded-xl object-cover" />
        <span className="flex-1 truncate text-foreground/80">
          {food.name} <span className="text-muted-foreground">×{quantity}</span>
        </span>
        <span className="font-semibold tabular-nums">
          ${(food.price * quantity).toFixed(2)}
        </span>
      </li>
    );
  }

  return (
    <div className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4 transition-all duration-200 hover:shadow-md">
      <img
        src={food.image}
        alt={food.name}
        loading="lazy"
        className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold leading-snug truncate">{food.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{food.description}</p>
        <p className="mt-1.5 font-display text-base font-bold text-emerald">
          ${food.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => decreaseQty(food.id)}
          aria-label="Decrease quantity"
          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all duration-150 active:scale-90">
          <FiMinus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 sm:w-6 text-center text-sm font-bold tabular-nums">{quantity}</span>
        <button
          onClick={() => increaseQty(food.id)}
          aria-label="Increase quantity"
          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all duration-150 active:scale-90">
          <FiPlus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
        <span className="font-display text-base sm:text-lg font-bold tabular-nums text-foreground">
          ${(food.price * quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(food.id)}
          aria-label="Remove item"
          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
          <FiTrash2 className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  );
}
