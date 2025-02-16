
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Settings, Key, History, CreditCard } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const menuItems = [
    {
      title: "Account Settings",
      icon: Settings,
      description: "Manage your account preferences",
    },
    {
      title: "Security",
      icon: Key,
      description: "Update password and security settings",
    },
    {
      title: "Rental History",
      icon: History,
      description: "View your past rentals",
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      description: "Manage your payment options",
    },
    {
      title: "Personal Info",
      icon: User,
      description: "Update your personal information",
    },
  ];

  return (
    <PageLayout title="Profile" menuItems={menuItems}>
      <div className="max-w-md mx-auto space-y-4">
        <div className="p-4 bg-accent rounded-lg">
          <p className="text-sm text-gray-600">Guest User</p>
          <p className="font-medium">example@email.com</p>
        </div>
        <Button variant="destructive" className="w-full" onClick={handleSignOut}>
          Return to Home
        </Button>
      </div>
    </PageLayout>
  );
}
