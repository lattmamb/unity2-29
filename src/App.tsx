import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
      <AuthProvider>
        <TooltipProvider delayDuration={0}>
          <div className="min-h-screen bg-background text-foreground antialiased">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <Subscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advertising"
                element={
                  <ProtectedRoute>
                    <Advertising />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/locations"
                element={
                  <ProtectedRoute>
                    <Locations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/charging-stations"
                element={
                  <ProtectedRoute>
                    <ChargingStations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rentals"
                element={
                  <ProtectedRoute>
                    <Rentals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rentals/:id"
                element={
                  <ProtectedRoute>
                    <VehicleDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/on-demand"
                element={
                  <ProtectedRoute>
                    <OnDemand />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fleet"
                element={
                  <ProtectedRoute>
                    <Fleet />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
