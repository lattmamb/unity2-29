import { Link } from "react-router-dom";
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
  Car,
  MapPin,
  Zap,
  UserCircle,
  LifeBuoy,
  Megaphone
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const navigationItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    title: 'Fleet',
    icon: Car,
    href: '/fleet',
  },
  {
    title: 'Subscription',
    icon: Package,
    href: '/subscription',
  },
  {
    title: 'Advertising',
    icon: Megaphone,
    href: '/advertising',
  },
  {
    title: 'Locations',
    icon: MapPin,
    href: '/locations',
  },
  {
    title: 'Charging',
    icon: Zap,
    href: '/charging-stations',
  },
  {
    title: 'Profile',
    icon: UserCircle,
    href: '/profile',
  },
  {
    title: 'Support',
    icon: LifeBuoy,
    href: '/support',
  },
];

export function DockNav() {
  return (
    <div className='fixed bottom-2 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3'>
        {navigationItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <DockItem
              className='aspect-square rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-white/10'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <item.icon className='h-full w-full text-foreground' />
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}