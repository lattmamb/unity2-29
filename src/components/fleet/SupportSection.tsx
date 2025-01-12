import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Wrench, CarFront } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const SupportSection = () => {
  const { toast } = useToast();

  const handleSupportRequest = (type: string) => {
    toast({
      title: "Support Request Sent",
      description: `Your ${type} request has been received. We'll get back to you shortly.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support & Upgrades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSupportRequest('chat')}
          >
            <MessageSquare className="h-4 w-4" />
            Start Chat
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSupportRequest('service')}
          >
            <Wrench className="h-4 w-4" />
            Schedule Service
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSupportRequest('upgrade')}
          >
            <CarFront className="h-4 w-4" />
            Upgrade Vehicle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};