import { Button } from "@/components/ui/button";

export const AdHero = () => {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden bg-gradient-to-b from-primary/10 to-background">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="container mx-auto h-full flex flex-col items-center justify-center text-center space-y-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ev-dark via-ev to-ev-light animate-fade-up">
          Advertise on Unity Fleet
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-up [animation-delay:200ms]">
          Transform our Tesla fleet into moving billboards with digital displays and custom wraps
        </p>
        <div className="flex gap-4 animate-fade-up [animation-delay:400ms]">
          <Button size="lg" variant="secondary">
            Start Digital Campaign
          </Button>
          <Button size="lg" variant="outline">
            Design Vehicle Wrap
          </Button>
        </div>
      </div>
    </div>
  );
};