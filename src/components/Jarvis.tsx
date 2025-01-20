import { useState, useEffect, useRef } from "react";
import { Bot, Mic, Volume2, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { SplineScene } from "@/components/ui/splite";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface JarvisProps {
  className?: string;
  context?: "subscription" | "fleet" | "booking" | "general";
}

type EdgePosition = "left" | "right" | "top" | "bottom" | null;

export const Jarvis = ({ className, context = "general" }: JarvisProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [isHidden, setIsHidden] = useState<EdgePosition>(null);
  const [splineError, setSplineError] = useState<string | null>(null);
  const [isDocked, setIsDocked] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const resizeRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 200, height: 200 });

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current && !e.defaultPrevented) {
      setIsDragging(true);
      setIsDocked(false);
      const rect = cardRef.current.getBoundingClientRect();
      startPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && cardRef.current) {
      const maxX = window.innerWidth - cardRef.current.offsetWidth;
      const maxY = window.innerHeight - cardRef.current.offsetHeight;
      
      const newX = Math.min(Math.max(0, e.clientX - startPosRef.current.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - startPosRef.current.y), maxY);
      
      cardRef.current.style.left = `${newX}px`;
      cardRef.current.style.top = `${newY}px`;

      // Edge detection for hiding
      const threshold = 20;
      if (newX < threshold) setIsHidden("left");
      else if (newX > maxX - threshold) setIsHidden("right");
      else if (newY < threshold) setIsHidden("top");
      else if (newY > maxY - threshold) setIsHidden("bottom");
      else setIsHidden(null);

      // Check if near docking station (bottom-left corner)
      const dockingThreshold = 50;
      if (newX < dockingThreshold && newY > maxY - dockingThreshold) {
        setIsDocked(true);
        cardRef.current.style.left = "0px";
        cardRef.current.style.top = `${maxY}px`;
      }
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    if (cardRef.current) {
      startPosRef.current = { x: e.clientX, y: e.clientY };
      startSizeRef.current = { width: size.width, height: size.height };
    }
  };

  const handleResize = (e: MouseEvent) => {
    if (isResizing && cardRef.current) {
      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      
      const newWidth = Math.max(150, startSizeRef.current.width + deltaX);
      const newHeight = Math.max(150, startSizeRef.current.height + deltaY);
      
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', isResizing ? handleResize : handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', isResizing ? handleResize : handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleMicClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsListening(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to use voice features.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Voice Recognition",
        description: "Coming soon! For now, I'll stick to text. Even JARVIS had to start somewhere.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the voice recognition.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  const handleSpeakClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpeaking(true);
    
    try {
      const message = getRandomResponse();
      toast({
        title: "JARVIS Says",
        description: message,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the speech synthesis.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const getRandomResponse = () => {
    const responses = contextualResponses[context];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleToggleSize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSplineError = (error: Error) => {
    console.error('Spline loading error:', error);
    setSplineError('Failed to load 3D model');
    toast({
      title: "3D Model Error",
      description: "Failed to load the Iron Man model. Using fallback display.",
      variant: "destructive",
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={isHidden ? {
          x: isHidden === 'right' ? '100%' : isHidden === 'left' ? '-100%' : 0,
          y: isHidden === 'bottom' ? '100%' : isHidden === 'top' ? '-100%' : 0,
          scale: 0.5,
        } : {
          x: 0,
          y: 0,
          scale: isDocked ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card 
          ref={cardRef}
          className={cn(
            "fixed w-[calc(100vw/32)] min-w-[200px] shadow-lg transition-transform hover:scale-105 backdrop-blur-lg bg-black/40 border-rental-blue/20",
            isDragging ? "cursor-grabbing" : "cursor-grab",
            isDocked ? "bottom-0 left-0" : "",
            className
          )}
          style={{
            width: isMinimized ? '60px' : size.width,
            height: isMinimized ? '60px' : size.height,
          }}
          onMouseDown={handleMouseDown}
        >
          <CardContent className="p-4 flex flex-col items-center gap-2 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={handleToggleSize}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>

            {!isMinimized && (
              <>
                <div className="w-full h-[calc(100%-60px)] relative">
                  {splineError ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Bot className="w-12 h-12 text-muted-foreground" />
                    </div>
                  ) : (
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full transform scale-75"
                      onError={handleSplineError}
                    />
                  )}
                </div>
                <div className="flex gap-2 mt-auto">
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
              </>
            )}

            <div
              ref={resizeRef}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={handleResizeStart}
            />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};