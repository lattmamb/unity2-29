import { useState } from "react";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, ChevronRight, Settings2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  menuItems: Array<{
    title: string;
    icon: any;
    description: string;
    action?: () => void;
    component?: React.ReactNode;
  }>;
}

export const PageLayout = ({ children, title, menuItems }: PageLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="fixed right-4 bottom-24 z-50 md:right-8 bg-background/80 backdrop-blur-sm 
                shadow-lg border border-white/10 rounded-full h-12 w-12 hover:scale-110 
                transition-all duration-300 hover:shadow-rental-blue/20 hover:border-rental-blue/50"
            >
              <Settings2 className="h-5 w-5 text-rental-blue animate-pulse-soft" />
              <span className="sr-only">Toggle quick actions</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[90%] sm:w-[400px] border-l border-white/10 bg-background/95 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center text-xl">
                {activeComponent ? (
                  <Button 
                    variant="ghost" 
                    className="px-0 hover:bg-transparent" 
                    onClick={() => setActiveComponent(null)}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
                    Back to Quick Actions
                  </Button>
                ) : (
                  <span className="bg-gradient-to-r from-rental-blue to-white bg-clip-text text-transparent">
                    Quick Actions
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-4rem)] mt-4">
              <AnimatePresence mode="wait">
                {activeComponent ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeComponent}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 p-1"
                  >
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto p-4 hover:bg-white/5 hover:scale-[0.99] 
                            transition-all duration-300 group relative overflow-hidden rounded-xl 
                            border border-white/10"
                          onClick={() => {
                            if (item.component) {
                              setActiveComponent(item.component);
                            } else if (item.action) {
                              item.action();
                              setIsOpen(false);
                            }
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-rental-blue/10 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="flex items-start space-x-4 relative z-10">
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-rental-blue/10 
                              transition-colors duration-300">
                              <item.icon className="h-5 w-5 text-rental-blue" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <div className="font-medium text-sm group-hover:text-rental-blue 
                                transition-colors duration-300">
                                {item.title}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 opacity-60 flex-shrink-0 
                              group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        
        <div className="pt-16 md:pt-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 break-words">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};