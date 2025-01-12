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
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Why Choose Unity Fleet?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} className="bg-white/80 backdrop-blur border-none hover:shadow-lg transition-shadow">
              <CardHeader>
                <benefit.icon className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};