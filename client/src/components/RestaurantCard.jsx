/*
 * DINA FOOD — "Emerald Harvest" RestaurantCard
 * Polaroid lift, sticker offer badge, favorite heart, delivery info strip.
 */
import { Link } from "wouter";
import { FiClock } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useCart } from "../context/CartContext";

export default function RestaurantCard({ restaurant, tilt = 0 }) {
  const { favorites, toggleFavorite } = useCart();
  const isFav = favorites.includes(restaurant.id);

  return (
    <div
      style={{ transform: `rotate(${tilt}deg)` }}
      className="tilt-rotate group polaroid flex flex-col overflow-hidden bg-card">
      <Link href={`/restaurant/${restaurant.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {restaurant.offer && (
          <span className="sticker absolute left-3 top-3 rotate-[-3deg] bg-butter px-3 py-1 text-xs font-bold text-foreground shadow-sm">
            {restaurant.offer}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(restaurant.id);
          }}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-all duration-150 active:scale-90 ${
            isFav ? "text-papaya" : "text-foreground/50 hover:text-papaya"
          }`}>
          {isFav ? <AiFillHeart className="h-4 w-4" /> : <AiOutlineHeart className="h-4 w-4" />}
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/restaurant/${restaurant.id}`}
            className="font-display text-lg font-bold leading-tight hover:text-emerald transition-colors">
            {restaurant.name}
          </Link>
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {restaurant.priceRange}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-butter px-2 py-0.5 text-xs font-bold text-foreground">
          <AiFillStar className="h-3 w-3 text-papaya" />
          {restaurant.rating.toFixed(1)}
          <span className="font-normal text-foreground/60">
            ({restaurant.reviews.toLocaleString()})
          </span>
        </span>
        <div className="mt-auto flex items-center gap-3 border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" />
            {restaurant.deliveryTime} min
          </span>
          <span className="inline-flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" />
            {restaurant.deliveryFee === 0 ? "Free" : `$${restaurant.deliveryFee.toFixed(2)}`}
          </span>
          <span className="ml-auto">{restaurant.distance}</span>
        </div>
      </div>
    </div>
  );
}
