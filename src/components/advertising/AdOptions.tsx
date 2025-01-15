import { Card } from "@/components/ui/card";
import { Monitor, Palette } from "lucide-react";

export const AdOptions = () => {
  const options = [
    {
      title: "Digital Displays",
      description: "Dynamic digital ads displayed on our vehicle screens",
      icon: Monitor,
      features: [
        "Real-time campaign updates",
        "Location-based targeting",
        "Performance analytics",
        "Flexible scheduling",
      ],
    },
    {
      title: "Custom Wraps",
      description: "Premium vinyl wraps for maximum brand visibility",
      icon: Palette,
      features: [
        "Full or partial vehicle wraps",
        "Professional installation",
        "Long-term exposure",
        "Premium materials",
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {options.map((option, index) => (
        <Card key={index} className="p-6 glass-card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-ev/10">
              <option.icon className="w-6 h-6 text-ev" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-muted-foreground mb-4">{option.description}</p>
              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-ev" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};