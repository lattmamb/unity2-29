import { PageLayout } from "@/components/PageLayout";
import { MessageCircle, Phone, Mail, FileText, HelpCircle } from "lucide-react";
import { Jarvis } from "@/components/Jarvis";

export default function Support() {
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
      <p>Support content coming soon...</p>
      <Jarvis context="general" className="!fixed !bottom-4 !right-4 cursor-move" />
    </PageLayout>
  );
}