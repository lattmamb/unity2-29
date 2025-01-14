import { Zap, Shield, Clock, Battery, Car, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Premium Tesla Fleet",
    description: "Access to the latest Tesla models with premium features and performance",
    icon: Car,
  },
  {
    title: "Instant Access",
    description: "Get your electric vehicle delivered within 24 hours of subscription",
    icon: Zap,
  },
  {
    title: "All-Inclusive Coverage",
    description: "Insurance, maintenance, and roadside assistance included in your subscription",
    icon: Shield,
  },
  {
    title: "Flexible Terms",
    description: "Switch vehicles or cancel anytime with our monthly subscription options",
    icon: Clock,
  },
  {
    title: "Charging Network",
    description: "Access to our extensive network of charging stations across the city",
    icon: Battery,
  },
  {
    title: "Simple Pricing",
    description: "Transparent pricing with no hidden fees or long-term commitments",
    icon: CreditCard,
  },
];

export const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0B1F3B]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Choose Unity Fleet?
          </h2>
          <p className="text-lg text-white/70">
            Experience the future of mobility with our comprehensive electric vehicle 
            subscription service designed for modern drivers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card 
              key={benefit.title} 
              className="group hover:shadow-lg transition-all duration-300 border-none 
                bg-white/5 backdrop-blur hover:bg-gradient-to-br hover:from-[#00FFC6]/10 
                hover:to-transparent"
            >
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-[#00FFC6]/10 w-fit 
                  group-hover:bg-[#00FFC6]/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#00FFC6]" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-[#00FFC6] transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 group-hover:text-white/80 transition-colors">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};