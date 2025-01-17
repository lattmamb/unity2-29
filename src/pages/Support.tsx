import { PageLayout } from "@/components/PageLayout";
import { MessageCircle, Phone, Mail, FileText, HelpCircle } from "lucide-react";
import { Jarvis } from "@/components/Jarvis";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Support() {
  useEffect(() => {
    const handleNetworkError = () => {
      if (!navigator.onLine) {
        toast({
          title: "Network Error",
          description: "You appear to be offline. Please check your internet connection.",
          variant: "destructive",
        });
      }
    };

    // Listen for online/offline events
    window.addEventListener('online', handleNetworkError);
    window.addEventListener('offline', handleNetworkError);

    // Check initial connection state
    handleNetworkError();

    return () => {
      window.removeEventListener('online', handleNetworkError);
      window.removeEventListener('offline', handleNetworkError);
    };
  }, []);

  const menuItems = [
    {
      title: "Live Chat",
      icon: MessageCircle,
      description: "Chat with our support team",
    },
    {
      title: "Phone Support",
      icon: Phone,
      description: "Call our support hotline",
    },
    {
      title: "Email Support",
      icon: Mail,
      description: "Send us an email",
    },
    {
      title: "FAQs",
      icon: HelpCircle,
      description: "Browse frequently asked questions",
    },
    {
      title: "Submit Ticket",
      icon: FileText,
      description: "Create a new support ticket",
    },
  ];

  return (
    <PageLayout title="Support" menuItems={menuItems}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Our support team is here to help. Choose your preferred method of contact below.
        </p>
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              onClick={() => {
                if (!navigator.onLine) {
                  toast({
                    title: "Connection Error",
                    description: "Cannot connect to support services. Please check your internet connection.",
                    variant: "destructive",
                  });
                  return;
                }
                // Support action handlers would go here
              }}
            >
              <item.icon className="h-6 w-6 text-primary" />
              <div className="text-left">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Jarvis context="general" className="!fixed !bottom-4 !right-4 cursor-move" />
    </PageLayout>
  );
}