import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-primary/80">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms]">
            Drive the Future with Unity Fleet
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-up [animation-delay:400ms]">
            Experience the freedom of electric vehicle subscription. No commitment, all convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:600ms]">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};