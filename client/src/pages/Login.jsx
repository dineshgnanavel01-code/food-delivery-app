/**
 * Wanderpost — Login page (assignment bonus)
 * Static demo login form with client-side validation; no backend.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Please enter a valid email.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      toast.success("Welcome back!", { description: "Demo login — no account was created." });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="flex justify-center">
            <img src="/manus-storage/logo-stamp_3c7f21d6.png" alt="Wanderpost logo" className="h-14 w-14" />
          </div>
          <h1 className="mt-5 text-center font-display text-3xl font-bold">Welcome back, traveler</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to manage your journeys.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="login-email">
                <Mail className="h-3.5 w-3.5" aria-hidden /> Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`h-12 w-full rounded-lg border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.email ? "border-red-400" : "border-input"}`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="login-password">
                <Lock className="h-3.5 w-3.5" aria-hidden /> Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`h-12 w-full rounded-lg border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.password ? "border-red-400" : "border-input"}`}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" aria-hidden /> Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Wanderpost?{" "}
            <Link href="/signup" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
