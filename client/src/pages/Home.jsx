/*
 * DINA FOOD — "Emerald Harvest" Home
 * Asymmetric hero, category stalls, popular restaurants, recommended dishes,
 * promo ticket band, live cart peek.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FiArrowRight, FiClock, FiMapPin, FiTruck } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";
import OrderSummary from "../components/OrderSummary";
import { categories } from "../data/categories";
import { restaurants } from "../data/restaurants";
import { foods } from "../data/foods";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [, navigate] = useLocation();
  const { items } = useCart();
  const [query, setQuery] = useState("");
  const popular = restaurants.slice(0, 4);
  const recommended = foods.filter((f) => f.popular);

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* ── Hero: asymmetric split ── */}
        <section className="container grid items-center gap-8 py-10 lg:py-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="fade-up text-center lg:text-left">
            <span className="eyebrow mb-5 justify-center lg:justify-start">Fresh from your neighborhood kitchens</span>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Tonight's cravings,{" "}
              <span className="relative inline-block text-emerald">
                covered
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 10"
                  fill="none"
                  aria-hidden>
                  <path
                    d="M2 7 C 60 2, 140 2, 198 6"
                    stroke="oklch(0.58 0.16 45)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mx-auto mt-6 max-w-md text-muted-foreground leading-relaxed lg:mx-0">
              Fresh from the market, straight to your table. Honest food from the
              best kitchens near you — delivered warm and fast.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <SearchBar value={query} onChange={setQuery} placeholder="What are you craving?" />
              <button
                onClick={() => navigate("/restaurants")}
                className="shrink-0 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[oklch(0.47_0.1_165)] hover:shadow-lg active:scale-[0.97]">
                Browse menus
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <FiTruck className="h-4 w-4 text-emerald" /> 25-min average delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <FiClock className="h-4 w-4 text-emerald" /> Open until 11pm
              </span>
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="h-4 w-4 text-emerald" /> Downtown & beyond
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="/images/dina-hero-platter.png"
              alt="Grand round platter of grilled dishes, rice and sides"
              className="polaroid w-full rotate-[1.5deg] object-cover"
            />
            <img
              src="/images/harveat-salad-top.jpg"
              alt="Fresh garden salad flat lay"
              className="polaroid absolute -bottom-8 -left-10 w-56 rotate-[-4deg] object-cover"
            />
          </div>
        </section>

        {/* ── Promo ticket band ── */}
        <section className="container mb-14">
          <div className="ticket relative rounded-2xl bg-[oklch(0.88_0.09_90)] px-6 py-6 pb-7 sm:flex sm:items-center sm:gap-8">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 lg:text-left">
              <BsStars className="h-7 w-7 text-[oklch(0.4_0.1_165)] shrink-0" />
              <div>
                <h2 className="font-display text-xl font-bold text-[oklch(0.3_0.06_165)]">
                  This week's recipe: save 10%
                </h2>
                <p className="text-sm text-[oklch(0.42_0.05_150)]">
                  Use code <strong>DINA10</strong> at checkout — or{" "}
                  <strong>FREEDELIVERY</strong> for waived delivery fees.
                </p>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-4 w-full justify-center sm:mt-0 sm:w-auto shrink-0 rounded-full bg-[oklch(0.3_0.06_165)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[oklch(0.24_0.05_165)] active:scale-[0.97] flex items-center">
              Claim offer <FiArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="container mb-14">
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between lg:text-left">
            <div className="text-center lg:text-left">
              <span className="eyebrow mb-2 justify-center sm:justify-start">— Pick your flavor</span>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                Browse by category
              </h2>
            </div>
            <Link
              href="/restaurants"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald hover:underline">
              See all <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <Link key={c.id} href={`/restaurants?category=${c.id}`}>
                <CategoryCard category={c} tilt={i % 2 === 0 ? -1.5 : 1.5} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Popular restaurants ── */}
        <section className="container mb-14">
          <div className="mb-6 text-center lg:text-left">
            <span className="eyebrow mb-2 justify-center sm:justify-start">— Popular this week</span>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Loved by your neighbors
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((r, i) => (
              <div key={r.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <RestaurantCard restaurant={r} tilt={i % 2 === 0 ? -1 : 1} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Recommended dishes ── */}
        <section className="container mb-14">
          <div className="mb-6 text-center lg:text-left">
            <span className="eyebrow mb-2 justify-center sm:justify-start">— Chef's recommendations</span>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Dishes worth writing home about
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((f, i) => (
              <div key={f.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <FoodCard food={f} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Live cart peek ── */}
        {items.length > 0 && (
          <section className="container mb-14 grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="flex flex-col items-center justify-center gap-4 text-center lg:items-start lg:text-left">
              <span className="eyebrow">— Your table is almost set</span>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                {items.length} {items.length === 1 ? "dish" : "dishes"} waiting in
                your cart
              </h2>
              <p className="max-w-md text-muted-foreground">
                A few more minutes and dinner is on its way. Check your order and
                place it while it's hot.
              </p>
              <Link
                href="/cart"
                className="w-fit rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[oklch(0.47_0.1_165)] active:scale-[0.97]">
                View my cart <FiArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>
            <OrderSummary />
          </section>
        )}
      </main>
    </div>
  );
}
