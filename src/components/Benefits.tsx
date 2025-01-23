import { Zap, Shield, Clock, Battery, Car, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Premium Tesla Fleet",
    description: "Access to the latest Tesla models with premium features",
    icon: Car,
  },
  {
    title: "Instant Access",
    description: "Get your electric vehicle within 24 hours",
    icon: Zap,
  },
  {
    title: "All-Inclusive Coverage",
    description: "Insurance and maintenance included",
    icon: Shield,
  },
  {
    title: "Flexible Terms",
    description: "Switch vehicles or cancel anytime",
    icon: Clock,
  },
  {
    title: "Charging Network",
    description: "Access to our extensive charging network",
    icon: Battery,
  },
  {
    title: "Simple Pricing",
    description: "No hidden fees or commitments",
    icon: CreditCard,
  },
];

export const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0B1F3B]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Why Choose Unity Fleet?
          </h2>
          <p className="text-white/70">
            Experience the future of mobility with our comprehensive electric vehicle service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card 
              key={benefit.title} 
              className="group bg-white/5 backdrop-blur border-none hover:bg-gradient-to-br hover:from-[#00FFC6]/10 hover:to-transparent"
            >
              <CardHeader>
                <div className="mb-3 p-2 rounded-lg bg-[#00FFC6]/10 w-fit">
                  <benefit.icon className="w-5 h-5 text-[#00FFC6]" />
                </div>
                <CardTitle className="text-lg text-white group-hover:text-[#00FFC6] transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
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