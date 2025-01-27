import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Car,
  Package,
  Megaphone,
  MapPin,
  Zap,
  Calendar,
  UserCircle,
  LifeBuoy
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Car, label: "Fleet", path: "/fleet" },
  { icon: Package, label: "Subscription", path: "/subscription" },
  { icon: Megaphone, label: "Ads", path: "/advertising" },
  { icon: MapPin, label: "Locations", path: "/locations" },
  { icon: Zap, label: "Charging", path: "/charging-stations" },
  { icon: Calendar, label: "Book", path: "/booking" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
  { icon: LifeBuoy, label: "Support", path: "/support" }
];

export const BottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-white/10"
        >
          <nav className="container mx-auto px-4 py-2">
            <div className="grid grid-cols-9 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors hover:bg-white/5"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-1 rounded-full ${
                        isActive ? "text-rental-blue" : "text-white/60"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className={`text-xs mt-1 ${
                      isActive ? "text-rental-blue" : "text-white/60"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};