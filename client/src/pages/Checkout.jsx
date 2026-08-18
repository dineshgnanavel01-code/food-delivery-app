/*
 * DINA FOOD — "Emerald Harvest" Checkout
 * Delivery address, contact info, payment method UI, promo code,
 * price breakdown, place order with validation.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { FiCheck, FiCreditCard, FiHome, FiMapPin, FiPhone } from "react-icons/fi";
import { GiBank, GiSmartphone } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: FiCreditCard },
  { id: "upi", label: "UPI / Mobile Wallet", icon: GiSmartphone },
  { id: "cod", label: "Cash on Delivery", icon: BsCashCoin },
  { id: "netbanking", label: "Net Banking", icon: GiBank },
];

function genOrderId() {
  return `HV-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, total, promoCode, applyPromo } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [payment, setPayment] = useState("card");
  const [promoInput, setPromoInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!form.phone.trim() || form.phone.trim().length < 10) newErrors.phone = "Please enter a valid phone number";
    if (!form.address.trim()) newErrors.address = "Please enter your delivery address";
    if (!form.city.trim()) newErrors.city = "Please enter your city";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem(
        "harveat-last-order",
        JSON.stringify({
          id: genOrderId(),
          items: items.map(({ food, quantity }) => ({ food, quantity })),
          total,
          payment,
          address: `${form.address}, ${form.city}`,
          placedAt: new Date().toISOString(),
        }),
      );
      navigate("/order-confirmation");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="container flex-1 flex flex-col items-center justify-center gap-4 py-20 text-center">
          <span className="text-5xl">🛒</span>
          <h1 className="font-display text-2xl font-extrabold">Nothing to check out yet</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add some delicious dishes to your cart first.
          </p>
          <button
            onClick={() => navigate("/restaurants")}
            className="mt-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white transition-all active:scale-[0.97]">
            Browse restaurants
          </button>
        </main>
      </div>
    );
  }

  const inputCls = (err) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 ${
      err
        ? "border-destructive focus:ring-destructive/20"
        : "border-border focus:border-emerald/60 focus:ring-emerald/15"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center fade-up lg:text-left">
          <span className="eyebrow mb-2 justify-center sm:justify-start">— Final step</span>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Checkout</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us where to deliver — dinner will arrive warm.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Delivery address */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="eyebrow mb-4">
                <FiMapPin className="h-3.5 w-3.5" /> Delivery address
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">Street address</label>
                  <input
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="123 Market Street, Apt 4B"
                    className={inputCls(errors.address)}
                  />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">City</label>
                  <input
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="New York"
                    className={inputCls(errors.city)}
                  />
                  {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Delivery notes (optional)</label>
                  <input
                    value={form.notes}
                    onChange={handleChange("notes")}
                    placeholder="Leave at the door"
                    className={inputCls()}
                  />
                </div>
              </div>
            </section>

            {/* Contact information */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="eyebrow mb-4">
                <FiPhone className="h-3.5 w-3.5" /> Contact information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Full name</label>
                  <div className="relative">
                    <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Alex Rivera"
                      className={`${inputCls(errors.name)} pl-9`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Phone number</label>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+1 (555) 010-0000"
                    type="tel"
                    className={inputCls(errors.phone)}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="eyebrow mb-4">
                <FiCreditCard className="h-3.5 w-3.5" /> Payment method
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const selected = payment === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayment(m.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
                        selected
                          ? "border-emerald bg-emerald/5 text-emerald shadow-sm"
                          : "border-border bg-background hover:border-emerald/40"
                      }`}>
                      <Icon className="h-5 w-5 shrink-0" />
                      {m.label}
                      {selected && <FiCheck className="ml-auto h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Promo code (secondary) */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="eyebrow mb-4">
                <FiCreditCard className="h-3.5 w-3.5" /> Promo code
              </h2>
              <div className="flex items-center gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="DINA10"
                  disabled={!!promoCode}
                  className={`flex-1 rounded-full border bg-background px-4 py-2.5 text-sm outline-none focus:border-emerald/60 disabled:opacity-60 ${
                    promoCode ? "border-emerald/40" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => applyPromo(promoInput)}
                  className="rounded-full border border-emerald/40 px-5 py-2.5 text-sm font-semibold text-emerald hover:bg-emerald hover:text-white transition-colors active:scale-[0.96]"
                  disabled={!!promoCode}>
                  {promoCode ? "Applied ✓" : "Apply"}
                </button>
              </div>
              {promoCode && (
                <p className="mt-2 text-xs font-semibold text-emerald">
                  ✓ Code {promoCode} applied to your order
                </p>
              )}
            </section>
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <OrderSummary checkout />
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-6 py-4 text-base font-bold text-white shadow-md transition-all duration-150 hover:bg-[oklch(0.47_0.1_165)] active:scale-[0.97]">
              Place Order — ${total.toFixed(2)}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By placing this order you agree to our terms of service.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
