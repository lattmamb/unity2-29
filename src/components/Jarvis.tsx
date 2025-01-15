import { useState, useEffect, useRef } from "react";
import { Bot, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface JarvisProps {
  className?: string;
  context?: "subscription" | "fleet" | "booking" | "general";
}

export const Jarvis = ({ className, context = "general" }: JarvisProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const contextualResponses = {
    subscription: [
      "Looking at the subscription tiers. As Mr. Stark would say, 'Sometimes you gotta run before you can walk.'",
      "The Elite tier includes priority booking. Perfect for those who, like Tony, appreciate the finer things.",
      "Need help customizing your plan? Let's make it as unique as a Mark 42 suit.",
    ],
    fleet: [
      "Monitoring all vehicles. No signs of unauthorized joy rides... yet.",
      "All vehicles showing optimal battery levels. Even DUMMY would be impressed.",
      "Current fleet status: Green across the board. No Ultron incidents today.",
    ],
    booking: [
      "Shall we book you something special? I promise it's better than the Mark 1.",
      "Checking availability. Unlike Tony's suits, these actually need charging.",
      "May I suggest the premium model? It's quite the showstopper, even by Stark standards.",
    ],
    general: [
      "At your service. Though I draw the line at making coffee.",
      "Systems online. No alien invasions detected... yet.",
      "How can I assist? And no, I can't help you build an Iron Man suit.",
    ],
  };

  const getRandomResponse = () => {
    const responses = contextualResponses[context];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current && !e.defaultPrevented) {
      setIsDragging(true);
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && cardRef.current) {
      const maxX = window.innerWidth - cardRef.current.offsetWidth;
      const maxY = window.innerHeight - cardRef.current.offsetHeight;
      
      const newX = Math.min(Math.max(0, e.clientX - position.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - position.y), maxY);
      
      cardRef.current.style.left = `${newX}px`;
      cardRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsListening(true);
    toast({
      title: "Voice Recognition",
      description: "Coming soon! For now, I'll stick to text. Even JARVIS had to start somewhere.",
    });
    setTimeout(() => setIsListening(false), 2000);
  };

  const handleSpeakClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpeaking(true);
    const message = getRandomResponse();
    toast({
      title: "JARVIS Says",
      description: message,
    });
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "fixed w-[calc(100vw/32)] min-w-[200px] shadow-lg transition-transform hover:scale-105",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onMouseDown={handleMouseDown}
    >
      <CardContent className="p-4 flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary animate-pulse" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn("transition-all", {
              "animate-pulse text-red-500": isListening,
            })}
            onClick={handleMicClick}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("transition-all", {
              "animate-pulse text-blue-500": isSpeaking,
            })}
            onClick={handleSpeakClick}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};