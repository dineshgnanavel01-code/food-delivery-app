# Wanderpost — Travel Website

A modern, responsive travel agency landing website built with **React 19**, **Vite 7**, **Tailwind CSS 4**, and **shadcn/ui**. Designed in a warm "Postcard Editorial" style with custom AI-generated imagery, scroll-reveal animations, category filtering, and six fully routed pages.

## Project Structure

```
client/src/
├── components/
│   ├── Navbar.jsx            # Sticky navbar with logo, links, login CTA, mobile menu
│   ├── HeroSection.jsx       # Full-screen hero with heading, description, CTA
│   ├── SearchBox.jsx         # Floating search card: destination, date, travelers
│   ├── DestinationCard.jsx   # Card: image, name, country, description, price, Explore
│   ├── DestinationSection.jsx# Grid of 6 destinations with category filtering
│   ├── PackageCard.jsx       # Card: image, name, duration, rating, price, details
│   ├── PackageSection.jsx    # 6 featured packages: Bali, Dubai, Paris, Maldives,
│   │                         #   Swiss Alps, Singapore
│   ├── FeatureCard.jsx       # Icon + title + description with hover lift
│   ├── WhyChooseUs.jsx       # 4 features: price guarantee, partners, 24/7, secure
│   ├── AboutSection.jsx      # Image, intro, stats (10K+ travelers etc.), Learn More
│   ├── TestimonialCard.jsx   # Avatar, name, rating, review, destination
│   ├── Testimonials.jsx      # Grid of testimonial cards
│   ├── Newsletter.jsx        # Email subscription with validation
│   ├── Footer.jsx            # Logo, about, quick links, destinations, contact, socials
│   ├── WhatsAppButton.jsx    # Floating WhatsApp chat button
│   └── BackToTop.jsx         # Floating back-to-top button
├── data/
│   ├── destinations.js       # Mock data for 6 destinations
│   ├── tours.js              # Mock data for 6 travel packages
│   └── testimonials.js       # Mock testimonials (demo placeholders)
├── pages/
│   ├── Home.jsx              # Landing page composing all sections
│   ├── Login.jsx             # Login form with validation (demo)
│   ├── Signup.jsx            # Signup form with validation (demo)
│   ├── Contact.jsx           # Contact form + info cards
│   ├── DestinationDetails.jsx# Dynamic destination page with related packages
│   └── TourDetails.jsx       # Dynamic tour page with itinerary + booking card
├── App.tsx                   # Routes: /, /login, /signup, /contact,
│                             #   /destination/:id, /tour/:id
└── index.css                 # Global Postcard Editorial theme tokens
```

## Bonus Features

Category filtering on destinations, scroll-reveal animations (`useReveal` hook), floating WhatsApp button, floating back-to-top button, email validation, dynamic destination and tour detail pages, and a 404 page.

## Getting Started

```bash
pnpm install   # requires pnpm
pnpm dev       # start dev server
pnpm build     # production build
```

## Notes

- Login / Signup / Contact forms are client-side demos; no backend is connected.
- Testimonials are illustrative placeholders created for the demo UI.
- Images are served from the project's media storage (referenced by path in the source).
