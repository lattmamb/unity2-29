import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TrackingControlsProps {
  date: Date;
  onDateChange: (increment: boolean) => void;
}

export const TrackingControls = ({ date, onDateChange }: TrackingControlsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "The fleet tracking report has been downloaded successfully.",
    });
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Last updated 09:05</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={() => onDateChange(false)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="mx-1">
            {date.toLocaleDateString()}
          </Button>
          <Button variant="outline" size="icon" onClick={() => onDateChange(true)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};