import { useState } from "react";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Home, Settings, HelpCircle, Bell, User, FileText } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  menuItems: Array<{
    title: string;
    icon: any;
    description: string;
    action?: () => void;
  }>;
}

export const PageLayout = ({ children, title, menuItems }: PageLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            {children}
          </div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-10 top-4 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <div className={`transition-all duration-300 ${isOpen ? 'w-80' : 'w-0'} overflow-hidden border-l bg-card`}>
            <ScrollArea className="h-screen">
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Quick Actions</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className="w-full justify-start h-auto py-4"
                      onClick={item.action}
                    >
                      <div className="flex items-start space-x-4">
                        <item.icon className="h-5 w-5 mt-0.5" />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.title}</div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 opacity-60" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};