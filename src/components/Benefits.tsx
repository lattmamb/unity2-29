import { Zap, Shield, Clock, Battery } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Instant Access",
    description: "Get your electric vehicle delivered within 24 hours of subscription",
    icon: Zap,
  },
  {
    title: "Full Coverage",
    description: "Insurance, maintenance, and roadside assistance included",
    icon: Shield,
  },
  {
    title: "Flexible Terms",
    description: "Switch vehicles or cancel anytime with our monthly subscription",
    icon: Clock,
  },
  {
    title: "All Electric",
    description: "100% electric fleet for a sustainable future",
    icon: Battery,
  },
];

export const Benefits = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-4">
          Why Choose Unity Fleet?
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-4">
          Experience the future of mobility with our comprehensive electric vehicle subscription service
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <Card 
              key={benefit.title} 
              className="group hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur hover:bg-gradient-to-br hover:from-secondary/10 hover:to-transparent"
            >
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-secondary/10 w-fit group-hover:bg-secondary/20 transition-colors">
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl group-hover:text-secondary transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-primary/80 transition-colors">
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