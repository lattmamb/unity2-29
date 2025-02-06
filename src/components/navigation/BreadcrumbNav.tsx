
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

const routeNames: { [key: string]: string } = {
  "": "Home",
  "subscription": "Subscription Plans",
  "advertising": "Advertising",
  "locations": "Locations",
  "support": "Support",
  "profile": "Profile",
  "booking": "Book a Ride",
  "charging-stations": "Charging Stations",
  "rentals": "Rentals",
  "on-demand": "On-Demand",
  "fleet": "Fleet"
};

export function BreadcrumbNav() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="container mx-auto px-4 py-2"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbSeparator />
                {isLast ? (
                  <BreadcrumbPage className="text-rental-blue">
                    {routeNames[segment] || segment}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={path}
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {routeNames[segment] || segment}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
}
