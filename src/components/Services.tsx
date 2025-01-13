import { Car, Users, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "On-Demand Rides",
    description: "Flexible daily fees for short-term EV usage. Perfect for quick trips and special occasions.",
    icon: Car,
    link: "/booking"
  },
  {
    title: "Corporate Shuttles",
    description: "Customized solutions for businesses. Sustainable transportation for your team.",
    icon: Users,
    link: "/fleet"
  },
  {
    title: "Long-Term Rentals",
    description: "Affordable options for extended trips. All-inclusive pricing with no hidden fees.",
    icon: CalendarDays,
    link: "/subscription"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of flexible mobility solutions designed to meet your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card 
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 border-none bg-white/5 backdrop-blur hover:bg-gradient-to-br hover:from-secondary/10 hover:to-transparent"
            >
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-secondary/10 w-fit group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground group-hover:text-primary/80 transition-colors mb-6">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full glass-card hover:bg-secondary/20"
                  asChild
                >
                  <Link to={service.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-secondary to-secondary/80 text-primary hover:from-secondary/90 hover:to-secondary/70"
            asChild
          >
            <Link to="/subscription">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};