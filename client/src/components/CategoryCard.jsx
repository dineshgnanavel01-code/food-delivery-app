/*
 * DINA FOOD — "Emerald Harvest" CategoryCard
 * Market-stall card: photo, emoji sticker, emerald ring when active.
 */

export default function CategoryCard({
  category,
  active,
  onClick,
  tilt = 0,
}) {
  return (
    <button
      onClick={onClick}
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`tilt-rotate group polaroid overflow-hidden bg-card text-left w-full transition-transform duration-200 ${
        active ? "ring-2 ring-emerald ring-offset-2 ring-offset-background" : ""
      }`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 text-xl drop-shadow-md">
          {category.emoji}
        </span>
      </div>
      <div className="px-3 py-2.5">
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </button>
  );
}
