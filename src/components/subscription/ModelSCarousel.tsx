
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const modelSImages = [
  {
    url: "/lovable-uploads/4b7e3823-919f-4e0e-876b-56ac588be56f.png",
    alt: "Tesla Model S Side View Gray"
  },
  {
    url: "/lovable-uploads/cacf4518-9f99-4717-99b4-764102e78f38.png",
    alt: "Tesla Model S Front Side View Black"
  }
];

export const ModelSCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {modelSImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/1">
              <Card className="overflow-hidden border-0 rounded-lg shadow-lg">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.div>
  );
};
