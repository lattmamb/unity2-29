import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Booking() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Book a Ride</h1>
        <p>Booking interface coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}