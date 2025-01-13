import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, DollarSign, Image, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export const VehicleOverview = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<string, boolean>>({});

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles-overview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("type");
      
      if (error) throw error;
      return data;
    },
  });

  const getPlanType = (vehicleType: string) => {
    switch (vehicleType) {
      case "autonomous":
        return {
          name: "Premium Plan",
          price: 750,
          badge: "bg-secondary text-secondary-foreground",
          faqs: [
            {
              question: "What's included in the Premium Plan?",
              answer: "The Premium Plan includes unlimited mileage, priority charging access, and full self-driving capability."
            },
            {
              question: "Can I switch vehicles?",
              answer: "Yes, Premium Plan members can switch vehicles up to twice per month at no additional cost."
            }
          ]
        };
      case "driver":
        return {
          name: "Essential Plan",
          price: 350,
          badge: "bg-primary text-primary-foreground",
          faqs: [
            {
              question: "What's the mileage limit?",
              answer: "The Essential Plan includes up to 1,000 miles per month. Additional miles are charged at $0.30 per mile."
            },
            {
              question: "Is insurance included?",
              answer: "Yes, comprehensive insurance coverage is included in all our plans."
            }
          ]
        };
      default:
        return {
          name: "Standard Plan",
          price: 500,
          badge: "bg-muted text-muted-foreground",
          faqs: [
            {
              question: "What's included in the Standard Plan?",
              answer: "The Standard Plan includes up to 1,500 miles per month, basic charging access, and standard maintenance coverage."
            },
            {
              question: "Can I upgrade my plan?",
              answer: "Yes, you can upgrade to a Premium Plan at any time during your subscription."
            }
          ]
        };
    }
  };

  const toggleFAQ = (vehicleId: string, faqIndex: number) => {
    const key = `${vehicleId}-${faqIndex}`;
    setExpandedFAQs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Vehicle Overview</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/fleet">View All</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {vehicles?.map((vehicle) => {
          const plan = getPlanType(vehicle.type);
          return (
            <Card key={vehicle.id} className="overflow-hidden bg-accent/30 backdrop-blur-sm border-accent/20">
              <div className="aspect-video relative bg-muted">
                {vehicle.image_url ? (
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${plan.badge}`}
                >
                  {plan.name}
                </Badge>
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Car className="h-4 w-4" />
                      <span className="capitalize">{vehicle.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <DollarSign className="h-4 w-4" />
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">/mo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.faqs.map((faq, index) => {
                    const key = `${vehicle.id}-${index}`;
                    const isExpanded = expandedFAQs[key];

                    return (
                      <div key={key} className="border-t border-accent/20 pt-2">
                        <button
                          onClick={() => toggleFAQ(vehicle.id, index)}
                          className="w-full flex items-center justify-between text-left hover:text-secondary transition-colors"
                        >
                          <span className="font-medium">{faq.question}</span>
                          {isExpanded ? (
                            <Minus className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <Plus className="h-4 w-4 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};