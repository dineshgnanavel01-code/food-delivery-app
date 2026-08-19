/**
 * Wanderpost — Signup page (assignment bonus)
 * Static demo signup form with client-side validation; no backend.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Signup() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      toast.success("Account created!", { description: "Demo signup — nothing was saved." });
      navigate("/");
    }
  };

  const field = (id, error) =>
    `h-12 w-full rounded-lg border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-red-400" : "border-input"}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="flex justify-center">
            <img src="/manus-storage/logo-stamp_3c7f21d6.png" alt="Wanderpost logo" className="h-14 w-14" />
          </div>
          <h1 className="mt-5 text-center font-display text-3xl font-bold">Start your story</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Create a free Wanderpost account.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="signup-name">
                <User className="h-3.5 w-3.5" aria-hidden /> Full Name
              </label>
              <input id="signup-name" type="text" value={form.name} onChange={set("name")} placeholder="Jane Explorer" className={field("signup-name", errors.name)} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="signup-email">
                <Mail className="h-3.5 w-3.5" aria-hidden /> Email
              </label>
              <input id="signup-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={field("signup-email", errors.email)} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="eyebrow flex items-center gap-1.5" htmlFor="signup-password">
                  <Lock className="h-3.5 w-3.5" aria-hidden /> Password
                </label>
                <input id="signup-password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" className={field("signup-password", errors.password)} aria-invalid={!!errors.password} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="eyebrow flex items-center gap-1.5" htmlFor="signup-confirm">
                  <Lock className="h-3.5 w-3.5" aria-hidden /> Confirm
                </label>
                <input id="signup-confirm" type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" className={field("signup-confirm", errors.confirm)} aria-invalid={!!errors.confirm} />
                {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <UserPlus className="h-4 w-4" aria-hidden /> Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
