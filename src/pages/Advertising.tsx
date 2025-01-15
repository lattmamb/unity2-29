import { PageLayout } from "@/components/PageLayout";
import { VehicleAdvertising } from "@/components/subscription/VehicleAdvertising";
import { Megaphone, Image, Target, Layers } from "lucide-react";

export default function Advertising() {
  const menuItems = [
    {
      title: "Upload Ad Design",
      icon: Image,
      description: "Upload your digital ads or wrap designs",
    },
    {
      title: "Campaign Targeting",
      icon: Target,
      description: "Set your campaign parameters and audience",
    },
    {
      title: "Ad Formats",
      icon: Layers,
      description: "Choose between digital displays and vehicle wraps",
    },
    {
      title: "Campaign Analytics",
      icon: Megaphone,
      description: "Track your advertising performance",
    },
  ];

  return (
    <PageLayout title="Vehicle Advertising" menuItems={menuItems}>
      <VehicleAdvertising />
    </PageLayout>
  );
}