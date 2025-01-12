import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Car, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 animate-fade-up">
          Ride in Unity. Empower Your Journey.
        </h1>
        <p className="text-lg text-gray-600 animate-fade-up [animation-delay:200ms]">
          Experience the future of sustainable transportation with Unity Fleet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="animate-fade-up [animation-delay:300ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Status
            </CardTitle>
            <CardDescription>Your current plan and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-lg">Premium Plan</div>
              <div className="text-sm text-gray-500">Active until May 2024</div>
              <Button variant="outline" className="w-full">Manage Plan</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-up [animation-delay:400ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Available Vehicles
            </CardTitle>
            <CardDescription>Ready for your next journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Tesla Model 3"
                  className="object-cover w-full h-full"
                />
              </div>
              <Button className="w-full">Book Now</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-up [animation-delay:500ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="h-5 w-5" />
              Active Rentals
            </CardTitle>
            <CardDescription>Current vehicle status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Battery Level</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Range</span>
                <span className="font-semibold">245 miles</span>
              </div>
              <Button variant="outline" className="w-full">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12 animate-fade-up [animation-delay:600ms]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Special Promotion
          </CardTitle>
          <CardDescription>Limited time offer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">New UnityLink Hub Opening!</h3>
            <p className="mb-4">Get 50% off your first month subscription when you sign up this week.</p>
            <Button variant="secondary">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};