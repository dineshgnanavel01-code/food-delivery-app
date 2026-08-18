/*
 * DINA FOOD — "Emerald Harvest" App shell
 * Emerald + papaya palette, Sora display / Inter body.
 * All pages wrapped in CartProvider; Navbar/Footer shared layout.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RestaurantList from "./pages/RestaurantList";
import Dishes from "./pages/Dishes";
import RestaurantDetails from "./pages/RestaurantDetails";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/restaurants"} component={RestaurantList} />
      <Route path={"/dishes"} component={Dishes} />
      <Route path={"/restaurant/:id"} component={RestaurantDetails} />
      <Route path={"/food/:id"} component={FoodDetails} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/order-confirmation"} component={OrderConfirmation} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="bottom-center" />
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
