import { PageLayout } from "@/components/PageLayout";
import { Car, CreditCard, Gift, HelpCircle, Settings, Zap } from "lucide-react";
import { SubscriptionHeader } from "@/components/subscription/SubscriptionHeader";
import { PlanCards } from "@/components/subscription/PlanCards";
import { PlanComparison } from "@/components/subscription/PlanComparison";
import { EcoImpact } from "@/components/subscription/EcoImpact";
import { Testimonials } from "@/components/subscription/Testimonials";
import { SubscriptionFAQ } from "@/components/subscription/SubscriptionFAQ";
import { SubscriptionFooter } from "@/components/subscription/SubscriptionFooter";
import { Jarvis } from "@/components/Jarvis";

export default function Subscription() {
  const menuItems = [
    {
      title: "Plans Overview",
      icon: Car,
      description: "Browse our subscription plans",
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
      <div className="space-y-16 pb-16">
        <SubscriptionHeader />
        <PlanCards />
        <PlanComparison />
        <EcoImpact />
        <Testimonials />
        <SubscriptionFAQ />
        <SubscriptionFooter />
      </div>
      <Jarvis context="subscription" />
    </PageLayout>
  );
}