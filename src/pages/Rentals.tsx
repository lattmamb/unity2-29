import { PageLayout } from "@/components/PageLayout";
import { Car, Calendar, CreditCard } from "lucide-react";

export default function Rentals() {
  const menuItems = [
    {
      title: "Available Vehicles",
      icon: Car,
      description: "Browse our rental fleet",
    },
    {
      title: "Booking Calendar",
      icon: Calendar,
      description: "Check vehicle availability",
    },
    {
      title: "Rental Rates",
      icon: CreditCard,
      description: "View our competitive pricing",
    },
  ];

  return (
    <PageLayout title="Vehicle Rentals" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Coming Soon</h1>
        <p className="text-lg text-muted-foreground">
          Our rental service is currently under development. Check back soon for updates!
        </p>
      </div>
    </PageLayout>
  );
}