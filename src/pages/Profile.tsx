import { PageLayout } from "@/components/PageLayout";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Settings, Key, History, CreditCard } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-medium">{user?.email}</p>
        </div>
        <Button variant="destructive" className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </PageLayout>
  );
}