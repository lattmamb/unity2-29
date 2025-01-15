import { PageLayout } from "@/components/PageLayout";
import { AdHero } from "@/components/advertising/AdHero";
import { AdOptions } from "@/components/advertising/AdOptions";
import { CarModelViewer } from "@/components/advertising/CarModelViewer";
import { Monitor, Palette, Target, BarChart3 } from "lucide-react";

export default function Advertising() {
  const menuItems = [
    {
      title: "Digital Display Ads",
      icon: Monitor,
      description: "Create and manage digital advertising campaigns",
    },
    {
      title: "Vehicle Wraps",
      icon: Palette,
      description: "Design and order custom vehicle wraps",
    },
    {
      title: "Campaign Targeting",
      icon: Target,
      description: "Set location and audience preferences",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      description: "View campaign performance metrics",
    },
  ];

  return (
    <PageLayout title="" menuItems={menuItems}>
      <div className="space-y-16 -mt-16">
        <AdHero />
        
        <section className="container mx-auto px-4 py-16 bg-[#0B1F3B]">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Advertising Options</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Choose between dynamic digital displays or premium vehicle wraps to showcase your brand
          </p>
          <AdOptions />
        </section>
        
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">Interactive Preview</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Visualize your campaign with our interactive 3D model viewer
          </p>
          <CarModelViewer />
        </section>
      </div>
    </PageLayout>
  );
}