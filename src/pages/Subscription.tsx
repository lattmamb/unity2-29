import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { PageLayout } from "@/components/PageLayout";
import { CreditCard, Gift, HelpCircle, Settings, Zap } from "lucide-react";

export default function Subscription() {
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
    <PageLayout title="Subscription" menuItems={menuItems}>
      <SubscriptionPlans />
    </PageLayout>
  );
}