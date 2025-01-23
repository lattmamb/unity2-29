import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const PromotionsBanner = () => {
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText("https://unityfleet.com/referral")
      .then(() => {
        toast({
          title: "Referral Link Copied!",
          description: "Share this link with your friends to earn rewards.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to Copy",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Gift className="h-8 w-8" />
          <div>
            <h3 className="text-xl font-bold">Refer a Friend</h3>
            <p className="text-white/90">Get $50 credit when they join Unity Fleet</p>
          </div>
        </div>
        <Button 
          variant="secondary"
          onClick={handleShare}
        >
          Share Now
        </Button>
      </CardContent>
    </Card>
  );
};