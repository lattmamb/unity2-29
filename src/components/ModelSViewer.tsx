
import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { plans } from "./subscription/PlanData";

const carModels = [
  {
    id: 1,
    name: "Model S Plaid",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    specs: {
      range: "396 miles",
      acceleration: "1.99s 0-60",
      topSpeed: "200 mph"
    },
    price: "$1,250/mo",
    color: "Pearl White",
    plan: "Elite Take-Home",
    features: [
      "Luxury take-home vehicle",
      "Global unlimited rides",
      "Free premium charging",
      "24/7 concierge support"
    ]
  },
  {
    id: 2,
    name: "Model Y Performance",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    specs: {
      range: "330 miles",
      acceleration: "4.8s 0-60",
      topSpeed: "135 mph"
    },
    price: "$750/mo",
    color: "Red Multi-Coat",
    plan: "Premium Take-Home",
    features: [
      "Take-home vehicle",
      "Unlimited rides anywhere",
      "Free public charging",
      "24/7 priority support"
    ]
  },
  {
    id: 3,
    name: "Model 3 Standard",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    specs: {
      range: "250 miles",
      acceleration: "5.8s 0-60",
      topSpeed: "140 mph"
    },
    price: "$350/mo",
    color: "Midnight Silver",
    plan: "Base Plan",
    features: [
      "Standard vehicle access",
      "Unlimited rides within city",
      "Public charging (pay-as-you-go)",
      "Basic support"
    ]
  }
];

const locations = ["San Francisco Bay Area", "Los Angeles", "New York", "Miami"];
const modelTypes = ["Any Model", "Model S", "Model Y", "Model 3"];
const colors = ["Any Color", "Pearl White", "Red Multi-Coat", "Midnight Silver", "Deep Blue"];

export const ModelSViewer = () => {
  const [selectedCar, setSelectedCar] = useState(carModels[0]);
  const [location, setLocation] = useState(locations[0]);
  const [modelType, setModelType] = useState(modelTypes[0]);
  const [color, setColor] = useState(colors[0]);
  const navigate = useNavigate();

  const handlePrevious = () => {
    const currentIndex = carModels.findIndex(car => car.id === selectedCar.id);
    const newIndex = currentIndex === 0 ? carModels.length - 1 : currentIndex - 1;
    setSelectedCar(carModels[newIndex]);
  };

  const handleNext = () => {
    const currentIndex = carModels.findIndex(car => car.id === selectedCar.id);
    const newIndex = currentIndex === carModels.length - 1 ? 0 : currentIndex + 1;
    setSelectedCar(carModels[newIndex]);
  };

  const handleSubscribe = (car: typeof carModels[0]) => {
    const plan = plans.find(p => p.name === car.plan);
    navigate('/subscription', { state: { selectedPlan: plan } });
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">SUBSCRIPTION VEHICLES</h2>
            <h3 className="text-2xl text-muted-foreground mb-2">Choose Your Perfect Tesla</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All subscription vehicles include maintenance, insurance, and charging benefits.
            </p>
          </div>

          {/* Main Car Display */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <motion.div 
              key={selectedCar.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[16/9] relative"
            >
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-8">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[200px]">
                {location}
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={modelType} onValueChange={setModelType}>
              <SelectTrigger className="w-[200px]">
                {modelType}
              </SelectTrigger>
              <SelectContent>
                {modelTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="w-[200px]">
                {color}
              </SelectTrigger>
              <SelectContent>
                {colors.map((clr) => (
                  <SelectItem key={clr} value={clr}>
                    {clr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Car Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carModels.map((car) => (
              <Card 
                key={car.id} 
                className={`p-4 hover:shadow-lg transition-all cursor-pointer ${
                  selectedCar.id === car.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCar(car)}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-auto mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {car.specs.range} | {car.specs.acceleration} | {car.specs.topSpeed}
                    </p>
                    <div className="mt-4 space-y-2">
                      {car.features.map((feature, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {feature}
                        </p>
                      ))}
                    </div>
                    <p className="text-lg font-semibold mt-4">{car.price}</p>
                    <Button 
                      className="mt-4 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubscribe(car);
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </motion.div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
