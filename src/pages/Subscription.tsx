import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { PageLayout } from "@/components/PageLayout";
import { Car, CreditCard, Gift, HelpCircle, Settings, Zap } from "lucide-react";
import { VehicleOverview } from "@/components/VehicleOverview";

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
    <PageLayout title="Subscription" menuItems={menuItems}>
      <SubscriptionPlans />
    </PageLayout>
  );
}