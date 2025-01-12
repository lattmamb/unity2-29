import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, CreditCard, Gift, HelpCircle, Settings, Zap } from "lucide-react";
import { useState } from "react";

export default function Subscription() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      title: "Quick Subscribe",
      icon: Zap,
      description: "Get started with a new plan instantly",
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      description: "Manage your payment options",
    },
    {
      title: "Plan Settings",
      icon: Settings,
      description: "Customize your subscription preferences",
    },
    {
      title: "Referral Program",
      icon: Gift,
      description: "Invite friends and earn rewards",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      description: "Get assistance with your subscription",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <SubscriptionPlans />
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
  );
}