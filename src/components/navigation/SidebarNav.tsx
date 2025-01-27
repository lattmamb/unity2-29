import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Megaphone,
  MapPin,
  Zap,
  Car,
  UserCircle,
  LifeBuoy,
  Calendar,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/fleet", icon: Car, label: "Fleet" },
  { path: "/subscription", icon: Package, label: "Subscription" },
  { path: "/advertising", icon: Megaphone, label: "Advertising" },
  { path: "/locations", icon: MapPin, label: "Locations" },
  { path: "/charging-stations", icon: Zap, label: "Charging" },
  { path: "/booking", icon: Calendar, label: "Book a Ride" },
  { path: "/profile", icon: UserCircle, label: "Profile" },
  { path: "/support", icon: LifeBuoy, label: "Support" },
];

export const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.button
        className="fixed left-4 top-24 z-50 rounded-full bg-background/80 p-3 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-primary/5 transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-6 w-6 text-primary" />
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-background/95 backdrop-blur-md border-r border-primary/10 shadow-xl"
            >
              <div className="flex flex-col h-full p-4">
                <div className="space-y-4 py-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className={cn(
                          "flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors",
                          "hover:bg-primary/5 group relative overflow-hidden",
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/60"
                        )}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                          animate={{ x: "-100%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        />
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};