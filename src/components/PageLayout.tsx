import { useState } from "react";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
              variant="ghost" 
              size="icon" 
              className="fixed left-4 top-20 z-50 md:left-8 md:top-24 bg-background/80 backdrop-blur-sm shadow-md"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle quick actions</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[90%] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                {activeComponent ? (
                  <Button 
                    variant="ghost" 
                    className="px-0" 
                    onClick={() => setActiveComponent(null)}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
                    Back to Quick Actions
                  </Button>
                ) : (
                  "Quick Actions"
                )}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-4rem)] mt-4">
              {activeComponent ? (
                activeComponent
              ) : (
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 text-left"
                      onClick={() => {
                        if (item.component) {
                          setActiveComponent(item.component);
                        } else if (item.action) {
                          item.action();
                          setIsOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{item.title}</div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 opacity-60 flex-shrink-0" />
                      </div>
                    </Button>
                  ))}
                </div>
              )}
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