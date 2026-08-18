/*
 * DINA FOOD — "Emerald Harvest" FoodDetails
 * Large food photo, full description, veg badge, rating, quantity controls,
 * related dishes from the same restaurant.
 */
import { useMemo, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import FoodCard from "../components/FoodCard";
import NotFound from "./NotFound";
import { useCart } from "../context/CartContext";
import { getFoodById, getFoodsByRestaurant } from "../data/foods";
import { getRestaurant } from "../data/restaurants";

export default function FoodDetails() {
  const { id } = useParams();
  const food = getFoodById(id);
  const [, navigate] = useLocation();
  const { addToCart, increaseQty, decreaseQty, items, removeFromCart } = useCart();
  const [qty, setQty] = useState(1);

  const restaurant = useMemo(
    () => (food ? getRestaurant(food.restaurantId) : null),
    [food],
  );
  const related = useMemo(
    () => (restaurant ? getFoodsByRestaurant(restaurant.id).filter((f) => f.id !== food.id).slice(0, 3) : []),
    [restaurant, food],
  );
  const inCart = items.find((c) => c.food.id === food?.id);

  if (!food) return <NotFound />;

  const handleAdd = () => {
    if (inCart && qty > inCart.quantity) {
      const diff = qty - inCart.quantity;
      for (let i = 0; i < diff; i++) increaseQty(food.id);
    } else if (!inCart) {
      for (let i = 0; i < qty; i++) {
        // addToCart handles first add; subsequent use increaseQty
        if (i === 0) addToCart(food);
        else increaseQty(food.id);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-8">
        <Link
          href={restaurant ? `/restaurant/${restaurant.id}` : "/restaurants"}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-emerald/40 transition-colors">
          <FiArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="polaroid overflow-hidden bg-card">
            <img
              src={food.image}
              alt={food.name}
              className="h-full w-full max-h-[480px] object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-center sm:text-left">
              <span className="eyebrow mb-2 justify-center sm:justify-start">{restaurant?.name ?? "From our kitchen"}</span>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{food.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-butter px-3 py-1 font-bold">
                  <AiFillStar className="h-4 w-4 text-papaya" />
                  {food.rating.toFixed(1)}
                  <span className="font-normal text-foreground/60">({food.reviews})</span>
                </span>
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-[3px] border ${
                    food.veg ? "border-emerald" : "border-[oklch(0.5_0.2_27)]"
                  } bg-card`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${food.veg ? "bg-emerald" : "bg-[oklch(0.5_0.2_27)]"}`} />
                </span>
                <span className="text-muted-foreground">{food.veg ? "Vegetarian" : "Non-vegetarian"}</span>
              </div>
            </div>

            <p className="leading-relaxed text-muted-foreground">{food.description}</p>

            <div className="flex items-center justify-between rounded-2xl bg-card p-4 border border-border">
              <span className="font-display text-3xl font-extrabold text-papaya tabular-nums">
                ${(food.price * qty).toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all active:scale-90">
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="w-7 text-center text-base font-bold tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all active:scale-90">
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {inCart ? (
                <>
                  <button
                    onClick={handleAdd}
                    className="flex-1 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.97] hover:bg-[oklch(0.47_0.1_165)]">
                    Add {qty - (inCart?.quantity ?? 0)} more to cart
                  </button>
                  <button
                    onClick={() => removeFromCart(food.id)}
                    className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-destructive/40 hover:text-destructive transition-colors">
                    Remove from cart
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.97] hover:bg-[oklch(0.47_0.1_165)]">
                  Add to Cart — ${(food.price * qty).toFixed(2)}
                </button>
              )}
              <button
                onClick={() => navigate("/cart")}
                className="rounded-full border border-emerald/40 px-6 py-3 text-sm font-semibold text-emerald hover:bg-emerald hover:text-white transition-colors">
                View cart
              </button>
            </div>
          </div>
        </div>

        {/* Related dishes */}
        {related.length > 0 && (
          <section className="mt-14">
            <span className="eyebrow mb-2">— More from {restaurant.name}</span>
            <h2 className="font-display text-2xl font-extrabold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f) => (
                <FoodCard key={f.id} food={f} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
