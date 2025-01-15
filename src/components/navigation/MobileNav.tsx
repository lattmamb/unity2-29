import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  description: string;
  link: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const MobileNav = () => {
  const menuItems: MenuSection[] = [
    {
      title: "Services",
      items: [
        {
          title: "Subscribe Now",
          description: "Choose your perfect plan and start your electric journey today.",
          link: "/subscription"
        },
        {
          title: "Advertising",
          description: "Promote your brand on our Tesla fleet",
          link: "/advertising"
        },
        {
          title: "Rentals",
          description: "Flexible vehicle rentals for your needs",
          link: "/rentals"
        },
        {
          title: "On-Demand Rides",
          description: "Book a ride whenever you need it",
          link: "/on-demand"
        }
      ]
    },
    {
      title: "Fleet Management",
      items: [
        {
          title: "View Fleet",
          description: "Explore our range of electric vehicles",
          link: "/fleet"
        },
        {
          title: "Locations",
          description: "Find vehicles near you",
          link: "/locations"
        }
      ]
    },
    {
      title: "Account & Support",
      items: [
        {
          title: "Profile Settings",
          description: "Manage your account preferences",
          link: "/profile"
        },
        {
          title: "Customer Support",
          description: "Get help with your account",
          link: "/support"
        }
      ]
    }
  ];

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {menuItems.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-medium text-lg mb-2 truncate">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className="w-full justify-start h-auto py-4"
                      asChild
                    >
                      <Link to={item.link}>
                        <div className="flex items-start space-x-4 w-full">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.title}</div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 opacity-60 flex-shrink-0" />
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};