/**
 * Wanderpost — SearchBox (assignment brief)
 * Floating search card overlapping the hero: destination input, travel date,
 * number of travelers, and an Explore Now button. Uses shadcn Select + date input.
 */
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinations } from "@/data/destinations";

const travelerOptions = ["1 Traveler", "2 Travelers", "3 Travelers", "4 Travelers", "5+ Travelers"];

export default function SearchBox() {
  const [destination, setDestination] = useState("Any destination");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2 Travelers");

  const explore = () => {
    toast(`Exploring: ${destination} · ${date || "any date"} · ${travelers}`, {
      description: "Live results are a preview for this assignment demo.",
    });
  };

  return (
    <section id="search" className="relative z-20">
      <div className="container -mt-14 sm:-mt-16">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/15 sm:p-6">
          <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-end">
            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="sb-dest">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="sb-dest" className="h-12 w-full rounded-lg bg-background text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any destination">Any destination</SelectItem>
                  {destinations.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}, {d.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="sb-date">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Travel Date
              </label>
              <input
                id="sb-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="eyebrow flex items-center gap-1.5" htmlFor="sb-travelers">
                <Users className="h-3.5 w-3.5" aria-hidden /> Travelers
              </label>
              <Select value={travelers} onValueChange={setTravelers}>
                <SelectTrigger id="sb-travelers" className="h-12 w-full rounded-lg bg-background text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {travelerOptions.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={explore}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg sm:px-9"
            >
              <Search className="h-4 w-4" aria-hidden />
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
