
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  Car,
  Package,
  Megaphone,
  MapPin,
  Zap,
  Calendar,
  UserCircle,
  LifeBuoy
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";

const navigationItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
    requiresAuth: false
  },
  {
    title: 'Fleet',
    icon: Car,
    href: '/fleet',
    requiresAuth: false
  },
  {
    title: 'Subscription',
    icon: Package,
    href: '/subscription',
    requiresAuth: false
  },
  {
    title: 'Advertising',
    icon: Megaphone,
    href: '/advertising',
    requiresAuth: true
  },
  {
    title: 'Locations',
    icon: MapPin,
    href: '/locations',
    requiresAuth: false
  },
  {
    title: 'Charging',
    icon: Zap,
    href: '/charging-stations',
    requiresAuth: true
  },
  {
    title: 'Book',
    icon: Calendar,
    href: '/booking',
    requiresAuth: true
  },
  {
    title: 'Profile',
    icon: UserCircle,
    href: '/profile',
    requiresAuth: true
  },
  {
    title: 'Support',
    icon: LifeBuoy,
    href: '/support',
    requiresAuth: false
  },
];

export function DockNav() {
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user?.id)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed top-16 left-1/2 max-w-full -translate-x-1/2 z-40'
    >
      <Dock className='items-start pt-3 bg-background/80 backdrop-blur-sm border border-white/10 rounded-full shadow-lg'>
        {filteredItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <DockItem
              className={cn(
                'aspect-square rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300',
                location.pathname === item.href && 'bg-rental-blue/20 border-rental-blue/50'
              )}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <item.icon className={cn(
                  'h-full w-full',
                  location.pathname === item.href ? 'text-rental-blue' : 'text-foreground'
                )} />
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </motion.div>
  );
}
