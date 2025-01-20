import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { PageLayout } from "@/components/PageLayout";
import { Car, CreditCard, Gift, HelpCircle, Settings, Zap } from "lucide-react";
import { VehicleOverview } from "@/components/VehicleOverview";
import { Jarvis } from "@/components/Jarvis";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Subscription() {
  const menuItems = [
    {
      title: "Vehicle Overview",
      icon: Car,
      description: "Browse available vehicles and their subscription tiers",
      action: () => {
        // The action will be handled by the Sheet component
      },
      component: <VehicleOverview />
    },
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
    <PageLayout title="Subscription Plans" menuItems={menuItems}>
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-white">
            Choose Your <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC6] to-[#C4FF00]">
              Perfect Plan
            </span>
          </h1>
        }
      >
        <img
          src="/lovable-uploads/2de4d0f1-f338-4bbe-ac60-623beab12b7b.png"
          alt="Tesla Fleet at Night"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </ContainerScroll>
      <div className="space-y-16">
        <SubscriptionPlans />
      </div>
      <Jarvis context="subscription" />
    </PageLayout>
  );
}