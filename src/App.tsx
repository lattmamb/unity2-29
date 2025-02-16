
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Subscription from "./pages/Subscription";
import Advertising from "./pages/Advertising";
import Locations from "./pages/Locations";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import ChargingStations from "./pages/ChargingStations";
import Rentals from "./pages/Rentals";
import OnDemand from "./pages/OnDemand";
import VehicleDetail from "./pages/VehicleDetail";
import Fleet from "./pages/Fleet";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/advertising" element={<Advertising />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/charging-stations" element={<ChargingStations />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/rentals/:id" element={<VehicleDetail />} />
            <Route path="/on-demand" element={<OnDemand />} />
            <Route path="/fleet" element={<Fleet />} />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
