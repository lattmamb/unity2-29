
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const carModels = [
  {
    id: 1,
    name: "Model S P85",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    year: "2012",
    miles: "37,187",
    price: "$83,850",
    color: "Red Multi-Coat",
    vin: "S00393"
  },
  {
    id: 2,
    name: "Model S 85",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    year: "2013",
    miles: "13,249",
    price: "$83,850",
    color: "Red Multi-Coat",
    vin: "P09049"
  },
  {
    id: 3,
    name: "Model S 85",
    image: "/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png",
    year: "2013",
    miles: "13,039",
    price: "$85,150",
    color: "Gray",
    vin: "P18069"
  }
];

export const ModelSViewer = () => {
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
            <h2 className="text-4xl font-bold mb-4">MODEL S</h2>
            <h3 className="text-2xl text-muted-foreground mb-2">Pre-Owned Model S</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every pre-owned Model S comes with a 4 year, 50,000 mile limited warranty.
            </p>
          </div>

          {/* Main Car Display */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <div className="aspect-[16/9] relative">
              <img
                src="/lovable-uploads/a5d5e04e-262f-4be9-8bce-605793c030ed.png"
                alt="Tesla Model S"
                className="w-full h-full object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-8">
            <Select>
              <div className="p-2 min-w-[200px] bg-background/50 backdrop-blur-sm border rounded-md">
                San Francisco Bay Area
              </div>
            </Select>
            <Select>
              <div className="p-2 min-w-[200px] bg-background/50 backdrop-blur-sm border rounded-md">
                Any Model S
              </div>
            </Select>
            <Select>
              <div className="p-2 min-w-[200px] bg-background/50 backdrop-blur-sm border rounded-md">
                Any Color
              </div>
            </Select>
          </div>

          {/* Car Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carModels.map((car) => (
              <Card key={car.id} className="p-4 hover:shadow-lg transition-shadow">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-auto mb-4"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-semibold">{car.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {car.year} | {car.miles} miles | {car.vin}
                  </p>
                  <p className="text-lg font-semibold mt-2">{car.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
