/*
 * DINA FOOD — "Emerald Harvest" Cart page
 * CartItem rows, empty state, order summary, proceed to checkout.
 */
import { Link } from "wouter";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center fade-up lg:text-left">
          <span className="eyebrow mb-2 justify-center sm:justify-start">— Almost there</span>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your cart</h1>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map((entry) => (
                <CartItem key={entry.food.id} entry={entry} />
              ))}
              <Link
                href="/restaurants"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:underline">
                Keep browsing menus <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="h-fit lg:sticky lg:top-24">
              <OrderSummary />
              <Link
                href="/checkout"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[oklch(0.47_0.1_165)] active:scale-[0.97]">
                Proceed to Checkout <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <FiShoppingCart className="h-16 w-16 text-muted-foreground/40" />
            <h2 className="font-display text-2xl font-extrabold">Your cart is empty</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Nothing in the basket yet — let's find you something delicious from a
              kitchen nearby.
            </p>
            <Link
              href="/restaurants"
              className="mt-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.97]">
              Explore restaurants
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
