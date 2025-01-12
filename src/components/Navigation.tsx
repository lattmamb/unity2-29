import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, ChevronRight } from "lucide-react";

export const Navigation = () => {
  const menuItems = [
    {
      title: "Services",
      items: [
        {
          title: "Subscribe Now",
          description: "Choose your perfect plan and start your electric journey today.",
          link: "/subscription"
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
      title: "Support & Help",
      items: [
        {
          title: "Customer Support",
          description: "Get help with your account",
          link: "/support"
        },
        {
          title: "Profile Settings",
          description: "Manage your account preferences",
          link: "/profile"
        }
      ]
    }
  ];

  return (
    <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="mr-8 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" alt="Unity Fleet Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-primary">Unity Fleet</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                          to="/subscription"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Subscribe Now
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Choose your perfect plan and start your electric journey today.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/fleet" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Fleet
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/locations" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Locations
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/support" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Support
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
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

        <div className="ml-auto flex items-center space-x-4">
          <Button asChild variant="secondary" className="whitespace-nowrap">
            <Link to="/booking">Book a Ride</Link>
          </Button>
          <Button asChild variant="ghost" className="whitespace-nowrap">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};